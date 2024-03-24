export default `#set( $id_ = $ctx.args.input.id)
#set( $tenantId_ = $util.defaultIfNullOrEmpty($context.identity.claims.get("custom:tenantId"), $ctx.args.input.tenantId))
#if( $util.isNullOrEmpty($tenantId_) )
	$util.error("Tennant is required")
#end
#set( $obj.tenantId = $tenantId_ )

#set( $prefix_ = "#STU#")
#set( $T_HASH_ = "#T#")

#set( $pk = "$P_HASH_$tenantId_$prefix_")
#set( $sk = "$prefix_$id_")

{
	"version" : "2017-02-28",
	"operation" : "DeleteItem",
		"key" : {
			"PK": { "S" : "$pk" },
			"SK": { "S" : "$sk" }
		},
}`
