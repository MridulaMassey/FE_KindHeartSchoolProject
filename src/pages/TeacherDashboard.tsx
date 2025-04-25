import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import TeacherSidebar from '../components/layout/TeacherSidebar';
import { useNavigate } from 'react-router-dom';
import StudentJournalFeed from "@/components/StudentJournalFeed";
import { useStudentJournalFeed } from "@/hooks/useStudentJournalFeed";
import UploadModal from "@/components/UploadPrintableModal";



interface ClassGroup {
  classGroupId: string;
  className: string;
  adminId: string;
  students: any[];
  activities: any[];
  classGroupSubjects: any[];
}

const TeacherDashboard: React.FC = () => {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const navigate = useNavigate();
  const { journalFeed, loading } = useStudentJournalFeed();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const userName = localStorage.getItem('username');

  // useEffect(() => {
  //   const fetchClasses = async () => {
  //     try {
  //       const response = await fetch('https://localhost:44361/api/classgroups');
  //       const data = await response.json();
  //       setClasses(data);
  //     } catch (error) {
  //       console.error('Failed to fetch class groups:', error);
  //     }
  //   };

  //   fetchClasses();
  // }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      // 1. Fetch class groups
      try {
        const classGroupResponse = await fetch('https://localhost:44361/api/classgroups');
        const classData = await classGroupResponse.json();
        setClasses(classData);
      } catch (error) {
        console.error('Failed to fetch class groups:', error);
      }
  
      // 2. Fetch teacherId based on username
      const username = localStorage.getItem("username");
  
      if (!username) {
        console.error("Username not found in localStorage.");
        return;
      }
  
      try {
        const teacherRes = await fetch(`https://localhost:44361/api/Teacher/get-teacher-id/${username}`);
        const teacherData = await teacherRes.json();
  
        if (teacherData.teacherId) {
          console.log("Fetched teacherId:", teacherData.teacherId);
          localStorage.setItem("teacherId", teacherData.teacherId);
        } else {
          console.warn("Teacher ID not returned from API:", teacherData);
        }
      } catch (error) {
        console.error("Failed to fetch teacherId:", error);
      }
    };
  
    fetchInitialData();
  }, []);
  
  return (
    <div className="flex h-screen">
      <TeacherSidebar />

      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Teacher Dashboard</h1>
          <div className="flex items-center gap-4">
            <Input placeholder="Search..." className="w-64" />
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">
              AD
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Side: Main Dashboard */}
          <section className="col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <h2 className="text-2xl font-bold">12</h2>
                  <p>Activities Created</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h2 className="text-2xl font-bold">5</h2>
                  <p>Pending Submissions</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h2 className="text-2xl font-bold">30</h2>
                  <p>Students</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <h2 className="text-2xl font-bold">4</h2>
                  <p>Upcoming Dates</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-4 flex gap-4 flex-wrap">
                <Button variant="outline" onClick={() => navigate('/activities/create')}>➕ Create Activity</Button>
                <Button variant="outline">📥 View Submissions</Button>
                <Button variant="outline">🗓 Add to Calendar</Button>
                <Button variant="outline">👨‍🏫 Manage Students</Button>
              </CardContent>
            </Card>

            {/* Recent Submissions */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Recent Submissions</h2>
              {["Emma Johnson", "Michael Smith", "Sophia Davis"].map((name, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <p><strong>{name}</strong><br />Assignment Title</p>
                    </div>
                    <Button variant="outline">Feedback</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Right Side: Sidebar Content */}
          <aside className="space-y-6">
            {/* Kindness Resources */}
            <div>
              <h2 className="text-lg font-semibold mb-2">🌼 Kindness Resources</h2>
              <Card>
                <CardContent className="p-4 space-y-2">
                  <p><a href="/resources/tips" className="text-blue-600 hover:underline">💡 Daily Kindness Tips</a></p>
                  {/* <p><a href="/resources/printables" className="text-blue-600 hover:underline">📄 Printable Materials</a></p> */}
                  <p>        <button
          onClick={() => setShowUploadModal(true)}
          className="text-blue-600 hover:underline"
        >
          📄 Printable Materials
        </button></p>
        <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
                  <p><a href="/resources/kindness101" className="text-blue-600 hover:underline">📖 Kindness 101</a></p>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Dates */}
            <div>
              <h2 className="text-lg font-semibold mb-2">📅 Upcoming Dates</h2>
              <Card>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p><strong>APR 25</strong><br />Essay on Habitats</p>
                  </div>
                  <div className="text-right">
                    <p>Science 303<br />Math 101</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Student Journal Feed */}
            <div>
              <Card>
                <CardContent className="p-4 space-y-2 text-sm">
                  <StudentJournalFeed />
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
