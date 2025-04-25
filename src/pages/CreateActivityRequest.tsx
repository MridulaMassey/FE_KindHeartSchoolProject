// TypeScript representation of the C# model
export interface CreateActivityRequest {
    title: string;
    description: string;
    subjectId: string; // GUID as string
    pdfUrl?: string; // For base64 encoded string of the file
    dueDate: string; // ISO date string
    classLevel?: string;
    teacherId: string; // GUID as string
    classGroupId?: string; // Optional GUID as string
    activityName: string;
    weightagePercent: number;
  }
  
  // Activity response from the API
  export interface ActivityResponse {
    activityId: string;
    title: string;
    description: string;
    activityName: string;
    dueDate: string;
    classGroupId?: string;
    teacherId: string;
    pdfUrl?: string;
    createdAt: string;
    updatedAt: string;
    subjectId: string;
    classLevel?: string;
    weightagePercent: number;
  }
  
  // API error response structure
  export interface ApiErrorResponse {
    status: number;
    message: string;
    errors?: Record<string, string[]>;
  }
  