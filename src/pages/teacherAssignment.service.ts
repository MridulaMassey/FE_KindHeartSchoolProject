import { toast } from "sonner";
import { ActivityApiResponse, ActivityDetails } from "./activity.types";

export const teacherAssignmentService = {
  async fetchActivityDetails(activityId: string, studentId: string): Promise<ActivityDetails> {
    const response = await fetch(`https://localhost:44361/api/classgroupsubjectstudentactivities/teachersubmission`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'text/plain'
      },
      body: JSON.stringify({
        activityId,
        studentId
      })
    });

    if (!response.ok) {
      throw new Error("Failed to fetch activity details");
    }

    const data = await response.json();
    const activityData = Array.isArray(data) ? data[0] : data;

    if (!activityData) {
      throw new Error("Activity not found");
    }

    return {
      activityId: activityData.activityId,
      activityName: activityData.activityActivityName,
      title: activityData.activityTitle,
      description: activityData.activityDescription,
      pdfUrl: activityData.pdfUrl,
      dueDate: activityData.activityDueDate,
      classGroupName: activityData.classGroupSubjectClassGroupClassName,
      teacherUserFirstName: activityData.activityTeacherUserFirstName,
      teacherUserLastName: activityData.activityTeacherUserLastName,
      studentId: activityData.studentId,
      studentUserFirstName: activityData.studentUsername ? activityData.studentUsername.split(' ')[0] : '',
      studentUserLastName: activityData.studentUsername ? activityData.studentUsername.split(' ')[1] || '' : '',
      weightagePercent: parseInt(activityData.activityWeightagePercent),
      feedback: activityData.feedback,
      grade: activityData.Grade,
      hasFeedback: !!activityData.feedback,
      studentPdfUrl: activityData.pdfUrl || ''
    };
  },

  async submitFeedback(activityId: string, feedback: string, grade: number | null,studentId:string) {
    const response = await fetch(`https://localhost:44361/api/activities/teachersubmission`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activityId,
        feedback: feedback.trim(),
        grade,
        studentId
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit feedback");
    }
  }
};