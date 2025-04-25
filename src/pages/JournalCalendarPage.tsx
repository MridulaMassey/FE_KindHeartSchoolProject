import React, { useEffect, useState } from 'react';
import KindnessJournalCalendar from '@/components/KindnessJournalCalendar';

const JournalCalendarPage = () => {
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    const fetchStudentId = async () => {
      const res = await fetch(`https://localhost:44361/api/Student/get-student-id/${username}`);
      const data = await res.json();
      setStudentId(data.studentId);
    };
    fetchStudentId();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-pink-100 p-6">
      {studentId ? (
        <KindnessJournalCalendar studentId={studentId} />
      ) : (
        <p>Loading your journal...</p>
      )}
    </div>
  );
};

export default JournalCalendarPage;
