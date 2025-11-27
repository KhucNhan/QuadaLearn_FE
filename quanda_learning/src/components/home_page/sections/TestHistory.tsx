"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/utils/api"; // ✅ Import helper
import { on } from "events";

interface TestHistoryItem {
  id: number;
  testId: number;
  score: number;
  time: string;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number; // seconds
  testName: string;
}

export default function TestHistory({onSelect}: {onSelect: (id: number) => void}) {
  const [history, setHistory] = useState<TestHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
        const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).id : null;
      const res = await fetch(`http://localhost:8888/user-tests/user/${userId}`);
      
      if (!res.ok) throw new Error("Failed to fetch history");

      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("❌ Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    if (h > 0) {
      return `${h}h ${m}m ${s}s`;
    } else if (m > 0) {
      return `${m}m ${s}s`;
    } else {
      return `${s}s`;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-50 border-green-200";
    if (score >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">Đang tải lịch sử...</div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Lịch sử làm bài</h1>
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-gray-600 text-lg">
            Bạn chưa có lịch sử làm bài nào
          </p>
          <button
            onClick={() => router.push("/tests")}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Làm bài test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Lịch sử làm bài
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-xl transition-shadow border-2 ${getScoreBgColor(
              item.score
            )}`}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Bài test: {item.testName}
              </h3>
              <div className="ml-4">
                  <div className={`text-4xl font-bold ${getScoreColor(item.score)}`}>
                    {item.score / 10}
                  </div>
                  <div className="text-xs text-gray-600 text-center">điểm</div>
                </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              {/* Số câu đúng */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Kết quả
                </span>
                <span className="font-semibold text-gray-800">
                  {item.correctAnswers}/{item.totalQuestions}
                </span>
              </div>

              {/* Thời gian làm bài */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Thời gian
                </span>
                <span className="font-semibold text-gray-800">
                  {formatTime(item.timeSpent)}
                </span>
              </div>

              {/* Ngày làm bài */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Ngày làm
                </span>
                <span className="text-sm text-gray-700">
                  {formatDateTime(item.time)}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full text-center text-indigo-600 font-medium hover:text-indigo-800">
                Xem chi tiết →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
