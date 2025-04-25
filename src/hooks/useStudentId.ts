import { useEffect, useState } from "react";

export function useStudentId() {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");

    const fetchStudentId = async () => {
      if (!username) {
        setError("Username not found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://localhost:44361/api/Student/get-student-id/${username}`);
        if (!res.ok) {
          throw new Error("Failed to fetch student ID");
        }

        const data = await res.json();
        setStudentId(data.studentId);
      } catch (err) {
        console.error("Error fetching student ID:", err);
        setError("Could not load student ID.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentId();
  }, []);

  return { studentId, loading, error };
}
