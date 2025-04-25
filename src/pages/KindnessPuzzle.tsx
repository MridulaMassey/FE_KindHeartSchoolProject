import React, { useState } from 'react';

const kindnessWords = [
  { id: 1, word: "Help", matchId: 101 },
  { id: 2, word: "Share", matchId: 102 },
  { id: 3, word: "Smile", matchId: 103 }
];

const kindnessImages = [
  { id: 101, label: "🧹 Helping Clean" },
  { id: 102, label: "🍎 Sharing Food" },
  { id: 103, label: "😊 Smiling at a Friend" }
];

const KindnessPuzzle: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);

  const handleMatch = (imageId: number) => {
    if (!selectedWord) return;
    const word = kindnessWords.find((w) => w.id === selectedWord);
    if (word?.matchId === imageId) {
      setMatched([...matched, selectedWord]);
    }
    setSelectedWord(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-yellow-50 rounded-xl">
      <div>
        <h2 className="text-lg font-bold mb-2">📝 Kindness Words</h2>
        {kindnessWords.map((w) => (
          <button
            key={w.id}
            onClick={() => setSelectedWord(w.id)}
            disabled={matched.includes(w.id)}
            className={`block w-full mb-2 px-4 py-2 rounded text-left ${
              matched.includes(w.id)
                ? 'bg-green-200'
                : selectedWord === w.id
                ? 'bg-yellow-300'
                : 'bg-white'
            } border`}
          >
            {w.word}
          </button>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">🖼️ Match to Picture</h2>
        {kindnessImages.map((img) => (
          <button
            key={img.id}
            onClick={() => handleMatch(img.id)}
            className="block w-full mb-2 px-4 py-2 rounded bg-white border hover:bg-blue-100"
          >
            {img.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KindnessPuzzle;
