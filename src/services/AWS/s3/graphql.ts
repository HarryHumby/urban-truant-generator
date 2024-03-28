export const GET_OBJECT = /* GraphQL */ `
  fragment ObjectFields on ObjectData {
    value
  }
  query GetObject($input: GetObjectInput!) {
    getObject(input: $input) {
      ...ObjectFields
    }
  }
`;

export const PUT_OBJECT = /* GraphQL */ `
  fragment ObjectFields on ObjectData {
    value
  }
  mutation PutObject($input: PutObjectInput!) {
    putObject(input: $input) {
      ...ObjectFields
    }
  }
`;

export const GET_OBJECTS = /* GraphQL */ `
  fragment ObjectFields on ObjectList {
    Contents {
      Key
    }
  }
  query GetObjects($input: GetObjectsInput!) {
    getObjects(input: $input) {
      ...ObjectFields
    }
  }
`;