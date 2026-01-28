import { PageMetaDto } from './page-meta.dto';
export declare class CommonDataResponseDto {
    readonly statusCode: number;
    readonly status: boolean;
    readonly message: string;
    readonly data: any;
    readonly meta: PageMetaDto | null;
    constructor(data: any, status: boolean, message: string, meta?: PageMetaDto | null);
}
