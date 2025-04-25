import { useEffect, useState } from "react";

export interface JournalEntry {
  journalId: string;
  studentName: string;
  entryText: string;
  entryDate: string;
}

export const useStudentJournalFeed = () => {
  const [journalFeed, setJournalFeed] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const res = await fetch("https://localhost:44361/api/KindnessJournal/all");
        const data = await res.json();
        setJournalFeed(data);
      } catch (error) {
        console.error("Failed to fetch journal feed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  return { journalFeed, loading };
};
