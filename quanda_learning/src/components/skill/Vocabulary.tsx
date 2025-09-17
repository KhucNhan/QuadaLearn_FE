"use client";
import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import "../../styles/skill/Vocabulary.css";

interface VocabularyItem {
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  imageUrl: string;
}

const vocabularyList: VocabularyItem[] = [
  {
    word: "apple",
    pronunciation: "/ˈæp.əl/",
    meaning: "quả táo",
    example: "I eat an apple every day.",
    imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=80&q=80",
  },
  {
    word: "book",
    pronunciation: "/bʊk/",
    meaning: "sách",
    example: "She is reading a book.",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=80&q=80",
  },
  {
    word: "computer",
    pronunciation: "/kəmˈpjuː.tər/",
    meaning: "máy tính",
    example: "The computer is very fast.",
    imageUrl: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=80&q=80",
  },
  {
    word: "education",
    pronunciation: "/ˌedʒ.ʊˈkeɪ.ʃən/",
    meaning: "giáo dục",
    example: "Education is important for success.",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=80&q=80",
  },
  {
    word: "language",
    pronunciation: "/ˈlæŋ.ɡwɪdʒ/",
    meaning: "ngôn ngữ",
    example: "She speaks three languages.",
    imageUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=80&q=80",
  },
];

const VocabularyCard: React.FC<{ item: VocabularyItem }> = ({ item }) => {
  const [flipped, setFlipped] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const speak = (word: string) => {
    if (!("speechSynthesis" in window)) {
      alert("Trình duyệt không hỗ trợ phát âm.");
      return;
    }
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className="w-64 h-80 perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
      aria-label={`Thẻ từ vựng ${item.word}, nhấn để xem ví dụ`}
    >
      <div
        className={`relative w-full h-full duration-500 transform-style preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Mặt trước */}
        <div className="absolute w-full h-full bg-white rounded-xl shadow-md backface-hidden flex flex-col items-center p-4">
          <img
            src={item.imageUrl}
            alt={`Ảnh minh họa từ ${item.word}`}
            className="w-20 h-20 object-cover rounded-md mb-4"
            loading="lazy"
          />
          <h2 className="text-2xl font-bold text-gray-900">{item.word}</h2>
          <p className="text-sm text-gray-500 italic mb-2">{item.pronunciation}</p>
          <p className="text-gray-700 mb-4">{item.meaning}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              speak(item.word);
            }}
            aria-label={`Nghe phát âm từ ${item.word}`}
            className={`p-2 rounded-full transition-colors ${
              speaking ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:bg-gray-200 hover:text-gray-700"
            }`}
          >
            <Volume2 className="w-6 h-6" />
          </button>
        </div>

        {/* Mặt sau */}
        <div className="absolute w-full h-full bg-white rounded-xl shadow-md backface-hidden rotate-y-180 p-6 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ví dụ</h3>
          <p className="text-gray-700 italic">"{item.example}"</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
            }}
            className="mt-auto self-end text-blue-600 hover:underline"
            aria-label="Quay lại mặt trước"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

const Vocabulary = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Từ Vựng Tiếng Anh</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {vocabularyList.map((item) => (
          <VocabularyCard key={item.word} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Vocabulary;
