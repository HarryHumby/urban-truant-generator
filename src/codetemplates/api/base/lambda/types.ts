export default `import IBase from "../../../../utils/IBase";

export interface I<% pascalCaseName %> extends IBase {
<% dataPatternFields %>
}

export interface I<% pascalCaseName %>List {
data: I<% pascalCaseName %>[];
nextToken: string;
}

export interface ICreate<% pascalCaseName %>Input {
<% dataPatternFieldsCreate %>
}

export interface IUpdate<% pascalCaseName %>Input {
<% dataPatternFieldsUpdate %>
}`