// components/KindnessTips.tsx
import React, { useState } from "react";

interface Tip {
  id: number;
  title: string;
  icon: string;
  gifUrl: string;
}

const tips: Tip[] = [
  { id: 1, title: "Feed a hungry pet", icon: "🐶", gifUrl: "/gifs/feed-dog.gif" },
  { id: 2, title: "Help a friend carry books", icon: "📚", gifUrl: "/gifs/help-books.gif" },
  { id: 3, title: "Say thank you", icon: "🙏", gifUrl: "/gifs/thank-you.gif" },
  { id: 4, title: "Recycle", icon: "♻️", gifUrl: "/gifs/recycle.gif" },
  { id: 5, title: "Share your snack", icon: "🍎", gifUrl: "/gifs/share-snack.gif" },
  { id: 6, title: "Cheer someone up", icon: "🤗", gifUrl: "/gifs/cheer-up.gif" },
  { id: 7, title: "Hold the door open", icon: "🚪", gifUrl: "/gifs/hold-door.gif" },
];

const KindnessTips: React.FC = () => {
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);

  return (
    <div className="p-6 bg-pink-50 rounded-xl shadow-lg">
      {/* <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">💡 Kindness Tips</h2> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {tips.map((tip) => (
          <button
            key={tip.id}
            className="bg-white border-2 border-yellow-300 hover:shadow-lg rounded-lg p-4 text-center transition"
            onClick={() => setSelectedTip(tip)}
          >
            <div className="text-4xl">{tip.icon}</div>
            <p className="text-sm mt-2 font-medium text-gray-700">{tip.title}</p>
          </button>
        ))}
      </div>

      {/* Preview modal */}
      {selectedTip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
              onClick={() => setSelectedTip(null)}
            >
              ✖
            </button>
            <h3 className="text-lg font-bold text-center text-pink-600 mb-2">
              {selectedTip.title}
            </h3>
            <img
              src={selectedTip.gifUrl}
              alt={selectedTip.title}
              className="w-full rounded shadow"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default KindnessTips;
