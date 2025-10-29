"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Vocabulary {
  id: number;
  word: string;
  meaning: string;
}

interface Passage {
  id: number;
  title: string;
  content: string;
  vocabularies: Vocabulary[];
}

export default function ReadComprehension({
  onSelectPassage,
}: {
  onSelectPassage: (p: Passage) => void;
}) {
  const [passages, setPassages] = useState<Passage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8888/api/reading-passages")
      .then((res) => {
        setPassages(res.data);
      })
      .catch((err) => console.error("Error fetching passages:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-blue-600 text-xl">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-10">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10 drop-shadow">
        📖 Reading Practice
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {passages.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectPassage(item)}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-200 transform hover:-translate-y-1 cursor-pointer border border-gray-100"
          >
            <h2 className="text-blue-600 font-semibold text-xl mb-2">
              {item.title}
            </h2>
            <p className="text-gray-700 text-sm line-clamp-3">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
