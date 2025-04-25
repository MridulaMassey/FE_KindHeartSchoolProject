export interface ActivityDetails {
    activityId: string;
    activityName: string;
    title: string;
    description: string;
    pdfUrl?: string;
    studentPdfUrl?: string;
    dueDate: string;
    classGroupName?: string;
    classLevel?: string;
    subjectName?: string;
    teacherUserFirstName?: string;
    teacherUserLastName?: string;
    studentUserFirstName?: string;
    studentUserLastName?: string;
    studentId?: string;
    weightagePercent: number;
    feedback?: string;
    grade?: number;
    hasFeedback: boolean;
    submissionDate?: string;
    status?: string;
    maxGrade?: number;
  }
  
  export interface ActivityApiResponse {
    activityId: string;
    studentId: string;
    studentUsername: string;
    activityActivityName: string;
    classGroupSubjectClassGroupClassName: string;
    activityTeacherUserFirstName: string;
    activityTeacherUserLastName: string;
    activityWeightagePercent: string;
    activityTitle: string;
    activityDescription: string;
    activityDueDate: string;
    feedback: string;
    pdfUrl: string;
    Grade: number;
  }
  