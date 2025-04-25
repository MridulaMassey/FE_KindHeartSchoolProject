import React from 'react';
import { Award, HandHeart, BookOpen, Calendar, Clock, File, Upload, Sparkles, User, Users, ChartBar, MessageSquare, Book, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useNavigate } from "react-router-dom"; 
import { useStudentActivities } from "@/hooks/useStudentActivities";

// Sample data for Student dashboard
const studentActivities = [
  {
    id: 1,
    title: "Activities",
    subject: "Mathematics",
    dueDate: "2023-10-15",
    status: "Pending",
    url: "/activities" // Add navigation link here
  },
  {
    id: 2,
    title: "Challenges",
    subject: "Science",
    dueDate: "2023-10-18",
    status: "Submitted",
    url: "/challenges" // Add navigation link here
  },
  {
    id: 3,
    title: "Kindness Quest",
    subject: "Science",
    dueDate: "2023-10-18",
    status: "Submitted",
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

// // Sample data for Teacher dashboard
// const teacherAssignments = [
//   {
//     id: 1,
//     title: "Weekly Math Quiz",
//     class: "Grade 5A",
//     dueDate: "2023-10-17",
//     status: "Published",
//     submissions: 14,
//     totalStudents: 22
//   },
//   {
//     id: 2,
//     title: "Science Project: Ecosystems",
//     class: "Grade 5B",
//     dueDate: "2023-10-25",
//     status: "Draft",
//     submissions: 0,
//     totalStudents: 24
//   },
//   {
//     id: 3,
//     title: "Grammar Test: Past Tense",
//     class: "Grade 5A",
//     dueDate: "2023-10-18",
//     status: "Published",
//     submissions: 8,
//     totalStudents: 22
//   }
// ];

// const recentMessages = [
//   {
//     id: 1,
//     from: "Jane Smith (Parent)",
//     subject: "Homework Clarification",
//     time: "Today, 2:45 PM",
//     read: false
//   },
//   {
//     id: 2,
//     from: "Principal Johnson",
//     subject: "Staff Meeting Reminder",
//     time: "Yesterday, 9:30 AM",
//     read: true
//   }
// ];

const { activities, getUpcomingActivities } = useStudentActivities();
const upcoming = getUpcomingActivities();
const Dashboard = ({ userType = "student", userName = "User" }) => {
  return (
    <div 
    className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
  >
    
      <Header isLoggedIn={true} userType={userType} userName={userName} />  
      
      <main className="flex-1 py-10"> 
      <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">

            {/* Student Profile Section */} 
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
             <section className="animate-fade-in">
              <div >
              
              </div> 
            </section> 
          </div> */}

            {/* Stats Section - Role-specific */}
            {userType === "student" ? (
              <StudentDashboard 
               activities={studentActivities} 
               achievements={studentAchievements} 
              />
            ) : (
              <TeacherDashboard 
                assignments={teacherAssignments} 
                messages={recentMessages} 
              />
            )}
          </div>
        </div>
      </main>

        <Footer />
    </div>
  );
};

// Student Dashboard Component
const StudentDashboard = ({ activities, achievements }) => {
  const navigate = useNavigate(); // React Router navigation
  return (
    <>
      {/* Stats Section */}
          {/********************************Start of Profile********************************************/}
      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
       
        {/* Student Profile*/}
        <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Card  className="bg-blue-100 border-4 border-blue-300 shadow-lg hover:bg-blue-200 transition-all">
            
            <CardHeader className="flex flex-col items-center">
      {/* 🖼️ Avatar Image */}
      <img 
        src="avatar.jpg" 
        alt="Student Avatar" 
        className="w-20 h-20 rounded-full border-2 border-blue-700 shadow-md"
      />     <CardTitle className="flex items-center gap-2">
              </CardTitle>
             </CardHeader>
             <CardContent className="flex flex-col items-center">
            <h2 className="text-xl font-bold text-blue-800">Hi! Student Name</h2>
            <p className="text-gray-600">Yeaer 5</p>
            <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-green-600">🌟 Points: 1200</p>
            <p className="text-lg font-semibold text-purple-600">🏅 Badges: 5</p>
            <p className="text-lg font-semibold text-red-500">💖 Kindness Score: 90%</p>
          </div>
              <div className="space-y-4">
                          
              <div className="pt-4 text-center">
               
                </div>
              </div>
            </CardContent>
          </Card>
        </section>      
      </div> 
      {/********************************END of PROFILE********************************************/}
      
     {/********************************START of Activities and Acheivements*********************/}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/*************/}

      <section className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
  <Card className="bg-pink-100 border-4 border-pink-300 shadow-lg hover:bg-pink-200 transition-all">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {/* <HandHeart className="h-10 w-10 text-primary" />
        <span>Learn Kindness</span> */}
      </CardTitle>
    </CardHeader>
    <CardContent>
          
      <div className="space-y-4">

        {/* 📌 Upcoming Tasks, Feedback & Progress (Originally Section 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          
          {/* 📝 Upcoming Tasks */}
          <Card className="p-2 bg-green-200 rounded-2xl shadow-lg hover:bg-green-300 transition-all">
            <div className="absolute top-0 h-1 w-full bg-primary" />
            <CardHeader className="pb-1">
              <h3 className="text-lg font-bold mb-1">Upcoming Tasks</h3>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-blue-700">
                <li>🔬 Science Worksheet </li>
                <li>💙 Help a classmate</li>
              </ul>
            </CardContent>
          </Card>

          {/* 🏆 Recent Feedback */}
          <Card className="p-2 bg-orange-200 rounded-2xl shadow-lg hover:bg-orange-300 transition-all">
            <div className="absolute top-0 h-1 w-full bg-secondary" />
            <CardHeader className="pb-1">
            
              <CardTitle >
                <h3 className="text-lg font-bold mb-1">Recent Feedback</h3>
                </CardTitle>
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
              <CardTitle>
              <h3 className="text-lg font-bold mb-1">Overall Progress</h3>
              </CardTitle>
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

        </div> {/* End of Grid Section */}

      </div>
    </CardContent>
  </Card>
</section>



      {/*************/}
      

        {/* Achievements Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Card  className="bg-green-100 border-4 border-green-300 shadow-lg hover:bg-green-200 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles  className="h-10 w-10 text-primary" />
                <span>Kindness Achievements</span>
              </CardTitle>
              {/* <CardDescription>
                Badges and certificates you've earned
              </CardDescription> */}
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
      {/*******************************END of Activity and Acheivements*********************************************/}

      {/* Quick Actions */}
      <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <Card className="card-hover">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">View Activities</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">Submit Work</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">Achievements</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">Calendar</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <User className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">Profile</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );  
}; 

// Teacher Dashboard Component
const TeacherDashboard = ({ assignments, messages }) => {
  return (
    <>
      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <Card className="overflow-hidden">
          <div className="absolute top-0 h-1 w-full bg-primary" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">12</div>
              <Book className="h-8 w-8 text-primary/40" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">3 need grading</p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="absolute top-0 h-1 w-full bg-secondary" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">68</div>
              <Users className="h-8 w-8 text-secondary/60" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across 3 classes</p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="absolute top-0 h-1 w-full bg-accent" />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span>Assignment Completion</span>
                <span className="font-medium">82%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Assignments Section */}
        <section className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                <span>Current Assignments</span>
              </CardTitle>
              <CardDescription>
                Track and manage your class assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div 
                    key={assignment.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-muted/40"
                  >
                    <div className="flex flex-col">
                      <h3 className="font-medium">{assignment.title}</h3>
                      <p className="text-sm text-muted-foreground">{assignment.class}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className={`flex items-center gap-1 text-sm px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        assignment.status === 'Published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        <span>{assignment.status}</span>
                      </div>
                      {assignment.status === 'Published' && (
                        <div className="text-xs text-muted-foreground">
                          {assignment.submissions}/{assignment.totalStudents} submitted
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 text-center">
                  <a href="/assignments" className="text-sm text-primary hover:underline">
                    Manage all assignments →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        Messages Section
        <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Messages</span>
              </CardTitle>
              <CardDescription>
                Recent messages from parents and staff
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start gap-3 p-4 rounded-lg border bg-muted/40"
                  >
                    <div className="h-8 w-8 flex-shrink-0 mt-1 flex items-center justify-center rounded-full bg-background">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{message.from}</h3>
                        {!message.read && (
                          <span className="bg-primary w-2 h-2 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm">{message.subject}</p>
                      <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 text-center">
                  <a href="/messages" className="text-sm text-primary hover:underline">
                    View all messages →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Class Performance */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBar className="h-5 w-5 text-primary" />
                <span>Class Performance</span>
              </CardTitle>
              <CardDescription>
                Average scores by subject
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span>Mathematics</span>
                    <span className="font-medium">86%</span>
                  </div>
                  <Progress value={86} className="h-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span>Science</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span>English</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                
                <div className="pt-4 text-center">
                  <a href="/analytics" className="text-sm text-primary hover:underline">
                    View detailed analytics →
                  </a>
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