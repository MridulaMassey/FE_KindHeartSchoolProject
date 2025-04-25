import { useEffect, useState } from "react";

export interface StudentProfile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ClassGroupWithStudents {
  classGroupId: string;
  className: string;
  students: StudentProfile[];
}

export const useTeacherClassGroups = () => {
  const [data, setData] = useState<ClassGroupWithStudents[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassGroups = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) return;

        const res = await fetch(`https://localhost:44361/api/Teacher/${username}/students`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch teacher class groups:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClassGroups();
  }, []);

  return { classGroups: data, loading };
};
