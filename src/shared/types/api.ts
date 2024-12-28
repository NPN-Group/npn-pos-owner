export type APIResponse<T> = {
    statusCode: number;
    message: string;
    error: string[] | unknown;
    data?: T
};
