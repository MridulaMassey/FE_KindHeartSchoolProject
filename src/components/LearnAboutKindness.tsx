// components/LearnAboutKindness.tsx
import React from "react";

const LearnAboutKindness: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-pink-100 p-6 rounded-xl shadow-lg overflow-y-auto max-h-[80vh] space-y-8">

      {/* What is kindness? */}
      <div className="bg-white p-4 rounded-lg shadow text-gray-800">
        <h2 className="text-xl font-semibold text-pink-600 mb-2">💬 What is kindness?</h2>
        <p>
          Kindness is like a <strong>superpower</strong> that lives in your heart.
          It’s the little things you do to make someone feel happy, safe, or seen.
        </p>
        <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
          <li>💖 Saying something nice to a friend</li>
          <li>✋ Helping someone who dropped their books</li>
          <li>😊 Smiling at someone who’s feeling shy</li>
          <li>🐾 Being gentle with animals</li>
          <li>🌍 Taking care of the Earth</li>
        </ul>
      </div>

      {/* Why does it matter */}
      <div className="bg-white p-4 rounded-lg shadow text-gray-800">
        <h2 className="text-xl font-semibold text-orange-500 mb-2">💥 Why does kindness matter?</h2>
        <p>
          Kindness spreads like <strong>magic confetti</strong> —
          when you throw a little out into the world, it lands on others and makes <em>everyone</em> shine!
        </p>
        <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
          <li>🥰 People feel happy</li>
          <li>💪 You feel proud and strong</li>
          <li>🌈 The world becomes a better place</li>
        </ul>
      </div>

      {/* Did you know? */}
      <div className="bg-white p-4 rounded-lg shadow text-gray-800">
        <h2 className="text-xl font-semibold text-purple-600 mb-2">🧠 Did You Know?</h2>
        <p>
          🧪 Scientists say kindness is <strong>good for your brain!</strong>
          It releases “feel-good” chemicals like <em>oxytocin</em> (your “love hormone”).
        </p>
      </div>

      {/* Imagine This */}
      <div className="bg-white p-4 rounded-lg shadow text-gray-800">
        <h2 className="text-xl font-semibold text-teal-600 mb-2">🎨 Imagine This!</h2>
        <p>
          You’re holding a glowing <strong>lantern of kindness</strong>.
          Every time you:
        </p>
        <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
          <li>💡 share</li>
          <li>👂 listen</li>
          <li>🧹 help</li>
        </ul>
        <p className="mt-2">your lantern shines brighter… and helps <em>light the way</em> for others!</p>
      </div>
    </div>
  );
};

export default LearnAboutKindness;
