import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Entry {
  journalId: string;
  studentId: string;
  entryDate: string; // ISO string
  entryText: string;
  emoji: string;
}

const KindnessJournalCalendar = ({ studentId }: { studentId: string }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  //const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [selectedEntries, setSelectedEntries] = useState<Entry[]>([]);


  useEffect(() => {
    const fetchEntries = async () => {
      const res = await fetch(`https://localhost:44361/api/KindnessJournal/student/${studentId}`);
      const data = await res.json();
      setEntries(data);
    };
    fetchEntries();
  }, [studentId]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    // const match = entries.find(e => new Date(e.entryDate).toDateString() === date.toDateString());
    // setSelectedEntry(match || null);
    const matches = entries.filter(e => new Date(e.entryDate).toDateString() === date.toDateString());
    setSelectedEntries(matches);

  };

   const tileContent = ({ date }: { date: Date }) => {
    const hasEntry = entries.some(e => new Date(e.entryDate).toDateString() === date.toDateString());
    if (hasEntry) return <span className="text-green-500 text-sm">🔹</span>;
    return null;

};

  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-red-700">📅 My Kindness Calendar</h2>

      <Calendar
        onClickDay={handleDateClick}
        tileContent={tileContent}
        className="rounded-md shadow-md mb-6"
        tileDisabled={({ date }) => date > new Date()}
  tileClassName={({ date }) => {
    if (date > new Date()) {
      return 'text-gray-400 opacity-50 cursor-not-allowed';
    }
    return '';
  }}

      />

      {selectedDate && (
        <div className="mt-4 bg-yellow-50 p-4 rounded border border-yellow-300">
          {/* <h3 className="text-lg font-semibold text-gray-800">
            {selectedDate.toDateString()}
          </h3>
           {selectedEntries.length > 0 ? (
            <ul className="space-y-2 mt-2">
                {selectedEntries.map((entry) => (
                <li key={entry.journalId} className="border rounded bg-white p-3 shadow">
                    <p>{entry.entryText}</p>
                    <p className="text-xl">{entry.emoji}</p>
                </li>
                ))}
            </ul>
            ) : (
            <p className="text-gray-500 mt-2">No entries yet for this day.</p>
            )} */}
 <h3 className="text-lg font-semibold text-gray-800">
    {selectedDate.toDateString()}
  </h3>

  {selectedEntries.length > 0 ? (
    <div className="mt-2 max-h-72 overflow-y-auto pr-1 space-y-2">
      {selectedEntries.map((entry) => (
        <div
          key={entry.journalId}
          className="border rounded bg-white p-3 shadow"
        >
          <p>{entry.entryText}</p>
          <p className="text-xl">{entry.emoji}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 mt-2">No entries yet for this day.</p>
  )}
        </div>
        
      )}
    
    </div>
  );
};

export default KindnessJournalCalendar;
