export default `#set( $et = "STUDENT")
#set( $prefix_ = "#STU#")

#set( $T_HASH_ = "#T#")
#set( $tenantId_ = $util.defaultIfNullOrEmpty($context.identity.claims.get("custom:tenantId"), $ctx.args.input.tenantId))
#if( $util.isNullOrEmpty($tenantId_) )
	$util.error("Tennant is required")
#end
#set( $obj.tenantId = $tenantId_ )
#set( $lastName_ = $util.str.toReplace($util.defaultIfNullOrEmpty($ctx.args.input.lastName, "").toLowerCase(), " ", ""))
#set( $firstName_ = $util.str.toReplace($util.defaultIfNullOrEmpty($ctx.args.input.firstName, "").toLowerCase(), " ", ""))
#set( $pk = "$T_HASH_$tenantId_$prefix_")
#set( $sk = "$lastName_$firstName_")

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
