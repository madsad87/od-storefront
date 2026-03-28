import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { createApolloClient } from '@/lib/apollo/client';
import { PREVIEW_NODE_QUERY } from '@/lib/graphql/queries/wordpress';
import { serverEnv } from '@/lib/env/server';
import { resolvePreviewPath } from '@/features/preview/resolve-preview-path';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const id = request.nextUrl.searchParams.get('id');
  const idType = request.nextUrl.searchParams.get('idType') ?? 'DATABASE_ID';

  if (!secret || secret !== serverEnv.FAUSTWP_SECRET_KEY) {
    return new Response('Unauthorized preview request', { status: 401 });
  }

  if (!id) {
    return new Response('Missing preview id', { status: 400 });
  }

  const client = createApolloClient();
  const { data } = await client.query({
    query: PREVIEW_NODE_QUERY,
    variables: { id, idType },
    fetchPolicy: 'no-cache',
  });

  const node = data?.contentNode;

  if (!node?.slug || !node?.__typename) {
    return new Response('Preview node not found', { status: 404 });
  }

  (await draftMode()).enable();
  const path = resolvePreviewPath(node.__typename, node.slug);
  redirect(path);
}
