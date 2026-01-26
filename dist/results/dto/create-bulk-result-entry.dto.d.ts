export declare class SubjectEntryDto {
    subjectName: string;
    marks: number;
    totalMarks: number;
}
export declare class CreateBulkResultEntryDto {
    studentId: string;
    examType: 'first_term' | 'mid_term' | 'annual';
    examDate: string;
    academicYearId: string;
    subjects?: SubjectEntryDto[];
    passFailStatus?: 'pass' | 'fail';
}
