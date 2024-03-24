export default `schema {
	query: Query
	mutation: Mutation
}

type Student @aws_cognito_user_pools {
	id: String
	firstName: String
	lastName: String
	email: String
	phoneNumber: String
	cognitoUser: String
	noReview: Boolean
	addresses: [Address]
	partnerId: String
	cb: String
	sb: String
	co: String
	so: String
}

type Query @aws_cognito_user_pools {
	getStudent(input: GetStudentInput!): Student
	getStudentWith(input: GetStudentInput!): Student
	getStudents(input: GetStudentsInput!): StudentList
}


type Mutation @aws_cognito_user_pools {
	createStudent(input: CreateStudentInput!): Student
	updateStudent(input: UpdateStudentInput!): Student
	deleteStudent(input: DeleteStudentInput!): Student
}

input GetStudentInput {
	id: String!
}

input CreateStudentInput {
	firstName: String!
	lastName: String!
	email: String!
	phoneNumber: String!
}

input UpdateStudentInput {
	id: String!
	firstName: String!
	lastName: String!
	email: String
	phoneNumber: String
	noReview: Boolean
	addresses: [CreateAddressInput]
	cognitoUser: String
	partnerId: String
}

input DeleteStudentInput {
	id: String!
}

input GetStudentsInput {
	limit: Int
	nextToken: String
}

type StudentList  @aws_cognito_user_pools @aws_api_key {
	data: [Student]
	nextToken: String
}`
