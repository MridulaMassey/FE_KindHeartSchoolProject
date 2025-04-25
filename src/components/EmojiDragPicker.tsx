import React from "react";

const emojiList = ["😃", "😊", "👏", "🧸", "🌟", "💖", "🐶", "🎉", "🌈"];

interface Props {
  onEmojiDrop: (emoji: string) => void;
}

const EmojiDragPicker: React.FC<Props> = ({ onEmojiDrop }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {emojiList.map((emoji, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", emoji);
          }}
          className="text-2xl cursor-move bg-white border rounded-full w-10 h-10 flex items-center justify-center shadow hover:scale-110 transition"
          title="Drag me!"
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};

export default EmojiDragPicker;
