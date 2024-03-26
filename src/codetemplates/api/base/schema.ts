export default `schema {
	query: Query
	mutation: Mutation
}

type <% pascalCaseName %> @aws_cognito_user_pools {
	<% dataPatternFieldsGraphQL %>
	cb: String
	sb: String
	co: String
	so: String
}

type Query @aws_cognito_user_pools {
	get<% pascalCaseName %>(input: Get<% pascalCaseName %>Input!): <% pascalCaseName %>
	get<% pascalCaseName %>With(input: Get<% pascalCaseName %>Input!): <% pascalCaseName %>
	get<% pascalCaseName %>s(input: Get<% pascalCaseName %>sInput!): <% pascalCaseName %>List
}


type Mutation @aws_cognito_user_pools {
	create<% pascalCaseName %>(input: Create<% pascalCaseName %>Input!): <% pascalCaseName %>
	update<% pascalCaseName %>(input: Update<% pascalCaseName %>Input!): <% pascalCaseName %>
	delete<% pascalCaseName %>(input: Delete<% pascalCaseName %>Input!): <% pascalCaseName %>
}

input Get<% pascalCaseName %>Input {
	<% dataPatternFieldsGraphQLGet %>
}

input Create<% pascalCaseName %>Input {
	<% dataPatternFieldsGraphQLCreate %>
}

input Update<% pascalCaseName %>Input {
	<% dataPatternFieldsGraphQLUpdate %>
}

input Delete<% pascalCaseName %>Input {
	<% dataPatternFieldsGraphQLDelete %>
}

input Get<% pascalCaseName %>sInput {
	limit: Int
	nextToken: String
}

type <% pascalCaseName %>List  @aws_cognito_user_pools @aws_api_key {
	data: [<% pascalCaseName %>]
	nextToken: String
}`
