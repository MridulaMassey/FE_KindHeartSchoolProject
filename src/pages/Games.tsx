import React, { useState } from "react";
import { X, Gamepad2, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const games = [
  {
    id: "key-quest",
    title: "Key Quest",
    icon: "🔑",
    description: "Solve puzzles and unlock doors!",
    iframeSrc: "https://www.jopi.com/gam/key-quest/"
  },

  {
    id: "way-to-home",
    title: "Way to Home",
    icon: "🏡",
    description: "Help the lost character find their way!",
    iframeSrc: "https://www.jopi.com/gam/way-to-home/"
  },

  {
    id: "math-challenge",
    title: "Pixel Mini Golf",
    icon: "➕",
    description: "Test your math skills in a fun way!",
    iframeSrc: "https://www.jopi.com/gam/pixel-mini-golf/"
  },

  {
    id: "math-challenge",
    title: "Pixel Mini Golf",
    icon: "➕",
    description: "Test your math skills in a fun way!",
    iframeSrc: "https://www.jopi.com/gam/pixel-mini-golf/"
  },

  {
    id: "math-challenge",
    title: "Pixel Mini Golf",
    icon: "➕",
    description: "Test your math skills in a fun way!",
    iframeSrc: "https://www.jopi.com/gam/pixel-mini-golf/"
  },

  {
    id: "math-challenge",
    title: "Pixel Mini Golf",
    icon: "➕",
    description: "Test your math skills in a fun way!",
    iframeSrc: "https://www.jopi.com/gam/pixel-mini-golf/"
  }

  ];

const GamesPage = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-yellow-200 via-green-200 to-blue-300">
      <Header isLoggedIn={true} userType="student" userName="GameMaster" />

      {/* 🎮 Game Selection Header */}
      <section className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 drop-shadow-lg">
          🎲 Play & Learn – The Kindness Game Zone!
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Choose a game and start playing! Earn points and have fun.
        </p>
      </section>
     
      {/* 🎮 Game Cards Section */}
      <main className="container px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card 
              key={game.id}
              className="cursor-pointer hover:scale-105 transition-all bg-white shadow-xl border-4 border-yellow-300 rounded-xl p-6 text-center hover:border-blue-400"
              onClick={() => setSelectedGame(game)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-purple-700">
                  {game.icon} {game.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{game.description}</p>
                <div className="mt-4 text-lg animate-bounce text-green-600">🎮 Click to Play</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* 🎮 Game Popup Modal */}
      {selectedGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-[90%] max-w-4xl relative border-4 border-blue-400">
            <button 
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-700"
              onClick={() => setSelectedGame(null)}
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">{selectedGame.title}</h2>
            <iframe 
              src={selectedGame.iframeSrc} 
              frameBorder="0" 
              scrolling="no" 
              className="w-full h-[500px] rounded-md shadow-lg"
            ></iframe>
          </div>
        </div>
      )}
    
    </div>
  );
};

export default GamesPage;
