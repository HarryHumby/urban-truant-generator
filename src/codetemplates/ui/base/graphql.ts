export default `export const <% upperCaseName %> _FIELDS_FRAGMENT = /* GraphQL */ \`
  fragment <% pascalCaseName %>Fields on <% pascalCaseName %> {
    <% dataPatternFieldsUIGraphQL %>
  }
\`;

export const CREATE_<% upperCaseName %> = /* GraphQL */ \`
  \${<% upperCaseName %> _FIELDS_FRAGMENT}
  mutation Create<% pascalCaseName %>($input: Create<% pascalCaseName %>Input!) {
    create<% pascalCaseName %>(input: $input) {
      ...<% pascalCaseName %>Fields
    }
  }
\`;

export const GET_<% upperCaseName %> = /* GraphQL */ \`
  \${<% upperCaseName %> _FIELDS_FRAGMENT}
  query Get<% pascalCaseName %>($input: Get<% pascalCaseName %>Input!) {
    get<% pascalCaseName %>(input: $input) {
      ...<% pascalCaseName %>Fields
    }
  }
\`;

export const UPDATE_<% upperCaseName %> = /* GraphQL */ \`
  \${<% upperCaseName %> _FIELDS_FRAGMENT}
  mutation Update<% pascalCaseName %>($input: Update<% pascalCaseName %>Input!) {
    update<% pascalCaseName %>(input: $input) {
      ...<% pascalCaseName %>Fields
    }
  }
\`;

export const DELETE_<% upperCaseName %> = /* GraphQL */ \`
  \${<% upperCaseName %> _FIELDS_FRAGMENT}
  mutation Delete<% pascalCaseName %>($input: Delete<% pascalCaseName %>Input!) {
    delete<% pascalCaseName %>(input: $input) {
      ...<% pascalCaseName %>Fields
    }
  }
\`;

export const GET_<% upperCaseName %> S = /* GraphQL */ \`
  \${<% upperCaseName %> _FIELDS_FRAGMENT}
  query Get<% pascalCaseName %>s($input: Get<% pascalCaseName %>sInput!) {
    get<% pascalCaseName %>s(input: $input) {
      data {
        ...<% pascalCaseName %>Fields
      }
      nextToken
    }
  }
\`;`