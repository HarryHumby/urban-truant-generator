export default `#set( $obj = $ctx.args.input )
#set( $tenantId_ = $util.defaultIfNullOrEmpty($context.identity.claims.get("custom:tenantId"), $ctx.args.input.tenantId))
#if( $util.isNullOrEmpty($tenantId_) )
	$util.error("Tennant is required")
#end
#set( $obj.tenantId = $tenantId_ )

#set( $et = "STUDENT")
#set( $prefix_ = "#STU#")
#set( $user = $util.defaultIfNullOrEmpty($context.identity.username, "API"))
#set( $today = $util.time.nowISO8601() )
#set( $id_ = "$util.autoUlid()")
#set( $obj.id = $id_ )
#set( $obj.et = $et )
#set( $obj.co = $today )
#set( $obj.cb = $user )
#set( $obj = $util.dynamodb.toMapValues($obj) )
#** PK Fields **#
#set( $T_HASH_ = "#T#")
#** SK Fields **#
#** GSIs Fields **#
#** GSI: Name **#
#set( $lastName_ = $util.str.toReplace($util.defaultIfNullOrEmpty($ctx.args.input.lastName, "").toLowerCase(), " ", ""))
#set( $firstName_ = $util.str.toReplace($util.defaultIfNullOrEmpty($ctx.args.input.firstName, "").toLowerCase(), " ", ""))
#set( $obj.GSI1_PK = $util.dynamodb.toString("$T_HASH_$tenantId_$prefix_"))
#set( $obj.GSI1_SK = $util.dynamodb.toString("$lastName_$firstName_"))

#** GSI: Email **#
#set( $email_ = $util.str.toReplace($util.defaultIfNullOrEmpty($ctx.args.input.email, "").toLowerCase(), " ", ""))
#set( $obj.GSI2_PK = $util.dynamodb.toString("$T_HASH_$tenantId_$prefix_"))
#set( $obj.GSI2_SK = $util.dynamodb.toString("$email_"))

#** GSI: Partner **#
#set( $partnerId_ = $ctx.args.input.partnerId
#set( $obj.GSI3_PK = $util.dynamodb.toString("$T_HASH_$tenantId_$prefix_"))
#set( $obj.GSI3_SK = $util.dynamodb.toString("#P#$partnerId_"))

#set( $pk = "$T_HASH_$tenantId_$prefix_")
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
