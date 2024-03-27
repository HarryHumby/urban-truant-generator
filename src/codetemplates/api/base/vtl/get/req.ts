export default `#set( $id_ = $ctx.args.input.id)
<% if tenantId #set( $tenantId_ = $util.defaultIfNullOrEmpty($context.identity.claims.get("custom:tenantId"), $ctx.args.input.tenantId)) %>
<% if tenantId #if( $util.isNullOrEmpty($tenantId_) ) %>
<% if tenantId 	$util.error("Tennant is required") %>
<% if tenantId #end %>
<% if tenantId #set( $obj.tenantId = $tenantId_ ) %>

#set( $et = "<% upperCaseName %>")
#set( $prefix_ = "<% hash %>")

<% if tenantId #set( $tenantId_HASH = "#T#") %>

<% if tenantId #set( $pk = "$tenantId_HASH$tenantId_$prefix_") %>
<% if !tenantId #set( $pk = "$prefix_") %>
#set( $sk = "$prefix_$id_")

{
	"version" : "2017-02-28",
	"operation" : "GetItem",
		"key" : {
			"PK": { "S" : "$pk" },
			"SK": { "S" : "$sk" }
		},
}`
