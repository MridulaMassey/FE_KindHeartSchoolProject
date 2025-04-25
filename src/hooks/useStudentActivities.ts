import { useState, useEffect } from "react";

interface Activity {
  activityId: string;
  title: string;
  description: string;
  dueDate: string;
  pdfUrl: string;
  isSubmitted: boolean;
  submissionUrl?: string;
  submissionDate?: string;
  feedback?: string;
  grade?: number;
  studentcomment?: string;
}

export const useStudentActivities = () => {
  const [username, setUsername] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);

  const fetchActivities = async (user: string) => {
    const res = await fetch(`https://localhost:44361/api/student/${user}/activities-with-submission`);
    const data = await res.json();
    setActivities(data);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "";
    setUsername(storedUsername);

    if (storedUsername) {
      fetchActivities(storedUsername);
    }
  }, []);

  const getUpcomingActivities = () => {
    const now = new Date();
    return activities.filter(a => new Date(a.dueDate) > now);
  };

  const refreshActivities = async () => {
    if (username) {
      await fetchActivities(username);
    }
  };

  return { activities, username, getUpcomingActivities, refreshActivities };
};
