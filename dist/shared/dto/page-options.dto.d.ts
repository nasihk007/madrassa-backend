import { Order } from '../constants/constants';
export declare class PageOptionsDto {
    order?: Order;
    page?: number;
    take?: number;
    limit?: number;
    query?: string;
    studentId?: string;
    classDivisionId?: string;
    academicYearId?: string;
    priority?: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    get skip(): number;
    get takeOrLimit(): number;
}
