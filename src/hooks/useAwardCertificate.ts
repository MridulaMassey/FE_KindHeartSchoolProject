import { useState, useEffect } from 'react';

export const useAwardCertificate = () => {
  const [showModal, setShowModal] = useState(false);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [teacherId, setTeacherId] = useState<string>('');

  useEffect(() => {
    const fetchTeacherId = async () => {
      const username = localStorage.getItem('username');
      if (!username) return;

      try {
        const res = await fetch(`https://localhost:44361/api/Teacher/get-teacher-id/${username}`);
        const data = await res.json();
        setTeacherId(data.teacherId);
      } catch (error) {
        console.error('Failed to fetch teacher ID:', error);
      }
    };

    fetchTeacherId();
  }, []);

  const openAwardModal = (id: string) => {
    setStudentId(id);
    setShowModal(true);
  };

  const closeAwardModal = () => {
    setStudentId(null);
    setShowModal(false);
  };

  return {
    showModal,
    studentId,
    teacherId,
    openAwardModal,
    closeAwardModal,
  };
};
