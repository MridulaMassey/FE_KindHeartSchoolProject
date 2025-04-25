import React, { useEffect, useState } from "react";
import { Sparkles, BadgeCheck } from "lucide-react";
import { getStudentId } from "@/utils/storage";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Certificate {
  id: string;
  title: string;
  description: string;
  certificateUrl: string;
  dateIssued: string;
}

const Rewards = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [starCount, setStarCount] = useState<number>(0); // You can link this to your backend later
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const studentId = getStudentId();

  useEffect(() => {
    const fetchCertificates = async () => {
      if (!studentId) return;

      try {
        const res = await fetch(`https://localhost:44361/api/Certificate/student/${studentId}`);
        const data = await res.json();
        setCertificates(data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    fetchCertificates();
  }, [studentId]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-100 via-pink-100 to-purple-200">
      <Header isLoggedIn={true} userType="student" userName="StudentHero" />

      {/* 🌟 Reward Header */}
      <section className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 drop-shadow-md">
          🌟 Your Achievements & Rewards
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Great job! Keep learning and earning stars and certificates.
        </p>
      </section>

      {/* ⭐ Star Counter */}
      <div className="text-center text-2xl text-yellow-600 font-semibold mb-6">
        <Sparkles className="inline-block mr-2 animate-pulse" />
        You’ve earned <span className="text-3xl font-bold text-yellow-500">{starCount}</span> Stars!
      </div>

      {/* 🎓 Certificates */}
      <main className="container px-4 md:px-6 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <Card
              key={cert.id}
              className="bg-white border-4 border-yellow-200 shadow-xl hover:border-purple-400 transition-all rounded-xl p-4"
            >
              <CardHeader className="flex flex-col items-center">
                <div className="text-4xl mb-2">
                  <BadgeCheck className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-center text-lg text-purple-700">{cert.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">{cert.description}</p>
                {/* <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  🎓 View Certificate
                </a> */}
                <button
                  onClick={() => setPreviewUrl(cert.certificateUrl)} // 👈 from API
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  🎓 View Certificate
                </button>
              </CardContent>
            </Card>
          ))}          
        </div>
       </main>
  
                {previewUrl && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white w-[90%] max-w-3xl rounded-lg p-4 relative">
                <button
                  onClick={() => setPreviewUrl(null)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl"
                >
                  ✖
                </button>
                <iframe
                  src={previewUrl}
                  width="100%"
                  height="600px"
                  className="rounded shadow"
                  allow="autoplay"
                ></iframe>
              </div>
            </div>
          )}

  
    </div>
  );
};

export default Rewards;
