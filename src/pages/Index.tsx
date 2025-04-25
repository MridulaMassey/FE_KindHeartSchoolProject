import React, { useState, useRef } from "react";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";

const Index: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [userlogin, setuserlogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLogin = async () => {
    console.log("🔐 Login button clicked");
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://localhost:44361/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userlogin,
          password: password,
          rememberMe: true,
        }),
      });

      const data = await response.json();
      console.log("✅ Login response data:", data);

      // Check for API success
      if (!response.ok || data.message !== "Login successful") {
        console.error("❌ Login failed:", data.message);
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Store data in localStorage
      localStorage.setItem("username", userlogin); //  Use the value from input
      localStorage.setItem("role", data.rolename); //value from API
      localStorage.setItem('authToken', data.token);
      console.log("💾 Stored userName in localStorage:", data.userName); 

      // Redirect
      if (data.rolename === "Student") {
        window.location.href = "/StudentDashboard";
      } else if (data.rolename === "Teacher") {
        window.location.href = "/TeacherDashboard";
      } else {
        window.location.href = "/admin-dashboard";
      }

    } catch (err) {
      console.error("🔥 Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-cover bg-center h-[250px] flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-red-500 to-orange-400 opacity-80 z-[-1] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-24 h-24 md:w-52 md:h-52">
            <img src="rainbow_kids.gif" alt="Animated Learning" className="w-full h-full object-contain opacity-100" />
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 md:w-52 md:h-60">
            <img src="pencil_kids.gif" alt="Animated Learning" className="w-full h-full object-contain opacity-100" />
          </div>
          <div className="container px-4 md:px-6 py-10">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white drop-shadow-lg">
              <span className="text-red-600">Kind Hearts</span> Learning Application
            </h1>
            <div className="mt-6">
              <Button
                size="lg"
                className="rounded-full px-10 py-3 bg-red-500 hover:bg-red-700 text-red-100 text-lg shadow-lg transition-transform transform hover:scale-105"
                onClick={() => setShowLogin(true)}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-10 bg-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-red-700">
              Why Learn with Us?
            </h2>
            <div className="mt-6 flex flex-col items-center">
              <video
                ref={videoRef}
                src="welcome_video.mp4"
                className="w-[600px] h-auto rounded-lg shadow-lg"
                autoPlay
              />
              <button
                onClick={togglePlayPause}
                className="mt-4 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-red-900 font-bold rounded-lg"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {[
                { icon: "📖", title: "Comprehensive Curriculum", description: "Covering Maths, English, Science & more." },
                { icon: "🏆", title: "Fun Rewards & Badges", description: "Earn points and badges as you complete lessons." },
                { icon: "🎨", title: "Interactive Activities", description: "Worksheets, games, quizzes & more!" }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-red-100 border border-red-300 rounded-xl p-6 shadow-md hover:scale-105 transition-all text-center"
                >
                  <div className="text-5xl">{feature.icon}</div>
                  <h3 className="text-xl font-bold mt-2 text-red-700">{feature.title}</h3>
                  <p className="text-gray-700 mt-1">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-5 bg-red-600">
          <div className="container px-4 md:px-6 text-center text-white">
            <h2 className="text-3xl font-bold">Ready to Start Learning?</h2>
            <p className="mt-2">Join thousands of students already improving their skills with Kind Heart Learning!</p>
            <Button
              size="lg"
              className="mt-6 px-8 bg-yellow-400 hover:bg-yellow-500 text-red-900"
              onClick={() => setShowLogin(true)}
            >
              Let's Go <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Login Popup */}
        {showLogin && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
              <button onClick={() => setShowLogin(false)} className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full">
                <X className="h-5 w-5 text-gray-600" />
              </button>
              <h2 className="text-2xl font-bold text-center text-red-600">Login</h2>
              <p className="text-sm text-gray-500 text-center mb-4">Enter your details to continue</p>
              <input
                type="text"
                placeholder="User Name"
                value={userlogin}
                onChange={(e) => setuserlogin(e.target.value)}
                className="w-full border rounded-md p-2 mb-3"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md p-2 mb-3"
              />
              {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
              <button
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-all disabled:opacity-50"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
