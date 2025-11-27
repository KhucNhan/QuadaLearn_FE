"use client";

import React, { useEffect, useState, useRef } from "react";
import { Volume2 } from "lucide-react";
import "../../styles/skill/Vocabulary.css";
import {
  fetchVocabularies,
  createVocabulary,
  updateVocabulary,
} from "@/lib/skill/fetchVocabulary";

interface VocabularyItem {
  id: number;
  word: string;
  transcription: string;
  meaning: string;
  exampleSentence: string;
  imageUrl?: string;
  level?: string;
  topic?: string;
}

const VocabularyCard: React.FC<{
  item: VocabularyItem;
  onEdit: (item: VocabularyItem) => void;
}> = ({ item, onEdit }) => {
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
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div
      className="w-[200px] h-[300px] perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full duration-500 transform-style preserve-3d ${flipped ? "rotate-y-180" : ""
          }`}
      >
        {/* Front */}
        <div className="absolute w-[200px] h-[300px] bg-white rounded-xl shadow-md backface-hidden flex flex-col items-center p-4">
          <img
            src={
              item.imageUrl ||
              "https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
            }
            alt={item.word}
            className="w-[200px] h-[100px] object-cover rounded-md mb-4"
            loading="lazy"
          />

          <h2 className="text-2xl font-bold text-gray-900 text-center truncate w-full">
            {item.word}
          </h2>

          <p className="text-sm text-gray-500 italic mb-1">{item.transcription}</p>
          <p className="text-gray-700">{item.meaning}</p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                speak(item.word);
              }}
              className={`p-2 rounded-full ${speaking ? "bg-blue-200" : "hover:bg-gray-200"
                }`}
            >
              <Volume2 className="w-6 h-6 text-gray-600" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(item);
              }}
              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Sửa
            </button>
          </div>
        </div>

        {/* Back */}
        <div className="absolute w-[200px] h-[300px] bg-white rounded-xl shadow-md backface-hidden rotate-y-180 p-4 flex flex-col">
          <p className="text-gray-700 italic">"{item.exampleSentence}"</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
            }}
            className="mt-auto text-blue-600 hover:underline"
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

  const [formVisible, setFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<VocabularyItem | null>(null);
  const [formData, setFormData] = useState<Partial<VocabularyItem>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [allVocabularies, setAllVocabularies] = useState<VocabularyItem[]>([]);



  const formRef = useRef<HTMLDivElement>(null);

  const loadVocabularies = async () => {
    const data = await fetchVocabularies();
    const dataWithImages = data.map((item) => ({
      ...item,
      imageUrl:
        item.imageUrl ||
        "https://cdn-icons-png.flaticon.com/512/2232/2232688.png",
    }));

    setAllVocabularies(dataWithImages); // lưu bản gốc
    setVocabularyList(dataWithImages); // hiển thị
  };

  useEffect(() => {
    loadVocabularies();
  }, []);

  const normalize = (str: string) =>
  str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() || "";

const handleSearch = (value: string) => {
  setSearchTerm(value);

  if (value.trim() === "") {
    setVocabularyList(allVocabularies);
    return;
  }

  const search = normalize(value);

  const filtered = allVocabularies.filter((item) =>
    [item.word, item.meaning, item.topic, item.level]
      .filter(Boolean)
      .some((field) => normalize(field!).includes(search))
  );

  setVocabularyList(filtered);
  setCurrentPage(1);
};


  const handleSave = async () => {
    const payload: VocabularyItem = {
      id: editingItem?.id,
      word: formData.word || "",
      transcription: formData.transcription || "",
      meaning: formData.meaning || "",
      exampleSentence: formData.exampleSentence || "",
      imageUrl: formData.imageUrl || "",
      level: formData.level || "",
      topic: formData.topic || "",
    };

    const result = editingItem
      ? await updateVocabulary(editingItem.id, payload)
      : await createVocabulary(payload);

    if (result) {
      setFormVisible(false);
      setEditingItem(null);
      setFormData({});
      loadVocabularies();
    }
  };

  const openForm = (item?: VocabularyItem) => {
    setEditingItem(item || null);
    setFormData(item || {});
    setFormVisible(true);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vocabularyList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(vocabularyList.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
        📚 ÔN TẬP TỪ VỰNG
      </h3>

      {/* Search + Add */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Tìm từ theo nghĩa, topic, level..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-72 pl-10 pr-4 py-2 border rounded-full shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => openForm()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
        >
          ➕ Thêm từ mới
        </button>
      </div>

      {/* Form */}
      {formVisible && (
        <div
          ref={formRef}
          className="w-full max-w-5xl bg-white p-4 mb-6 rounded shadow"
        >
          <h4 className="text-lg font-semibold mb-2">
            {editingItem ? "✏️ Sửa từ vựng" : "➕ Thêm từ mới"}
          </h4>

          <div className="grid grid-cols-2 gap-3">
            {["word", "transcription", "meaning", "exampleSentence", "imageUrl", "level", "topic"].map(
              (field) => (
                <input
                  key={field}
                  placeholder={field}
                  value={formData[field as keyof VocabularyItem] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              )
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setFormVisible(false)}
              className="px-3 py-1 rounded bg-gray-300"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Lưu
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {currentItems.length === 0 ? (
        <p className="text-gray-500 text-lg mt-10">⚠️ Không tìm thấy từ nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((item) => (
            <VocabularyCard key={item.id} item={item} onEdit={openForm} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex gap-4 items-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 rounded bg-gray-200 disabled:bg-gray-300"
          >
            ◀ Trang trước
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 rounded bg-gray-200 disabled:bg-gray-300"
          >
            Trang sau ▶
          </button>
        </div>
      )}
    </div>
  );
};

export default Vocabulary;
