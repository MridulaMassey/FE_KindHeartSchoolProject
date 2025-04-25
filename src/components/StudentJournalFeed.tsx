import React, { useEffect, useState } from "react";

interface JournalEntry {
  journalId: string;
  studentName: string;
  entryText: string;
  entryDate: string;
}

const StudentJournalFeed: React.FC = () => {
  const [journalFeed, setJournalFeed] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await fetch('https://localhost:44361/api/KindnessJournal/all');
        const data = await response.json();
        setJournalFeed(data);
      } catch (error) {
        console.error("Failed to fetch journal feed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">📓 Student Journal Feed</h2>
      <div className="bg-white rounded p-4 border">
        {loading ? (
          <p>Loading journal entries...</p>
        ) : (
          journalFeed.map((entry) => (
            <p
              key={entry.journalId}
              className="cursor-pointer hover:text-blue-600 text-sm"
              onClick={() => setSelectedEntry(entry)}
            >
              <strong>{entry.studentName}:</strong> "{entry.entryText.slice(0, 60)}..."
            </p>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-md relative">
            <button
              onClick={() => setSelectedEntry(null)}
              className="absolute top-2 right-2 text-red-600 text-xl"
            >
              ✖
            </button>
            <h3 className="text-lg font-bold text-red-700 mb-2">{selectedEntry.studentName}'s Kindness Moment</h3>
            <p className="text-sm text-gray-700">{selectedEntry.entryText}</p>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(selectedEntry.entryDate).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentJournalFeed;
