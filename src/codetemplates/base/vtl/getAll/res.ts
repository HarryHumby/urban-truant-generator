export default `{
    "data": $util.toJson($ctx.result.items),
    "nextToken": $util.toJson($util.defaultIfNullOrBlank($ctx.result.nextToken, null))
    }`