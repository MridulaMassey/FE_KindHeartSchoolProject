import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import React, { useState } from "react";
import KindnessJournalDashboard from "@/components/KindnessJournalDashboard";
import { useStudentId } from "@/hooks/useStudentId";
import PrintableResources from "@/components/PrintableResource";
import LearnAboutKindness from "@/components/LearnAboutKindness";
import KindnessTips from '@/components/KindnessTips';

const Dashboard: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const { studentId, loading, error } = useStudentId();

  const sections = [
    {
      id: "Learn About Kindness",
      title: "Learn About Kindness",
      icon: "💖",
      description: "A kindness adventure just for you!",
      content: (
        <div>
            <LearnAboutKindness />
        </div>
      )
    },
    {
      id: "kindnessTips",
      title: "Kindness Tips",
      icon: "🌟",
      description: "Simple, everyday ways to be kind",
      content: (
        <div>
          {/* <p className="text-gray-700">Here are easy kindness tips you can use every day to brighten someone's day! A smile, a kind word, or helping someone in need.</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <img src="/images/kindness1.jpg" alt="Kindness Tip 1" className="rounded-lg shadow-md border border-yellow-300" />
            <img src="/images/kindness2.jpg" alt="Kindness Tip 2" className="rounded-lg shadow-md border border-yellow-300" />
          </div> */}
          <KindnessTips />
        </div>
      )
    },
    {
      id: "printableResources",
      title: "Printable Resources",
      icon: "📝",
      description: "Worksheets, coloring pages & journals",
       content: (
        <div>
          <p className="text-gray-700 mb-4">
          Gear up for your kindness quest! 🕵️‍♀️🧠 Print out exciting activities, inspiring journals, creative coloring pages, and more! Each printable is your secret tool to spread joy, show empathy, and become a true Kindness Hero at home, in school, or wherever you go! 🦸‍♂️🌍💖
          </p>
          <PrintableResources />
        </div>
      )
       //(
      //   <div>
      //     <p className="text-gray-700">Download and print worksheets, coloring pages, and journals to reflect on kindness and improve emotional well-being.</p>
      //     <ul className="mt-2 list-disc pl-5 text-red-500">
      //       <li><a href="/pdfs/worksheet1.pdf" target="_blank" rel="noopener noreferrer" className="font-semibold">🖍 Coloring Page 1</a></li>
      //       <li><a href="/pdfs/journal.pdf" target="_blank" rel="noopener noreferrer" className="font-semibold">📖 Kindness Journal</a></li>
      //     </ul>
      //   </div>
      // )
    },
    {
      id: "videosAnimations",
      title: "Videos & Animations",
      icon: "🎬",
      description: "Fun, engaging kindness clips",
      content: (
        <div className="flex flex-col items-center justify-center text-center w-full">
          <iframe
            width="600"
            height="400"
            src="https://www.youtube.com/embed/eRrAVRAHS2o?autoplay=1&loop=1&playlist=eRrAVRAHS2o&rel=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-lg shadow-lg border border-blue-300"
          ></iframe>
        </div>
      )
    },
    {
      id: "kindnessJournal",
      title: "Kindness Journal",
      icon: "📖",
      description: "Your special spot to remember kind things you’ve done!",
      content: loading ? (
        <p>Loading journal...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <KindnessJournalDashboard studentId={studentId!} />
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#FFDEE9] via-[#B5EAD7] to-[#FFCCB6]">
      <Header isLoggedIn={true} userType="student" userName="praftest" />

      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">

            {/* HEADER Kindness Corner */}
            <section className="animate-fade-in">
              <div className="glass-panel relative rounded-2xl p-6 md:p-8 w-full h-28 bg-white shadow-md border border-pink-300">
                <img
                  src="heart_sticker.gif"
                  alt="Sticker"
                  className="absolute top-0 right-10 h-16 w-auto md:h-32"
                />
                <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-center text-red-600">
                  Kindness Corner
                </h1>
              </div>
            </section>

            {/* Sections Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 animate-fade-in w-full">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="cursor-pointer overflow-hidden rounded-xl p-4 shadow-lg transition-all duration-300 bg-yellow-100 hover:bg-red-300 border border-yellow-400"
                  onClick={() => setSelectedSection(section.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">{section.icon}</div>
                  </div>
                  <h3 className="text-sm font-bold text-red-600 mt-2">
                    {section.title}
                  </h3>
                  <p className="text-xs text-gray-700 mt-1">{section.description}</p>
                </div>
              ))}
            </section>

            {/* Content Display Box */}
            <div className="w-full bg-white p-6 rounded-xl shadow-md border border-red-300">
              {selectedSection ? (
                <div>
                  <h2 className="text-2xl font-bold text-red-700">
                    {sections.find((s) => s.id === selectedSection).title}
                  </h2>
                  <div className="mt-2 text-gray-700">
                    {sections.find((s) => s.id === selectedSection).content}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center">Click a section to view details</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
