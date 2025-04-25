
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Bell, X } from 'lucide-react';
import { format, parseISO,parse  } from 'date-fns';

interface Notification {
  activityActivityName: string;
  activityDueDate: string;
}

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/');
  };
  const [active, setActive] = useState(location.pathname);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [role, setRole] = useState("");
  const popupRef = useRef(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole || "");
    
    // Fetch notifications when component mounts
    const fetchNotifications = async () => {
      try {
        const username = localStorage.getItem('username');
        if (!username) return;

        // First, get the student ID
        const studentRes = await fetch(`https://localhost:44361/api/Student/get-student-id/${username}`);
        if (!studentRes.ok) {
          throw new Error("Failed to fetch student ID");
        }
        const studentData = await studentRes.json();
        
        // Then fetch notifications using the student ID
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
        
        // Filter notifications for future dates only
        // const today = new Date();
        // const futureNotifications = notificationsData.filter((notification: Notification) => {
        //   const dueDate = parseISO(notification.activityDueDate.replace(/\s(am|pm)$/i, ''));
        //   return dueDate > today;
        // });
        const today = new Date();
const futureNotifications = notificationsData.filter((notification: Notification) => {
  const dueDate = parse(
    notification.activityDueDate,
    'dd/MM/yyyy hh:mm:ss a',
    new Date()
  );
  return dueDate > today;
});
       // console.log(notificationsData);
       console.log(futureNotifications);
        const formattedNotifications = futureNotifications.map((item, index) => ({
          id: index + 1,
         
          activityActivityName: item.activityActivityName,
          activityDueDate: item.activityDueDate
        }));
      // const notifications=testnotifications;
        console.log("This"+formattedNotifications);
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



  // Handle clicking outside the popup to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
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
      
      {/* Left: Logo */}
      <div className="flex items-center">
        <img 
          src="KH_logo3.png" 
          alt="Logo"
          className="h-16 w-auto object-contain"
        />
      </div>

      {/* Center: Navigation Links */}
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
        //  item.newTab ? (
          item.newTab ? (
            <a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center cursor-pointer p-2 rounded-lg transition-all text-white hover:bg-[#b90020]"
            >
              <div className="text-2xl">{item.icon}</div>
              <p className="text-sm font-semibold">{item.name}</p>
            </a>
          ) : (
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
          )
        ))}
      </div>

      {/* Right: Notification & Logout */}
      <div className="flex items-center space-x-4 relative">
        {/* Notification Icon */}
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="p-2 rounded-lg hover:bg-red-600 transition-all relative"
        >
          <Bell className="h-6 w-6 text-white" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-yellow-400 text-black text-xs rounded-full px-2">
              {notifications.length}
            </span>
          )}
        </button>

        {/* Notification Popup */}
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
                  <li key={index} className="p-2 border-b last:border-none">
                    <strong>Name:</strong> {notification.activityActivityName}
                    <p className="text-xs text-gray-500">
                      Due: {notification.activityDueDate}
                    </p>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No new notifications</p>
              )}
            </ul>
          </div>
        )}

        {/* Logout Button */}
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

export default Navbar