
import React from 'react';
import { Award, Heart, Calendar, Clock, File, Upload, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const studentActivities = [
  {
    id: 1,
    title: "Math Worksheet: Fractions",
    subject: "Mathematics",
    dueDate: "2023-10-15",
    status: "Pending"
  },
  {
    id: 2,
    title: "Reading Comprehension: The Solar System",
    subject: "Science",
    dueDate: "2023-10-18",
    status: "Submitted"
  },
  {
    id: 3,
    title: "Grammar Exercise: Verbs and Adverbs",
    subject: "English",
    dueDate: "2023-10-20",
    status: "Pending"
  }
];

const achievements = [
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

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={true} userType="student" userName="praftest" />
      
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            {/* Welcome Section */}
            <section className="animate-fade-in">
              <div className="glass-panel rounded-2xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tighter">
                      ACTIVITIES!
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Here's what's happening with your learning journey
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Card className="overflow-hidden">
                <div className="absolute top-0 h-1 w-full bg-primary" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">7</div>
                    <Heart className="h-8 w-8 text-primary/40" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">3 pending activities</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="absolute top-0 h-1 w-full bg-secondary" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">5</div>
                    <Award className="h-8 w-8 text-secondary/60" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">2 new badges earned</p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="absolute top-0 h-1 w-full bg-accent" />
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
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
            
            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Activities Section */}
              <section className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary" />
                      <span>Recent Activities</span>
                    </CardTitle>
                    <CardDescription>
                      Your assigned activities and their due dates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {studentActivities.map((activity) => (
                        <div 
                          key={activity.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-muted/40"
                        >
                          <div className="flex flex-col">
                            <h3 className="font-medium">{activity.title}</h3>
                            <p className="text-sm text-muted-foreground">{activity.subject}</p>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>Due: {new Date(activity.dueDate).toLocaleDateString()}</span>
                            </div>
                            <div className={`flex items-center gap-1 text-sm px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              activity.status === 'Submitted' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {activity.status === 'Submitted' ? (
                                <File className="h-3 w-3" />
                              ) : (
                                <Clock className="h-3 w-3" />
                              )}
                              <span>{activity.status}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4 text-center">
                        <a href="/Activities" className="text-sm text-primary hover:underline">
                          View all activities →
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
              
              {/* Achievements Section */}
              <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <span>Achievements</span>
                    </CardTitle>
                    <CardDescription>
                      Badges and certificates you've earned
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="flex items-center gap-4 p-4 rounded-lg border bg-muted/40"
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
                        <a href="/achievements" className="text-sm text-primary hover:underline">
                          View all achievements →
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
            
            {/* Quick Actions */}
            <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                <Card className="card-hover">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Heart className="h-5 w-5 text-primary" />
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
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
