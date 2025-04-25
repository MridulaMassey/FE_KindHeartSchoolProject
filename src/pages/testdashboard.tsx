import React from 'react';
import { Award, HandHeart, BookOpen, Calendar, Clock, Upload, Sparkles, User, Users, ChartBar, MessageSquare, Book, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useNavigate } from "react-router-dom";

const Dashboard = ({ userType = "student", userName = "User" }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-200 via-green-200 to-blue-200">
      <Header isLoggedIn={true} userType={userType} userName={userName} />
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            {userType === "student" ? (
              <StudentDashboard />
            ) : (
              <TeacherDashboard />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// 🎨 Student Dashboard with Fun Colors
const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 animate-fade-in">
          <Card className="bg-yellow-100 border-4 border-yellow-300 shadow-lg hover:bg-yellow-200 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-700">
                <HandHeart className="h-10 w-10 text-red-500" />
                <span>Learn Kindness</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-yellow-200 hover:bg-yellow-300 transition-all cursor-pointer shadow-md">
                  <h3 className="text-2xl font-bold text-blue-600">Kindness Quest</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="animate-fade-in">
          <Card className="bg-blue-100 border-4 border-blue-300 shadow-lg hover:bg-blue-200 transition-all">
            <CardHeader className="flex flex-col items-center">
              <img src="avatar.jpg" alt="Student Avatar" className="w-20 h-20 rounded-full border-2 border-blue-600 shadow-md" />
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <h2 className="text-xl font-bold text-blue-800">Hi! Student</h2>
              <p className="text-gray-600">Year 5</p>
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-green-600">🌟 Points: 1200</p>
                <p className="text-lg font-semibold text-purple-600">🏅 Badges: 5</p>
                <p className="text-lg font-semibold text-red-500">💖 Kindness Score: 90%</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 animate-fade-in">
          <Card className="bg-pink-100 border-4 border-pink-300 shadow-lg hover:bg-pink-200 transition-all">
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-2 bg-green-200 rounded-2xl shadow-lg hover:bg-green-300 transition-all">
                  <CardHeader>
                    <h3 className="text-lg font-bold mb-1">Upcoming Tasks</h3>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-blue-700">
                      <li>🔬 Science Worksheet</li>
                      <li>💙 Help a classmate</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="p-2 bg-orange-200 rounded-2xl shadow-lg hover:bg-orange-300 transition-all">
                  <CardHeader>
                    <h3 className="text-lg font-bold mb-1">Recent Feedback</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold">5</div>
                      <Award className="h-8 w-8 text-yellow-600" />
                    </div>
                    <p className="text-xs text-gray-700 mt-1">2 new badges earned</p>
                  </CardContent>
                </Card>

                <Card className="p-2 bg-blue-200 rounded-2xl shadow-lg hover:bg-blue-300 transition-all">
                  <CardHeader>
                    <h3 className="text-lg font-bold mb-1">Overall Progress</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-sm">
                        <span>Grade Level Progress</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2 bg-yellow-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
