import type { CodegenConfig } from '@graphql-codegen/cli';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

if (!endpoint) {
  throw new Error('NEXT_PUBLIC_GRAPHQL_ENDPOINT is required for GraphQL codegen.');
}

const config: CodegenConfig = {
  overwrite: true,
  schema: endpoint,
  documents: ['src/lib/graphql/**/*.{ts,tsx}'],
  generates: {
    'src/lib/graphql/generated/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
};

export default config;
