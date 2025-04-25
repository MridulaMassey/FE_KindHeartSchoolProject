import { useEffect, useState } from 'react';

export const useStudentIdFromUserId = (userId: string) => {
  const [studentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentId = async () => {
      try {
        const res = await fetch(`https://localhost:44361/api/Student/get-student-id-by-userID/${userId}`);
        const data = await res.json();
        setStudentId(data.studentId);
      } catch (err) {
        console.error('Error fetching studentId:', err);
      }
    };

    if (userId) {
      fetchStudentId();
    }
  }, [userId]);

  return studentId;
};
