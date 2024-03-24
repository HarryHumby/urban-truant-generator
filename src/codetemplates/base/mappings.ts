export default `- dataSource: Dynamo_SCO_STUDENT_\${sls:stage}
  type: Mutation
  field: createStudent
  request: "student/base/vtl/create/req.vtl"
  response: "student/base/vtl/create/res.vtl"

- dataSource: Dynamo_SCO_STUDENT_\${sls:stage}
  type: Mutation
  field: deleteStudent
  request: "student/base/vtl/delete/req.vtl"
  response: "student/base/vtl/delete/res.vtl"

- dataSource: Dynamo_SCO_STUDENT_\${sls:stage}
  type: Mutation
  field: updateStudent
  request: "student/base/vtl/update/req.vtl"
  response: "student/base/vtl/update/res.vtl"

- dataSource: Dynamo_SCO_STUDENT_\${sls:stage}
  type: Query
  field: getStudent
  request: "student/base/vtl/get/req.vtl"
  response: "student/base/vtl/get/res.vtl"

- dataSource: Dynamo_SCO_STUDENT_\${sls:stage}
  type: Query
  field: getStudents
  request: "student/base/vtl/getStudents/req.vtl"
  response: "student/base/vtl/getStudents/res.vtl"`