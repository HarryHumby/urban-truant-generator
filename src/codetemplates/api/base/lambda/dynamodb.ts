export default `import {
    getItem,
    getItems,
    createItem,
    updateItem,
    deleteItem
} from "../../../../utils/dynamodb-cruds";
import { I<% pascalCaseName %>, ICreate<% pascalCaseName %>Input, IUpdate<% pascalCaseName %>Input } from "./types";
import { ulid } from "ulid";
import { gLogger } from "../../../../utils/logger";

// CREATE
export const create<% pascalCaseName %> = async (
    <% camelCaseName %>: ICreate<% pascalCaseName %>Input,
    <% if tenantId tenantId: string, %>
    cb: string = "SYSTEM"
): Promise<I<% pascalCaseName %> | undefined> => {
    const id = ulid();
    const response = await createItem<I<% pascalCaseName %>>({
        ...<% camelCaseName %>,
        id,
        et: "<% upperCaseName %>",
        PK: \`<% tenantHash %><% if tenantId \${tenantId} %><% hash %>\`,
        SK: \`<% hash %>\${id}\`,
        co: new Date().toISOString(),
        cb: cb,
    });
    return response.data;
};

// READ
export const get<% pascalCaseName %> = async (
    id: string,
    <% if tenantId tenantId: string %>
): Promise<I<% pascalCaseName %> | undefined> => {
    try {
        const response = await getItem<I<% pascalCaseName %>>(
            \`<% tenantHash %><% tenantId %><% hash %>\`,
            \`<% hash %>\${id}\`
        );
        return response.data;
    } catch (err) {
        gLogger.error(new Error(err));
        throw err;
    }
};

export const get<% pascalCaseName %>s = async (
    <% if tenantId tenantId: string %>
): Promise<I<% pascalCaseName %> | undefined> => {
    try {
        const response = await getItems<I<% pascalCaseName %>>(
            \`<% tenantHash %><% tenantId %><% hash %>\`
        );
        return response.data;
    } catch (err) {
        gLogger.error(new Error(err));
        throw err;
    }
};

// UPDATE
export const update<% pascalCaseName %> = async (
    <% camelCaseName %>: IUpdate<% pascalCaseName %>Input,
    <% if tenantId tenantId: string, %>
    sb: string = "SYSTEM"
): Promise<I<% pascalCaseName %> | undefined> => {

    const item = {
        ...<% camelCaseName %>,
        PK: \`<% tenantHash %><% if tenantId \${tenantId} %><% hash %>\`,
        SK: \`<% hash %>\${<% camelCaseName %>.id}\`,
        so: new Date().toISOString(),
        sb: sb,
    } as I<% pascalCaseName %>;

    const response = await updateItem<I<% pascalCaseName %>>(item);
    return response.data;
};

// DELETE
export const delete<% pascalCaseName %> = async (
    id: string,
    <% if tenantId tenantId: string %>
): Promise<boolean> => {
    const response = await deleteItem(\`<% tenantHash %><% tenantId %><% hash %>\`, \`<% hash %>\${id}\`);
    return response.success;
};`