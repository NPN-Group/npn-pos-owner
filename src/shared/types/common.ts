import { APIResponse } from "./api"

export type TFocused = {
    [key: string]: boolean
}


export type TError = {
    [key: string]: string
}

export type ActionResponse<T, R> = {
    data?: T
    errors?: TError
    response?: APIResponse<R>
}
