export type GraphQLDocument = string & { readonly __graphqlDocument: unique symbol };

export function graphql(document: TemplateStringsArray): GraphQLDocument {
  return document[0] as GraphQLDocument;
}
