"use client";
import React, { useEffect, useState } from "react";

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

export default function ReadingDetail({
  passage,
  onBack,
}: {
  passage: Passage;
  onBack: () => void;
}) {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const en = voices.find((v) => v.lang.startsWith("en"));
      setVoice(en || voices[0] || null);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (!("speechSynthesis" in window)) {
      alert("Trình duyệt không hỗ trợ text-to-speech.");
      return;
    }

    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(passage.content);
    if (voice) u.voice = voice;
    u.lang = voice?.lang || "en-US";
    u.rate = 1;
    u.pitch = 1;

    u.onstart = () => setIsSpeaking(true);
    u.onend = () => setIsSpeaking(false);
    u.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(u);
  };

  const handleStop = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="p-6 mx-auto rounded-2xl mt-10" style={{ marginBottom: 70 }}>
      <div
        className="flex items-center justify-between mb-4"
        style={{ marginBottom: 45 }}
      >
        <button
          onClick={() => {
            handleStop();
            onBack();
          }}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          ← Quay lại
        </button>

        <div className="flex items-center gap-2">
          {!isSpeaking ? (
            <button
              onClick={handleSpeak}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <span>🔊 Nghe</span>
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <span>⏹ Dừng</span>
            </button>
          )}
        </div>
      </div>

      <h2 className="text-3xl font-bold text-blue-600 mb-4">
        {passage.title}
      </h2>

      <p className="text-gray-800 mb-6 leading-relaxed whitespace-pre-line">
        {passage.content}
      </p>

      <h3 className="font-semibold text-gray-700 mb-2">📘 Vocabulary:</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {passage.vocabularies.map((vocab) => (
          <li key={vocab.id}>
            <b>{vocab.word}</b>: {vocab.meaning}
          </li>
        ))}
      </ul>
    </div>
  );
}
