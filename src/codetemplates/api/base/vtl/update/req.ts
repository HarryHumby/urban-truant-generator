export default `#set( $id_ = $ctx.args.input.id )
<% if tenantId #set( $tenantId_ = $util.defaultIfNullOrEmpty($context.identity.claims.get("custom:tenantId"), $ctx.args.input.tenantId)) %>
<% if tenantId #if( $util.isNullOrEmpty($tenantId_) ) %>
<% if tenantId 	$util.error("Tennant is required") %>
<% if tenantId #end %>
<% if tenantId #set( $obj.tenantId = $tenantId_ ) %>

#set( $et = "<% upperCaseName %>")
#set( $prefix_ = "<% hash %>")
#set( $user = $util.defaultIfNullOrEmpty($context.identity.username, "API"))
#set( $today = $util.time.nowISO8601() )
<% if tenantId #set( $T_HASH_ = "#T#") %>
<% if tenantId #set( $pk = "$T_HASH_$tenantId_$prefix_") %>
<% if !tenantId #set( $pk = "$prefix_") %>
#set( $sk = "$prefix_$id_")

{
	"version" : "2017-02-28",
	"operation" : "UpdateItem",
		"key" : {
			"PK": $util.dynamodb.toDynamoDBJson($pk),
			"SK": $util.dynamodb.toDynamoDBJson($sk)
		},
	#set( $expNames  = {} )
	#set( $expValues = {} )
	#set( $expSet = {} )
	#set( $expAdd = {} )
	#set( $expRemove = [] )
	#foreach( $entry in $ctx.args.input.entrySet() )
		#if( $entry.key != "id" )
			#if( (!$entry.value) && ("$!{entry.value}" == "") )
				#set( $discard = \${expRemove.add("#\${entry.key}")} )
				$!{expNames.put("#\${entry.key}", "$entry.key")}
			#else
				$!{expSet.put("#\${entry.key}", ":\${entry.key}")}
				$!{expNames.put("#\${entry.key}", "$entry.key")}
				$!{expValues.put(":\${entry.key}",$util.dynamodb.toDynamoDB(\${entry.value}))}
			#end
		#end

		// TODO: HH: Will need to add some logic for gsi's
	#end

	#set( $savedOn = "so" )
	$!{expSet.put("#\${savedOn}", ":\${savedOn}")}
	$!{expNames.put("#\${savedOn}", "\${savedOn}")}
	$!{expValues.put(":\${savedOn}", { "S" : "$today" })}

	#set( $savedBy = "sb" )
	$!{expSet.put("#\${savedBy}", ":\${savedBy}")}
	$!{expNames.put("#\${savedBy}", "\${savedBy}")}
	$!{expValues.put(":\${savedBy}", { "S" : "$user" })}

	#set( $expression = "" )
		#if( !\${expSet.isEmpty()} )
			#set( $expression = "SET" )
			#foreach( $entry in $expSet.entrySet() )
				#set( $expression = "\${expression} \${entry.key} = \${entry.value}" )
			#if ( $foreach.hasNext )
			#set( $expression = "\${expression}," )
			#end
		#end
	#end
	#if( !\${expAdd.isEmpty()} )
		#set( $expression = "\${expression} ADD" )
		#foreach( $entry in $expAdd.entrySet() )
			#set( $expression = "\${expression} \${entry.key} \${entry.value}" )
			#if ( $foreach.hasNext )
				#set( $expression = "\${expression}," )
			#end
		#end
	#end
	#if( !\${expRemove.isEmpty()} )
		#set( $expression = "\${expression} REMOVE" )
		#foreach( $entry in $expRemove )
			#set( $expression = "\${expression} \${entry}" )
			#if ( $foreach.hasNext )
				#set( $expression = "\${expression}," )
			#end
		#end
	#end
	"update" : {
	"expression" : "\${expression}"
	#if( !\${expNames.isEmpty()} )
		,"expressionNames" : $utils.toJson($expNames)
	#end
	#if( !\${expValues.isEmpty()} )
		,"expressionValues" : $utils.toJson($expValues)
	#end
	},
}`
