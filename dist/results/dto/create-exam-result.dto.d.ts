export declare class CreateExamResultDto {
    subject: string;
    marks: number;
    totalMarks: number;
    examType: string;
    examDate: string;
    grade?: string;
    studentId: string;
    markedById?: string;
    markedByUserId?: string;
    academicYearId?: string;
    passFailStatus?: 'pass' | 'fail';
    resultEntrySessionId?: string;
}
