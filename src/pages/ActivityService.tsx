import { toast } from "sonner";

export interface Activity {
  id: number;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Graded" | "Overdue";
  instructions?: string;
  resources?: Resource[];
  submissionType?: string;
  points?: number;
  submissionDate?: string | null;
  feedback?: string | null;
  grade?: number | null;
  attachments?: Attachment[];
  activityId:string;
}

export interface Resource {
  id: number;
  name: string;
  type: string;
  url: string;
}

export interface Attachment {
  id: number;
  name: string;
  type: string;
  url: string;
  uploadDate: string;
}

export class ActivityService {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = "https://localhost:44361/api";
  }

  async getActivities(): Promise<Activity[]> {
    try {
      const response = await fetch(`${this.baseUrl}/activities/activitieslist`);
      console.log("activity service"+response);
      if (!response.ok) {
        throw new Error("Failed to fetch activities");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching activities:", error);
      toast.error("Failed to load activities");
      return [];
    }
  }

  async getActivity(id: number): Promise<Activity | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        throw new Error(`Activity with ID ${id} not found`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching activity ${id}:`, error);
      toast.error("Failed to load activity details");
      return null;
    }
  }

  async submitActivity(id: number, data: FormData): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/submit`, {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw new Error("Failed to submit activity");
      }
      return true;
    } catch (error) {
      console.error(`Error submitting activity ${id}:`, error);
      toast.error("Failed to submit activity");
      return false;
    }
  }
}

export const activityService = new ActivityService();
