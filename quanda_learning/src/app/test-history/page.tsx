"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/utils/api";

interface TestHistoryItem {
  id: number;
  testId: number;
  testName: string;
  score: number;
  time: string;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number; // seconds
}

export default function TestHistoryPage() {
  const [history, setHistory] = useState<TestHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      // ✅ Lấy userId từ localStorage
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        throw new Error("User not found in localStorage");
      }
      
      const user = JSON.parse(userStr);
      const userId = user?.id;
      
      if (!userId) {
        throw new Error("User ID not found");
      }
      
      // ✅ Gọi API với userId trong URL
      const res = await fetchWithAuth(`/user-tests/user/${userId}`);
      
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
      return `${h}h ${m}m`;
    } else if (m > 0) {
      return `${m}m ${s}s`;
    } else {
      return `${s}s`;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgGradient = (score: number) => {
    if (score >= 80) return "from-green-50 to-emerald-50 border-green-200";
    if (score >= 60) return "from-yellow-50 to-amber-50 border-yellow-200";
    return "from-red-50 to-rose-50 border-red-200";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải lịch sử...</p>
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center">
            <svg
              className="w-10 h-10 mr-3 text-indigo-600"
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
            Lịch sử làm bài
          </h1>

          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <svg
              className="w-32 h-32 mx-auto text-gray-300 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Chưa có lịch sử làm bài
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Bắt đầu làm bài test để xem kết quả và theo dõi tiến trình học tập của bạn
            </p>
            <button
              onClick={() => router.push("/tests")}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
            >
              Bắt đầu làm bài test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center">
            <svg
              className="w-10 h-10 mr-3 text-indigo-600"
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
            Lịch sử làm bài
          </h1>
          <p className="text-gray-600 text-lg ml-13">
            Bạn đã hoàn thành {history.length} bài test
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => router.push(`/test-history/${item.id}`)}
              className={`bg-gradient-to-br ${getScoreBgGradient(
                item.score
              )} rounded-2xl shadow-lg hover:shadow-2xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 border-2`}
            >
              {/* Header with Score */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2">
                    {item.testName}
                  </h3>
                  <span className="text-sm text-gray-600 bg-white/60 px-3 py-1 rounded-full">
                    Test #{item.testId}
                  </span>
                </div>
                <div className="ml-4">
                  <div className={`text-4xl font-bold ${getScoreColor(item.score)}`}>
                    {item.score / 10}
                  </div>
                  <div className="text-xs text-gray-600 text-center">điểm</div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3 mb-4">
                {/* Kết quả */}
                <div className="flex items-center justify-between bg-white/70 rounded-xl p-3">
                  <span className="text-gray-700 flex items-center">
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
                  <span className="font-bold text-gray-800">
                    {item.correctAnswers}/{item.totalQuestions}
                  </span>
                </div>

                {/* Thời gian làm bài */}
                <div className="flex items-center justify-between bg-white/70 rounded-xl p-3">
                  <span className="text-gray-700 flex items-center">
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
                  <span className="font-bold text-gray-800">
                    {formatTime(item.timeSpent)}
                  </span>
                </div>

                {/* Ngày làm */}
                <div className="flex items-center justify-between bg-white/70 rounded-xl p-3">
                  <span className="text-gray-700 flex items-center">
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
                  <span className="text-sm font-semibold text-gray-800">
                    {formatDateTime(item.time)}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-200/50">
                <button className="w-full text-center text-indigo-700 font-semibold hover:text-indigo-900 flex items-center justify-center group">
                  Xem chi tiết
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
