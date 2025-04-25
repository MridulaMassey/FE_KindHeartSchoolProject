// hooks/useTeacherClasses.ts
import { useEffect, useState } from 'react';

export interface Student {
  fullName: string;
}

export interface Activity {
  title: string;
  description: string;
}

export interface ClassGroup {
  classGroupId: string;
  className: string;
  adminId: string;
  students: Student[];
  activities: Activity[];
  classGroupSubjects: any[];
}

export const useTeacherClasses = () => {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherClasses = async () => {
      try {
        const username = localStorage.getItem('username');
        if (!username) {
          console.error("Username not found in localStorage");
          return;
        }

        const teacherRes = await fetch(`https://localhost:44361/api/Teacher/get-teacher-id/${username}`);
        const teacherData = await teacherRes.json();
        const teacherId = teacherData.teacherId;

        const classRes = await fetch(`https://localhost:44361/api/classgroups/teacher-load/${teacherId}`);
        const classData = await classRes.json();

        if (Array.isArray(classData)) {
            setClasses(classData);
          } else {
            console.warn("Unexpected class data:", classData);
            setClasses([]); // fallback to empty list
          }
        //     setClasses(classData);
        //     } catch (error) {
        // console.error("Failed to fetch teacher classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherClasses();
  }, []);

  return { classes, loading };
};
