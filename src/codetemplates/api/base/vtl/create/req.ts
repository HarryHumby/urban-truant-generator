export default `#set( $obj = $ctx.args.input )
<% if tenantId #set( $tenantId_ = $util.defaultIfNullOrEmpty($context.identity.claims.get("custom:tenantId"), $ctx.args.input.tenantId)) %>
<% if tenantId #if( $util.isNullOrEmpty($tenantId_) ) %>
<% if tenantId 	$util.error("Tennant is required") %>
<% if tenantId #end %>
<% if tenantId #set( $obj.tenantId = $tenantId_ ) %>

#set( $et = "<% upperCaseName %>")
#set( $prefix_ = "<% hash %>")
#set( $user = $util.defaultIfNullOrEmpty($context.identity.username, "API"))
#set( $today = $util.time.nowISO8601() )
#set( $id_ = "$util.autoUlid()")
#set( $obj.id = $id_ )
#set( $obj.et = $et )
#set( $obj.co = $today )
#set( $obj.cb = $user )
#set( $obj = $util.dynamodb.toMapValues($obj) )
<% if tenantId #set( $tenantId_HASH = "#T#") %>

<% if tenantId #set( $pk = "$tenantId_HASH$tenantId_$prefix_") %>
<% if !tenantId #set( $pk = "$prefix_") %>
#set( $sk = "$prefix_$id_")

{
	"version" : "2017-02-28",
	"operation" : "PutItem",
	"key" : {
			"PK": $util.dynamodb.toDynamoDBJson($pk),
			"SK": $util.dynamodb.toDynamoDBJson($sk)
	},
	"attributeValues" : $util.toJson($obj)
}`
