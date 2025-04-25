import React from 'react';
import { Award, HandHeart, BookOpen, Calendar, Clock, File, Upload, Sparkles, User, Users, ChartBar, MessageSquare, Book, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/layout/Header';
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useStudentActivities } from "@/hooks/useStudentActivities";


// Sample data for Student dashboard
const studentActivities = [
  {
    id: 1,
    title: "Activities",
    //subject: "Mathematics",
    //dueDate: "2023-10-15",
    // status: "Pending",
    url: "/StudentActivities" // Add navigation link here
  },
  {
    id: 2,
    title: "Challenges",
    //subject: "Science",
    //dueDate: "2023-10-18",
    //status: "Submitted",
    url: "/challenges" // Add navigation link here
  },
  {
    id: 3,
    title: "Kindness Quest",
   // subject: "Science",
   // dueDate: "2023-10-18",
   // status: "Submitted",
    url: "/quest" // Add navigation link here
  }
];


const studentAchievements = [
  {
    id: 1,
    title: "Math Whiz",
    description: "Completed 5 math activities with high scores",
    icon: <Award className="h-8 w-8 text-yellow-500" />
  },
  {
    id: 2,
    title: "Science Explorer",
    description: "Finished all science activities for the month",
    icon: <Award className="h-8 w-8 text-blue-500" />
  }

];

const Dashboard = ({ userType = "student", userName = "User" }) => {
  return (
    <div 
    className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}>
    
    <Header isLoggedIn={true} userType={userType} userName={userName} />  
      
      <main className="flex-1 py-10"> 
      <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">

            {/* Stats Section - Role-specific */}
            {userType === "student" ? (
              <StudentDashboard 
               activities={studentActivities} 
               achievements={studentAchievements} 
              />
            ) : (
              <div>Teacher Dashboard coming soon!</div> // fallback for now
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Student Dashboard Component
  const StudentDashboard = ({ activities, achievements }) => {
  const [profile, setProfile] = useState<any>(null);
  const userName = localStorage.getItem('username');
  const navigate = useNavigate();    
  const { getUpcomingActivities } = useStudentActivities(); //Fetch upcoming activites
  const upcomingTasks = getUpcomingActivities(); //Fetch upcoming activites
 
//fetch student profile details and upcomming activiites
       useEffect(() => {
        const fetchData = async () => {
          try {
            if (!userName) {
              console.warn("No username found in localStorage");
              return;
            }
      
            // 1. Fetch student profile
            const profileRes = await axios.get(`https://localhost:44361/api/Profile/${userName}`);
            setProfile(profileRes.data.profile);
      
            // 2. Fetch student ID
            const studentRes = await fetch(`https://localhost:44361/api/Student/get-student-id/${userName}`);
            const { studentId } = await studentRes.json();
            localStorage.setItem("studentId", studentId) //store studentID for rewards and other query

         } catch (error) {
            console.error("Error in fetchData:", error);
            
          }
        };
      
        fetchData();
      }, [userName]);
        
      if (!profile) return <div>Loading profile...or Profile not found</div>;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> 
         {/* Section 1*/}
         <section className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-yellow-100 border-4 border-yellow-300 shadow-lg hover:bg-yellow-100 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-700">
                    <HandHeart className="h-10 w-10 text-red-500" />
                    <span>Learn Kindness</span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {studentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="p-4 rounded-lg border bg-yellow-200 hover:bg-yellow-300 transition-all cursor-pointer shadow-md"
                        onClick={() => navigate(activity.url)} // Navigate using stored URL
                      >
                        <h3 className="text-2xl font-bold text-blue-500 font-comic">
                          {activity.title}
                        </h3>
                      </div>
                    ))}
                  </div>
                </CardContent>
            </Card>
          </section>
     
        {/* Section/column 2*/}           
        {/* Student Profile*/}
            <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Card  className="bg-blue-100 border-4 border-blue-300 shadow-lg hover:bg-blue-200 transition-all">
                  <CardHeader className="flex flex-col items-center">
                      {/* 🖼️ Avatar Image */}
                      <img src="avatar.jpg" alt="Student Avatar" className="w-20 h-20 rounded-full border-2 border-blue-700 shadow-md"/>    
                      <CardTitle className="flex items-center gap-2">
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <h2 className="text-xl font-bold text-blue-800">Hi!  {profile.firstName} </h2>  
                      <div className="mt-4 text-center">
                        <p className="text-gray-600">Year 5</p>
                        <p className="text-lg font-semibold text-green-600">🌟 Points: 1200</p>
                        <p className="text-lg font-semibold text-purple-600">🏅 Badges: 5</p>
                        <p className="text-lg font-semibold text-red-500">💖 Kindness Score: 90%</p>
                        <p className="text-gray-600">Email: {profile.email}</p>
                      </div>
                          <div className="space-y-4">
                          <div className="pt-4 text-center">
                          </div>
                          </div>
                  </CardContent>
                </Card>
            </section>      
      </div> 
                                {/* Upcoming task and Acheivement */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section/column1 task */}
          <section className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Card className="bg-pink-100 border-4 border-pink-300 shadow-lg hover:bg-pink-200 transition-all">
                 <CardHeader>
                  <CardTitle className="flex items-center gap-2"> Upcoming Tasks
                  </CardTitle>
                 </CardHeader>
                
                 <CardContent>
                    {/* 📌 Upcoming Tasks, Feedback & Progress (Originally Section 2) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      {/* 📝 Upcoming Tasks */}
                       {upcomingTasks.length > 0 ? (
                        <ul className="mt-2 space-y-1 text-left">
                          {upcomingTasks.map(task => (
                            <li key={task.id}>
                              📌 {task.title} — due {new Date(task.dueDate).toLocaleDateString()}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm mt-2 text-gray-600">🎉 No pending tasks</p>
                      )}
                      </div>
                  </CardContent>
              </Card>

                  {/* 🏆 Recent Feedback */}
              <Card className="p-2 bg-orange-200 rounded-2xl shadow-lg hover:bg-orange-300 transition-all">
                    <div className="absolute top-0 h-1 w-full bg-secondary" />
                    <CardHeader className="pb-1">
                    
                      <CardTitle > Recent Feedback </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold">5</div>
                        <Award className="h-8 w-8 text-secondary/60" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">2 new badges earned</p>
                    </CardContent>
              </Card>

                  {/* 📊 Overall Progress */}
              <Card className="p-2 bg-blue-200 rounded-2xl shadow-lg hover:bg-blue-300 transition-all">
                    <div className="absolute top-0 h-1 w-full bg-accent" />
                    <CardHeader className="pb-1">
                      <CardTitle> Overall Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm">
                          <span>Grade Level Progress</span>
                          <span className="font-medium">75%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    </CardContent>
              </Card>
        </section>
        
      
        {/* Achievements Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Card  className="bg-green-100 border-4 border-green-300 shadow-lg hover:bg-green-200 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles  className="h-10 w-10 text-primary" />
                <span>Kindness Achievements</span>
              </CardTitle>

            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-muted/40 bg-green-200 hover:bg-green-400 transition-all cursor-pointer shadow-md"
                  >
                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-background">
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 text-center">
                  {/* <a href="/achievements" className="text-sm text-primary hover:underline">
                    View all achievements →
                  </a> */}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>      
      </div>

    </>
  );  
}; 

export default Dashboard;