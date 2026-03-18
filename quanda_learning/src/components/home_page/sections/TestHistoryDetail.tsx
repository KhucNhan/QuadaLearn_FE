"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/utils/api"; // ✅ Import helper

interface Question {
  id: number;
  content: string;
  options: string[];
  answerKey: string;
}

interface UserAnswer {
  questionId: number;
  answer: string | null;
  isCorrect: boolean;
}

interface TestDetail {
  id: number;
  testId: number;
  score: number;
  time: string;
  timeSpent: number;
  questions: Question[];
  userAnswers: UserAnswer[];
  testName: string;
}

interface TestHistoryDetailProps {
  historyId: number;
  onBack: () => void;
}

export default function TestHistoryDetail({
  historyId,
  onBack,
}: TestHistoryDetailProps) {
  const [detail, setDetail] = useState<TestDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchDetail();
  }, [historyId]);

  const fetchDetail = async () => {
    try {
      const res = await fetchWithAuth(`/user-tests/${historyId}`); // ✅ Dùng fetchWithAuth

      if (!res.ok) throw new Error("Failed to fetch detail");

      const data = await res.json();
      setDetail(data);
    } catch (err) {
      console.error("❌ Error fetching detail:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (h > 0) {
      return `${h} giờ ${m} phút ${s} giây`;
    } else if (m > 0) {
      return `${m} phút ${s} giây`;
    } else {
      return `${s} giây`;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">Đang tải chi tiết...</div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          Không tìm thấy bài test này
        </div>
      </div>
    );
  }

  const correctCount = detail.userAnswers.filter((a) => a.isCorrect).length;
  const totalQuestions = detail.questions.length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Quay lại lịch sử
      </button>

      {/* Summary Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Bài test: {detail.testName}
            </h1>
            <p className="text-gray-600 mt-1">{formatDateTime(detail.time)}</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-indigo-600">
              {detail.score / 10}
            </div>
            <div className="text-sm text-gray-600">điểm</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {correctCount}
            </div>
            <div className="text-sm text-gray-600">Câu đúng</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {totalQuestions - correctCount}
            </div>
            <div className="text-sm text-gray-600">Câu sai</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatTime(detail.timeSpent).split(" ")[0]}
            </div>
            <div className="text-sm text-gray-600">
              {formatTime(detail.timeSpent).split(" ").slice(1).join(" ")}
            </div>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {detail.questions.map((q, idx) => {
          const userAnswer = detail.userAnswers.find(
            (a) => a.questionId === q.id
          );
          const correctIndex = q.answerKey.charCodeAt(0) - 65;
          const correctOption = q.options[correctIndex];

          return (
            <div
              key={q.id}
              className={`bg-white rounded-lg shadow p-6 border-l-4 ${
                userAnswer?.isCorrect ? "border-green-500" : "border-red-500"
              }`}
            >
              {/* Question header */}
              <div className="flex items-start justify-between mb-4">
                <p className="font-semibold text-gray-800 flex-1">
                  <span className="text-indigo-600 mr-2">{idx + 1}.</span>
                  {q.content}
                </p>
                <div
                  className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${
                    userAnswer?.isCorrect
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {userAnswer?.isCorrect ? "✓ Đúng" : "✗ Sai"}
                </div>
              </div>

              {/* Options */}
              <ul className="space-y-2">
                {q.options.map((opt, i) => {
                  let bgColor = "bg-gray-50";
                  let textColor = "text-gray-800";
                  let icon = null;

                  // Đáp án đúng
                  if (opt === correctOption) {
                    bgColor = "bg-green-50 border-green-300";
                    textColor = "text-green-800";
                    icon = (
                      <span className="text-green-600 font-bold ml-2">
                        ✓ Đáp án đúng
                      </span>
                    );
                  }
                  // Đáp án user chọn (nếu sai)
                  else if (
                    opt === userAnswer?.answer &&
                    !userAnswer?.isCorrect
                  ) {
                    bgColor = "bg-red-50 border-red-300";
                    textColor = "text-red-800";
                    icon = (
                      <span className="text-red-600 font-bold ml-2">
                        ✗ Bạn đã chọn
                      </span>
                    );
                  }

                  return (
                    <li key={i}>
                      <div
                        className={`flex items-center p-3 rounded border ${bgColor} ${textColor}`}
                      >
                        <span className="flex-1">{opt}</span>
                        {icon}
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* User didn't answer */}
              {!userAnswer?.answer && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded text-yellow-800 text-sm">
                  ⚠️ Bạn chưa trả lời câu này
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => {
            if (detail.testId === 1) {
              router.push("/test/level_test");
            } else {
              router.push(`/tests/${detail.testId}`);
            }
          }}
          className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
        >
          Làm lại bài test này
        </button>
        <button
          onClick={() => router.push("/test-history")}
          className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
        >
          Xem lịch sử khác
        </button>
      </div>
    </div>
  );
}
