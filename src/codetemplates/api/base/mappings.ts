export default `# CREATE
- dataSource: Dynamo_SCO_<% upperCaseName %>_\${sls:stage}
  type: Mutation
  field: create<% pascalCaseName %>
  request: "<% camelCaseName %>/base/vtl/create/req.vtl"
  response: "<% camelCaseName %>/base/vtl/create/res.vtl"

# READ
- dataSource: Dynamo_SCO_<% upperCaseName %>_\${sls:stage}
  type: Query
  field: get<% pascalCaseName %>
  request: "<% camelCaseName %>/base/vtl/get/req.vtl"
  response: "<% camelCaseName %>/base/vtl/get/res.vtl"

- dataSource: Dynamo_SCO_<% upperCaseName %>_\${sls:stage}
  type: Query
  field: get<% pascalCaseName %>s
  request: "<% camelCaseName %>/base/vtl/get<% pascalCaseName %>s/req.vtl"
  response: "<% camelCaseName %>/base/vtl/get<% pascalCaseName %>s/res.vtl"

# UPDATE
- dataSource: Dynamo_SCO_<% upperCaseName %>_\${sls:stage}
  type: Mutation
  field: update<% pascalCaseName %>
  request: "<% camelCaseName %>/base/vtl/update/req.vtl"
  response: "<% camelCaseName %>/base/vtl/update/res.vtl"

# DELETE
- dataSource: Dynamo_SCO_<% upperCaseName %>_\${sls:stage}
  type: Mutation
  field: delete<% pascalCaseName %>
  request: "<% camelCaseName %>/base/vtl/delete/req.vtl"
  response: "<% camelCaseName %>/base/vtl/delete/res.vtl"`