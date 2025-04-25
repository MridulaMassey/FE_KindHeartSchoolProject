export interface ActivityDetails {
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
    feedback: string;
    pdfUrl: string;
  }
  
  export interface SubmissionFile {
    fileBase64: string;
    fileName: string;
  }
  