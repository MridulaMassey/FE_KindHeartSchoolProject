import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Bell, X } from 'lucide-react';
import { format, parse } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";

interface Notification {
  activityId: string;
  studentId: string;
  activityActivityName: string;
  activityDueDate: string;
  isProcessed?: boolean;
  classGroupSubjectClassGroupSubjectId:string;
  classGroupSubjectStudentActivityId:string;

}

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [active, setActive] = useState(location.pathname);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [role, setRole] = useState("");
  const popupRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/');
  };

  const handleNotificationClick = async (activityId: string, studentId: string,classGroupSubjectClassGroupSubjectId:string,classGroupSubjectStudentActivityId:string) => {
    try {
      const response = await fetch('https://localhost:44361/api/classgroupsubjectstudentactivities/updateisprocessed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityId,
          studentId,
          classGroupSubjectClassGroupSubjectId,
          classGroupSubjectStudentActivityId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update notification status');
      }

      
      // Remove the clicked notification from the list
      setNotifications(prevNotifications => 
        prevNotifications.filter(notif => notif.activityId !== activityId)
      );

      toast({
        title: "Notification marked as read",
        duration: 3000,
      });

    } catch (error) {
      console.error('Error updating notification:', error);
      toast({
        title: "Failed to update notification",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole || "");
    
    const fetchNotifications = async () => {
      try {
        const username = localStorage.getItem('username');
        if (!username) return;

        const studentRes = await fetch(`https://localhost:44361/api/Student/get-student-id/${username}`);
        if (!studentRes.ok) {
          throw new Error("Failed to fetch student ID");
        }
        const studentData = await studentRes.json();
        
        const notifications = await fetch('https://localhost:44361/api/classgroupsubjectstudentactivities/activitynotifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            activityId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            studentId: studentData.studentId
          })
        });

        if (!notifications.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const notificationsData = await notifications.json();
       // console.log(notificationsData);
        const today = new Date();
        const futureNotifications = notificationsData.filter((notification: Notification) => {
          const dueDate = parse(
            notification.activityDueDate,
            'dd/MM/yyyy hh:mm:ss a',
            new Date()
          );
          return dueDate > today;
        });

        const formattedNotifications = futureNotifications.map((item: any) => ({
          activityId: item.activityId || "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          studentId: studentData.studentId,
          activityActivityName: item.activityActivityName,
          activityDueDate: item.activityDueDate,
          isProcessed: false,
  classGroupSubjectClassGroupSubjectId:item.classGroupSubjectClassGroupSubjectId,
  classGroupSubjectStudentActivityId:item.classGroupSubjectStudentActivityId
        }));
   console.log(formattedNotifications);
        setNotifications(formattedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full bg-[#de0029] p-4 shadow-md flex items-center justify-between relative">
      <div className="flex items-center">
        <img 
          src="KH_logo3.png" 
          alt="Logo"
          className="h-16 w-auto object-contain"
        />
      </div>

      <div className="flex space-x-10">
        {[
          { name: "Home", icon: "🏠", 
            link: role === "Teacher" ? "/TeacherDashboard" : "/StudentDashboard",
          },
          { name: "Resources", icon: "📖", link: "/Resources" },
          { name: "Activities", icon: "🎨", link: "/StudentActivities" },
          { name: "Games", icon: "🎮", link: "/Games"},
          { name: "Rewards", icon: "🏆", link: "/rewards" }
        ].map((item) => (
          <Link
            key={item.name}
            to={item.link}
            className={`flex flex-col items-center cursor-pointer p-2 rounded-lg transition-all ${
              active === item.link
                ? "bg-gradient-to-r from-yellow-400 to-orange-300 text-white"
                : "text-white hover:bg-[#b90020]"
            }`}
          >
            <div className="text-2xl">{item.icon}</div>
            <p className="text-sm font-semibold">{item.name}</p>
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-4 relative">
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2 rounded-lg hover:bg-red-600 transition-all relative"
        >
          <Bell className="h-6 w-6 text-white" />
          {notifications.filter(n => !n.isProcessed).length > 0 && (
            <span className="absolute top-0 right-0 bg-yellow-400 text-black text-xs rounded-full px-2">
              {notifications.filter(n => !n.isProcessed).length}
            </span>
          )}
        </button>

        {showNotifications && (
          <div ref={popupRef} className="absolute top-12 right-0 w-72 bg-white shadow-lg rounded-lg p-4 z-50">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-md font-bold text-red-600">Notifications</h3>
              <button onClick={() => setShowNotifications(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <ul className="mt-2 max-h-48 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <li 
                    key={index} 
                    className={`p-2 border-b last:border-none cursor-pointer transition-colors ${
                      notification.isProcessed ? 'bg-gray-50' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => !notification.isProcessed && handleNotificationClick(notification.activityId, notification.studentId,notification.classGroupSubjectClassGroupSubjectId,notification.classGroupSubjectStudentActivityId)}
                  >
                    <strong>Name:</strong> {notification.activityActivityName}
                    <p className="text-xs text-gray-500">
                      Due: {notification.activityDueDate}
                    </p>
                    {notification.isProcessed && (
                      <span className="text-xs text-green-500">Read</span>
                    )}
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No new notifications</p>
              )}
            </ul>
          </div>
        )}

        <button 
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-red-600 transition-all"
        >
          <LogOut className="h-6 w-6 text-white" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
