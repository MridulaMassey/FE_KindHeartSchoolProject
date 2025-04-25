import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { LogOut, Bell, X } from 'lucide-react'; // Importing icons

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove username from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    // Remove role from localStorage
    localStorage.removeItem('role');
    // Redirect to login page
    navigate('/');
	  };
  const [active, setActive] = useState(location.pathname);
  const [showNotifications, setShowNotifications] = useState(false);
  const popupRef = useRef(null);

  const [role, setRole] = useState("");

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole || "");
  }, []);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  // Dummy notifications (You can fetch real data from an API or Firebase later)
  const notifications = [
    { id: 1, sender: "Teacher", message: "New assignment posted!", time: "2 min ago" },
    { id: 2, sender: "Student", message: "I submitted my work.", time: "10 min ago" },
    { id: 3, sender: "Teacher", message: "Reminder: Quiz on Friday!", time: "30 min ago" }
  ];

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
                notifications.map((notification) => (
                  <li key={notification.id} className="p-2 border-b last:border-none">
                    <strong>{notification.sender}:</strong> {notification.message}
                    <p className="text-xs text-gray-500">{notification.time}</p>
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
      // onClick={() => {
      //  // localStorage.clear(); // 🧹 Clear all stored data (or use removeItem if you want to be specific)
      //   window.location.href = "/"; // ✅ Redirect to login/home page
      // }}
      onClick={handleLogout}
      className="p-2 rounded-lg hover:bg-red-600 transition-all"
    >
      <LogOut className="h-6 w-6 text-white" />
    </button>
        {/* <button 
          onClick={() => alert("Logging out...")} 
          className="p-2 rounded-lg hover:bg-red-600 transition-all"
        >
          <LogOut className="h-6 w-6 text-white" />
        </button> */}
      </div>

    </nav>
  );
};

export default Navbar;
