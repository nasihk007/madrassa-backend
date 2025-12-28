export declare class DataResponseDto {
    readonly statusCode: number;
    readonly status: boolean;
    readonly message: string;
    readonly data: any;
    readonly meta: any;
    readonly token?: string;
    readonly refreshToken?: string;
    constructor(data: any, status: boolean, message: string, meta?: any);
}
