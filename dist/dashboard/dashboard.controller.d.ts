import { DashboardService } from './dashboard.service';
import { CommonDataResponseDto } from '../shared/dto/common-data-response.dto';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(req: any): Promise<CommonDataResponseDto>;
    getStudentStats(req: any, studentId: string): Promise<CommonDataResponseDto>;
}
