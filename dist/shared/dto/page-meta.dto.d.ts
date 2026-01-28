import { PageMetaDtoParameters } from '../interfaces';
export declare class PageMetaDto {
    readonly page: number;
    readonly take: number;
    readonly itemCount: number;
    readonly pageCount: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;
    constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters);
}
