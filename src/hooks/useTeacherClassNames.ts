import { useEffect, useState } from "react";

export const useTeacherClassNames = () => {
  const [classGroupNames, setClassGroupNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchClassNames = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) return;

        const teacherRes = await fetch(`https://localhost:44361/api/Teacher/get-teacher-id/${username}`);
        const teacherData = await teacherRes.json();
        const teacherId = teacherData.teacherId;
        localStorage.setItem("teacherId", teacherId);

        const classRes = await fetch(`https://localhost:44361/api/classgroups/teacher-load/${teacherId}`);
        const classData = await classRes.json();

        if (Array.isArray(classData.classGroupNames)) {
          setClassGroupNames(classData.classGroupNames);
        } else {
          console.warn("Expected classGroupNames array, got:", classData);
          setClassGroupNames([]);
        }
      } catch (error) {
        console.error("Error loading class group names:", error);
        setClassGroupNames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClassNames();
  }, []);

  return { classGroupNames, loading };
};
