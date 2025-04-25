import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation(); // Get current page path
  const [active, setActive] = useState(location.pathname); // Set initial active tab

  useEffect(() => {
    setActive(location.pathname); // Update active tab on route change
  }, [location.pathname]); // Runs whenever the path changes

  const navItems = [
    { name: "Home", icon: "🏠", link: "/dashboard" },
    { name: "Lessons", icon: "📖", link: "/Resources" },
    { name: "Activities", icon: "🎨", link: "/Activities" },
    { name: "Games", icon: "🎮", link: "/Games", newTab: true }, // Open in a new tab
    { name: "Rewards", icon: "🏆", link: "/rewards" }
  ];

  return (
    <nav className="relative flex justify-center items-center bg-white p-4 rounded-full shadow-md mb-6">
      {/* Logo at the left corner */}
      <div className="absolute left-10 flex items-center">
        <img src="logo_KH.png" alt="Logo" className="h-14 w-auto" />
      </div>
      
      {/* Navigation Items Centered */}
      <div className="flex space-x-4">
        {navItems.map((item) => (
          item.newTab ? (
            // Games opens in a new tab
            <a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center cursor-pointer p-2 rounded-lg transition-all text-gray-700 hover:bg-gray-200"
            >
              <div>{item.icon}</div>
              <p className="text-sm font-semibold">{item.name}</p>
            </a>
          ) : (
            // Normal internal navigation
            <Link
              key={item.name}
              to={item.link}
              className={`flex flex-col items-center cursor-pointer p-2 rounded-lg transition-all ${
                active === item.link
                  ? "bg-gradient-to-r from-orange-400 to-yellow-300 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <div>{item.icon}</div>
              <p className="text-sm font-semibold">{item.name}</p>
            </Link>
          )
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
