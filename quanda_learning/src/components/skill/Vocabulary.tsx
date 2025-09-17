"use client";

import React, { useEffect, useState } from "react";
import { Volume2 } from "lucide-react";
import "../../styles/skill/Vocabulary.css";
import { fetchVocabularies } from "@/lib/skill/fetchVocabulary";

interface VocabularyItem {
  id: number;
  word: string;
  transcription: string;
  meaning: string;
  exampleSentence: string;
  imageUrl?: string;
}

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
      className="w-[200px] h-[300px] perspective cursor-pointer "
      onClick={() => setFlipped(!flipped)}
      aria-label={`Thẻ từ vựng ${item.word}, nhấn để xem ví dụ`}
    >
      <div
        className={`relative w-full h-full duration-500 transform-style preserve-3d ${flipped ? "rotate-y-180" : ""}`}
      >
        {/* Mặt trước */}
        <div className="absolute w-[200px] h-[300px] bg-white rounded-xl shadow-md backface-hidden flex flex-col items-center p-4">
          <img
            src={item.imageUrl}
            alt={`Ảnh minh họa từ ${item.word}`}
            className=" w-[200px] h-[100px] object-cover rounded-md mb-4"
            loading="lazy"
          />
          <h2
            className="text-2xl font-bold text-gray-900 w-full break-words text-center"
            title={item.word} // Tooltip hiện toàn bộ từ khi hover
          >
            {item.word.length > 10 ? `${item.word.slice(0, 10)}...` : item.word}
          </h2>
          <p className="text-sm text-gray-500 italic mb-2">{item.transcription}</p>
          <p className="text-gray-700 mb-4">{item.meaning}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              speak(item.word);
            }}
            aria-label={`Nghe phát âm từ ${item.word}`}
            className={`p-2 rounded-full transition-colors ${speaking ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:bg-gray-200 hover:text-gray-700"
              }`}
          >
            <Volume2 className="w-6 h-6" />
          </button>
        </div>

        {/* Mặt sau */}
        <div className="absolute w-[200px] h-[300px] bg-white rounded-xl shadow-md backface-hidden rotate-y-180 p-4 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ví dụ</h3>
          <p className="text-gray-700 italic">"{item.exampleSentence}"</p>
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
  const [vocabularyList, setVocabularyList] = useState<VocabularyItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const loadVocabularies = async () => {
      const data = await fetchVocabularies();

      const dataWithImages = data.map((item) => ({
        ...item,
        imageUrl:
          item.imageUrl ||
          "https://cdn-icons-png.flaticon.com/512/2232/2232688.png",
      }));

      setVocabularyList(dataWithImages);
    };

    loadVocabularies();
  }, []);

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vocabularyList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(vocabularyList.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h3 className="text-2xl md:text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-md tracking-wide uppercase">
        📚 ÔN TẬP TỪ VỰNG
      </h3>



      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-15">
        {currentItems.map((item) => (
          <VocabularyCard key={item.id} item={item} />
        ))}
      </div>

      {/* Nút chuyển trang */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-300"
        >
          Trang trước
        </button>
        <span className="text-gray-700 mt-2">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-300"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default Vocabulary;
