import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import TeacherSidebar from "../components/layout/TeacherSidebar";
import { useTeacherClassGroups, ClassGroupWithStudents } from "@/hooks/useTeacherClassGroups";
import { useAwardCertificate } from '@/hooks/useAwardCertificate';
import AwardCertificateModal from '@/pages/AwardCertificateModal';

const MyClasses: React.FC = () => {
  const { classGroups, loading } = useTeacherClassGroups();
  const [selectedGroup, setSelectedGroup] = useState<ClassGroupWithStudents | null>(null);
  const {
    showModal,
    studentId,
    teacherId,
    openAwardModal,
    closeAwardModal,
  } = useAwardCertificate();

  return (
    <div className="flex h-screen">
      <TeacherSidebar />
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6">My Classes</h1>

        {loading ? (
          <p>Loading classes...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {classGroups.map((group) => (
              <Card
                key={group.classGroupId}
                onClick={() => setSelectedGroup(group)}
                className="cursor-pointer hover:shadow-lg transition"
              >
                <CardContent className="p-4">
                  <h2 className="text-lg font-bold">{group.className}</h2>
                  <p>{group.students.length} students</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedGroup && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Students in {selectedGroup.className}</h2>

            {selectedGroup.students.length > 0 ? (
              <table className="min-w-full bg-white shadow rounded overflow-hidden">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-2">Student Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Submission Progress</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedGroup.students.map((student) => (
                    <tr key={student.userId} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{student.firstName} {student.lastName}</td>
                      <td className="px-4 py-2">{student.email}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        0 of 0 submitted
                      </td>
                      <td className="px-4 py-2">
                        {/* <button
                          className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
                          onClick={() => openAwardModal(student.userId)}
                        >
                          🎖 Award Certificate
                        </button> */}
                        <button
                          className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
                          onClick={() => openAwardModal(student.userId)}
                        >
                          🎖 Award Certificate
                        </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No students in this class group.</p>
            )}
          </div>
        )}

        {showModal && studentId && (
          <AwardCertificateModal
            studentUserId={studentId} // <-- userId passed in
            teacherId={teacherId}
            onClose={closeAwardModal}
          />
        )}
      </main>
    </div>
  );
};

export default MyClasses;
