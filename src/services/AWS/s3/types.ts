export type Object = {
}

export type GetObjectInput = {
    key: string;
    bucket?: string;
}

export type PutObjectInput = {
    body: string;
    key: string;
    bucket?: string;
}

export type GetObjectsInput = {
    bucket?: string;
}