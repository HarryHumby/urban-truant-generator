export interface ServiceResponse<T> {
    success: boolean;
    data?: T;
    errors?: ServiceResponseMessage[];
    nextToken?: string;
}

export interface ServiceResponseMessage {
    code: string;
    message: string;
}