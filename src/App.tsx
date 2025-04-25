
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/auth/LoginForm";
import NotFound from "./pages/NotFound";
import StudentActivities from './pages/StudentActivities';
import Resources from './pages/Resources';
import Games from './pages/Games';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import MyClasses from './pages/MyClasses';
import { Activity } from "lucide-react";
import CreateActivity from "./pages/CreateActivityPage";
import ActivitiesPaginated from "./pages/ActiviesPagination";
import StudentAssignmentDetails from "./pages/StudentAssignmentDetails";
import UpcomingTask from "./pages/UpcomingTask";
import AdminDashboard from "./pages/AdminDashboard";
import Rewards from "./pages/Rewards";
import About from "./pages/About";
import ClassGroupSubjectStudentActivity from "./pages/ClassGroupSubjectStudentActivity";
import TeacherStudentAssignment from "./pages/TeacherStudentAssignment";
import ClassGroupSubjectActivity from "./pages/ClassGroupSubjectActivity";
import TeacherAssignmentDetails from "./pages/TeacherAssignmentDetails";
import StudentNotificationTest from "./pages/testalert";
import PrivateRoute from "./pages/PrivateRoute";
import JournalPage from './pages/JournalPage';
//import JournalCalendarPage from './pages/JournalPage';
import JournalCalendarPage from './pages/JournalCalendarPage';
import KindnessPuzzle from './pages/KindnessPuzzle';

const queryClient = new QueryClient();

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <LoginForm />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Navigate to="/" />} />

          {/* Protected Routes */}
          <Route path="/StudentDashboard" element={<PrivateRoute element={<StudentDashboard />} />} />
          <Route path="/TeacherDashboard" element={<PrivateRoute element={<TeacherDashboard />} />} />
          <Route path="/studentactivities" element={<PrivateRoute element={<StudentActivities />} />} />
          <Route path="/resources" element={<PrivateRoute element={<Resources />} />} />
          <Route path="/games" element={<PrivateRoute element={<Games />} />} />
          <Route path="/activities/create" element={<PrivateRoute element={<CreateActivity />} />} />
          <Route path="/activitiespagination" element={<PrivateRoute element={<ActivitiesPaginated />} />} />
          <Route path="/classgroupsubject" element={<PrivateRoute element={<ClassGroupSubjectActivity />} />} />
          <Route path="/myclasses" element={<PrivateRoute element={<MyClasses />} />} />
          <Route path="/about" element={<PrivateRoute element={<About />} />} />
          <Route path="/upcomingtask" element={<PrivateRoute element={<UpcomingTask />} />} />
          <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} />} />
          <Route path="/rewards" element={<PrivateRoute element={<Rewards />} />} />
          <Route path="/teacherstudentassignment/:activityId" element={<PrivateRoute element={<TeacherStudentAssignment />} />} />
          <Route path="/teacherassignmentdetails/:activityId/:studentId" element={<PrivateRoute element={<TeacherAssignmentDetails />} />} />
          <Route path="/classgroupsubjectsactivitytudentview/:activityId" element={<PrivateRoute element={<ClassGroupSubjectStudentActivity />} />} />
          <Route path="/alert" element={<PrivateRoute element={<StudentNotificationTest />} />} />
          <Route path="/studentassignmentdetails/:activityId" element={<PrivateRoute element={<StudentAssignmentDetails />} />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/journal/calendar" element={<JournalCalendarPage />} />
          <Route path="/games/kindnesspuzzle" element={<KindnessPuzzle />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/studentassignmentdetails/:activityId" element={<StudentAssignmentDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

