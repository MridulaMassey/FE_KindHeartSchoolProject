import React, { useState } from 'react';
import { Picker } from 'emoji-mart';
//import 'emoji-mart/css/emoji-mart.css';

const emojiOptions = ["🌈", "🤝", "🎉", "🌟"];

const KindnessJournal = ({ studentId }: { studentId: string }) => {
  const [entryText, setEntryText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async () => {
    if (!entryText.trim()) {
      setErrorMsg("Please write something kind.");
      return;
    }

    try {
      const response = await fetch('https://localhost:44361/api/KindnessJournal/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          entryText,
          emoji: selectedEmoji
        })
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMsg(result.message || "Journal entry saved!");
        setEntryText('');
        setSelectedEmoji('');
      } else {
        setErrorMsg(result.message || "Something went wrong.");
      }
    } catch (err) {
      setErrorMsg("Failed to submit. Please try again later.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-red-700">Hey there, Kindness Hero! 💖</h2>
      <p className="text-gray-600 mb-4">
        What kind thing did you do today? 🌟<br />
        Share a moment that made you smile or helped someone else.  
        It could be something you learned, a lesson you want to remember, or a little act of kindness you’re proud of.  
        Let's celebrate your kind heart! 🧠💛
      </p>

      {/* Textarea with emoji picker toggle */}
      <div className="mb-4 relative">
        <textarea
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          placeholder="Write your kind act here..."
          className="w-full h-32 border border-yellow-400 p-2 rounded-lg bg-yellow-100 text-gray-800"
        />

        {/* Emoji toggle button */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="mt-2 text-xl bg-white border border-gray-300 rounded-full px-3 py-1 shadow hover:bg-yellow-100"
          title="Choose an emoji"
        >
          😀
        </button>

        {/* Emoji picker popup */}
        {showEmojiPicker && (
          <div className="absolute z-50 mt-2">
            <Picker
              onSelect={(emoji) => {
                setEntryText((prev) => prev + emoji.native);
                setShowEmojiPicker(false); // close after selection
              }}
              title="Pick an emoji"
              emoji="sparkles"
            />
          </div>
        )}
      </div>
        <br></br>
        <br></br>
      {/* Optional emoji badge selector */}
      <div className="mt-4 mb-4">
        <p className="font-medium mb-2">Pick a badge to describe your act:</p>
        <div className="flex gap-2 text-2xl">
          {emojiOptions.map((emoji) => (
            <button
              key={emoji}
              className={`px-3 py-1 rounded-full border ${
                selectedEmoji === emoji ? 'bg-yellow-300 border-yellow-600' : 'border-gray-300'
              }`}
              onClick={() => setSelectedEmoji(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded"
      >
        🌟 Save My Kindness Story
      </button>

      {/* Message Area */}
      <div className="mt-4">
        {successMsg && <p className="text-green-600 font-medium">{successMsg}</p>}
        {errorMsg && <p className="text-red-500 font-medium">{errorMsg}</p>}
      </div>
    </div>
  );
};

export default KindnessJournal;
