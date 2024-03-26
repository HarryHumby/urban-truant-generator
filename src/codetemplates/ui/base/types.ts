export default `export type <% pascalCaseName %> = {
    <% dataPatternFields %>
}

export type Create<% pascalCaseName %>Input = {
    <% dataPatternFieldsCreate %>
}

export type Update<% pascalCaseName %>Input = {
    <% dataPatternFieldsUpdate %>
}

export type Delete<% pascalCaseName %>Input = {
    id: string;
}

export type Get<% pascalCaseName %>Input = {
    id: string;
}

export type Get<% pascalCaseName %>sInput = {
    tenantId?: string;
}`