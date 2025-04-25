// import React from 'react';
// import KindnessJournal from './KindnessJournal';
// import KindnessJournalCalendar from './KindnessJournalCalendar';

// const KindnessJournalDashboard = ({ studentId }: { studentId: string }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
//       {/* Journal Form (Left Column) */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-bold text-red-600 mb-4">Kindness Journal</h2>
//         <p className="text-gray-700 mb-4">
//           A kindness journal helps kids reflect on their kind actions and how being kind makes them feel!
//         </p>
//         <KindnessJournal studentId={studentId} />
//       </div>

//       {/* Calendar + History (Right Column) */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-bold text-red-600 mb-4">📅 My Kindness Journal</h2>
//         <KindnessJournalCalendar studentId={studentId} />
//       </div>
//     </div>
//   );
// };

// export default KindnessJournalDashboard;
import React from 'react';
import KindnessJournal from './KindnessJournal';
import KindnessJournalCalendar from './KindnessJournalCalendar';

const KindnessJournalDashboard = ({ studentId }: { studentId: string }) => {
  return (
    <div className="w-full">
      {/* Header */}
      {/* <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">📖 Kindness Journal</h2> */}
        <br></br>
      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Write Section */}
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-200">
          <KindnessJournal studentId={studentId} />
        </div>

        {/* Right: Calendar View */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <KindnessJournalCalendar studentId={studentId} />
        </div>
      </div>
    </div>
  );
};

export default KindnessJournalDashboard;
