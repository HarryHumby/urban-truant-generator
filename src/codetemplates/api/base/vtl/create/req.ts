export default `#set( $obj = $ctx.args.input )
<% if tenantId #set( $tenantId = $util.defaultIfNullOrEmpty($context.identity.claims.get("custom:tenantId"), $ctx.args.input.tenantId)) %>
<% if tenantId #if( $util.isNullOrEmpty($tenantId_) ) %>
<% if tenantId 	$util.error("Tennant is required") %>
<% if tenantId #end %>
<% if tenantId #set( $obj.tenantId = $tenantId_ ) %>

#set( $obj.id = "$util.autoUlid()" )
#set( $obj.et = "<% upperCaseName %>" )
#set( $obj.co = $util.time.nowISO8601() )
#set( $obj.cb = $util.defaultIfNullOrEmpty($context.identity.username, "API") )
#set( $obj = $util.dynamodb.toMapValues($obj) )

<% forEach dataPatternFieldsKeysArray #set( $<x> = $obj.<x> ) %>

#set( $pk = "<% pk %>")
#set( $sk = "<% sk %>")

{
	"version" : "2017-02-28",
	"operation" : "PutItem",
	"key" : {
			"PK": $util.dynamodb.toDynamoDBJson($pk),
			"SK": $util.dynamodb.toDynamoDBJson($sk)
	},
	"attributeValues" : $util.toJson($obj)
}`
