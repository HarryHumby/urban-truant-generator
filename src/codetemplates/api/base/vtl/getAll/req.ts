export default `#set( $et = "<% upperCaseName %>")
#set( $prefix_ = "<% hash %>")

<% if tenantId #set( $tenantId_HASH = "#T#") %>
<% if tenantId #set( $tenantId_ = $util.defaultIfNullOrEmpty($context.identity.claims.get("custom:tenantId"), $ctx.args.input.tenantId)) %>
<% if tenantId #if( $util.isNullOrEmpty($tenantId_) ) %>
<% if tenantId 	$util.error("Tennant is required") %>
<% if tenantId #end %>
<% if tenantId #set( $obj.tenantId = $tenantId_ ) %>
<% if tenantId #set( $pk = "$tenantId_HASH$tenantId_$prefix_") %>
<% if !tenantId #set( $pk = "$prefix_") %>

## // TODO: HH: Setup GSI1 adn GSI2 correctly
#if( $util.isNullOrEmpty($sk))
	#set( $condition = "GSI1_PK = :pk" )
	#set( $expressionValues = {":pk": { "S": "$pk" }})
#else
	#set( $condition = "GSI1_PK = :pk and begins_with(GSI1_SK, :sk)" )
	#set( $expressionValues = {
		":pk": { "S": "$pk" },
		":sk": { "S": "$sk" } } )
#end

{
	"version" : "2017-02-28",
	"operation" : "Query",
	"index" : "GSI1",
	"query" : {
		"expression": "$condition",
		"expressionValues" : $util.toJson($expressionValues)
	},
	"limit": $util.defaultIfNull($ctx.args.limit,20),
	"nextToken": $util.toJson($util.defaultIfNullOrBlank($ctx.args.nextToken, null))
}`
