"use client";

import { useEffect } from "react";

export default function AlphabetIPA() {
  const vowels = [
    { ipa: "/iː/", example: "sheep", meaning: "con cừu" },
    { ipa: "/ɪ/", example: "ship", meaning: "con tàu" },
    { ipa: "/eɪ/", example: "day", meaning: "ngày" },
    { ipa: "/ɛ/", example: "bed", meaning: "giường" },
    { ipa: "/æ/", example: "cat", meaning: "con mèo" },
    { ipa: "/ɑː/", example: "car", meaning: "xe hơi" },
    { ipa: "/ɔː/", example: "door", meaning: "cửa" },
    { ipa: "/oʊ/", example: "go", meaning: "đi" },
    { ipa: "/ʊ/", example: "book", meaning: "sách" },
    { ipa: "/uː/", example: "moon", meaning: "mặt trăng" },
    { ipa: "/ʌ/", example: "cup", meaning: "tách" },
    { ipa: "/ə/", example: "about", meaning: "về" },
    { ipa: "/ɜː/", example: "bird", meaning: "con chim" },
    { ipa: "/aɪ/", example: "eye", meaning: "mắt" },
    { ipa: "/aʊ/", example: "house", meaning: "nhà" },
    { ipa: "/ɔɪ/", example: "boy", meaning: "con trai" },
  ];

  const consonants = [
    { ipa: "/p/", example: "pen", meaning: "bút" },
    { ipa: "/b/", example: "bad", meaning: "tồi" },
    { ipa: "/t/", example: "tea", meaning: "trà" },
    { ipa: "/d/", example: "dog", meaning: "con chó" },
    { ipa: "/k/", example: "cat", meaning: "con mèo" },
    { ipa: "/g/", example: "go", meaning: "đi" },
    { ipa: "/f/", example: "fish", meaning: "cá" },
    { ipa: "/v/", example: "van", meaning: "xe tải" },
    { ipa: "/θ/", example: "think", meaning: "nghĩ" },
    { ipa: "/ð/", example: "this", meaning: "cái này" },
    { ipa: "/s/", example: "see", meaning: "thấy" },
    { ipa: "/z/", example: "zoo", meaning: "vườn thú" },
    { ipa: "/ʃ/", example: "she", meaning: "cô ấy" },
    { ipa: "/ʒ/", example: "vision", meaning: "tầm nhìn" },
    { ipa: "/h/", example: "house", meaning: "nhà" },
    { ipa: "/m/", example: "man", meaning: "người đàn ông" },
    { ipa: "/n/", example: "no", meaning: "không" },
    { ipa: "/ŋ/", example: "sing", meaning: "hát" },
    { ipa: "/l/", example: "love", meaning: "tình yêu" },
    { ipa: "/r/", example: "red", meaning: "đỏ" },
    { ipa: "/w/", example: "we", meaning: "chúng tôi" },
    { ipa: "/j/", example: "yes", meaning: "vâng" },
  ];

  const speak = (word: string) => {
    const u = new SpeechSynthesisUtterance(word);
    u.lang = "en-US";
    u.rate = 0.8;
    speechSynthesis.speak(u);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white pb-10">
      <header className="bg-blue-600 text-white py-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold">🔊 Bảng Phiên Âm Quốc Tế (IPA)</h1>
        <p className="text-lg opacity=.90">Học phát âm chuẩn cùng ví dụ!</p>
      </header>

      <div className="max-w-5xl mx-auto px-5 mt-10">
        {/* --- NGUYÊN ÂM --- */}
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">Nguyên Âm (Vowels)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {vowels.map((item, i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-xl shadow hover:scale-105 transition cursor-pointer text-center"
            >
              <p className="text-3xl font-bold text-blue-600">{item.ipa}</p>
              <p className="text-gray-700 mt-1">{item.example}</p>
              <p className="text-gray-500 text-sm">{item.meaning}</p>
              <button
                onClick={() => speak(item.example)}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm"
              >
                🔊 Nghe
              </button>
            </div>
          ))}
        </div>

        {/* --- PHỤ ÂM --- */}
        <h2 className="text-2xl font-bold text-blue-700 text-center mt-12 mb-6">Phụ Âm (Consonants)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {consonants.map((item, i) => (
            <div
              key={i}
              className="p-4 bg-white rounded-xl shadow hover:scale-105 transition cursor-pointer text-center"
            >
              <p className="text-3xl font-bold text-blue-600">{item.ipa}</p>
              <p className="text-gray-700 mt-1">{item.example}</p>
              <p className="text-gray-500 text-sm">{item.meaning}</p>
              <button
                onClick={() => speak(item.example)}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm"
              >
                🔊 Nghe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
