export default `#set( $id_ = $ctx.args.input.id )
#set( $tenantId_ = $util.defaultIfNullOrEmpty($context.identity.claims.get("custom:tenantId"), $ctx.args.input.tenantId))
#if( $util.isNullOrEmpty($tenantId_) )
	$util.error("Tennant is required")
#end
#set( $obj.tenantId = $tenantId_ )

#set( $et = "STUDENT")
#set( $prefix_ = "#STU#")
#set( $user = $util.defaultIfNullOrEmpty($context.identity.username, "API"))
#set( $today = $util.time.nowISO8601() )
#set( $T_HASH_ = "#T#")
#set( $P_HASH_ = "#P#")
#set( $pk = "$T_HASH_$tenantId_$prefix_")
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

		#if( $entry.key == "lastName")
			#if( $util.isNullOrEmpty($ctx.args.input.lastName) )
				$util.error("lastName is required")
			#end
			#if( $util.isNullOrEmpty($ctx.args.input.firstName) )
				$util.error("firstName is required")
			#end
			#set( $lastname_ = $util.str.toReplace($util.defaultIfNullOrEmpty($ctx.args.input.lastName, "").toLowerCase(), " ", ""))
			#set( $firstname_ = $util.str.toReplace($util.defaultIfNullOrEmpty($ctx.args.input.firstName, "").toLowerCase(), " ", ""))

			#set( $gsi1sk = "GSI1_SK" )
			#set( $gsi1_sk = "$lastname_$firstname_")
			$!{expSet.put("#\${gsi1sk}", ":\${gsi1sk}")}
			$!{expNames.put("#\${gsi1sk}", "\${gsi1sk}")}
			$!{expValues.put(":\${gsi1sk}", $util.dynamodb.toDynamoDB(\${gsi1_sk}))}
		#end

		#if( $entry.key == "email")
			#if( $util.isNullOrEmpty($ctx.args.input.email) )
				$util.error("email is required")
			#end
			#set( $email_ = $util.str.toReplace($util.defaultIfNullOrEmpty($ctx.args.input.email, "").toLowerCase(), " ", ""))

			#set( $gsi2sk = "GSI2_SK" )
			#set( $gsi2_sk = "$email_")
			$!{expSet.put("#\${gsi2sk}", ":\${gsi2sk}")}
			$!{expNames.put("#\${gsi2sk}", "\${gsi2sk}")}
			$!{expValues.put(":\${gsi2sk}", $util.dynamodb.toDynamoDB(\${gsi2_sk}))}
		#end

		#if( $entry.key == "partnerId")
			#set( $partnerId_ = $ctx.args.input.partnerId )
			#set( $gsi3sk = "GSI3_SK" )
			#set( $gsi3_sk = "$P_HASH_$partnerId_")
			$!{expSet.put("#\${gsi3sk}", ":\${gsi3sk}")}
			$!{expNames.put("#\${gsi3sk}", "\${gsi3sk}")}
			$!{expValues.put(":\${gsi3sk}", $util.dynamodb.toDynamoDB(\${gsi3_sk}))}
		#end

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
