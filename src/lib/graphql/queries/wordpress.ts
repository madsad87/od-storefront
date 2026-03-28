import { gql } from '@apollo/client';

export const PREVIEW_NODE_QUERY = gql`
  query PreviewNode($id: ID!, $idType: ContentNodeIdTypeEnum!) {
    contentNode(id: $id, idType: $idType) {
      __typename
      ... on Page {
        databaseId
        slug
        status
        title
      }
      ... on Post {
        databaseId
        slug
        status
        title
      }
    }
  }
`;
