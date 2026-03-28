import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { serverEnv } from '@/lib/env/server';

export async function POST(request: NextRequest) {
  const token = request.headers.get('x-revalidate-token');

  if (token !== serverEnv.WP_HEADLESS_REVALIDATE_TOKEN) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const path = typeof body.path === 'string' ? body.path : '/';

  revalidatePath(path);

  return NextResponse.json({ ok: true, revalidated: path });
}
