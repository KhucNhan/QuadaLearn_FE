"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchWithAuth } from "@/utils/api";

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
  testName: string;
  score: number;
  time: string;
  timeSpent: number;
  questions: Question[];
  userAnswers: UserAnswer[];
}

export default function TestHistoryDetailPage() {
  const [detail, setDetail] = useState<TestDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const historyId = params.id as string;

  useEffect(() => {
    fetchDetail();
  }, [historyId]);

  const fetchDetail = async () => {
    try {
      const res = await fetchWithAuth(`/user-tests/${historyId}`);
      
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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải chi tiết...</p>
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <svg
                className="w-24 h-24 mx-auto text-red-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Không tìm thấy bài test
              </h2>
              <p className="text-gray-600 mb-6">
                Bài test này có thể đã bị xóa hoặc bạn không có quyền truy cập
              </p>
              <button
                onClick={() => router.push("/test-history")}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
              >
                Quay lại lịch sử
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const correctCount = detail.userAnswers.filter((a) => a.isCorrect).length;
  const totalQuestions = detail.questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 font-medium group"
        >
          <svg
            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
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
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {detail.testName}
              </h1>
              <p className="text-gray-600 flex items-center">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {formatDateTime(detail.time)}
              </p>
            </div>
            <div className="text-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 min-w-[140px]">
              <div className="text-5xl font-bold text-indigo-600 mb-1">
                {detail.score}
              </div>
              <div className="text-sm text-gray-600 font-medium">điểm</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border-2 border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {correctCount}
              </div>
              <div className="text-sm text-gray-700 font-medium">Câu đúng</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 text-center border-2 border-red-200">
              <div className="text-4xl font-bold text-red-600 mb-2">
                {totalQuestions - correctCount}
              </div>
              <div className="text-sm text-gray-700 font-medium">Câu sai</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center border-2 border-blue-200">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {formatTime(detail.timeSpent).split(" ")[0]}{" "}
                <span className="text-lg">
                  {formatTime(detail.timeSpent).split(" ")[1]}
                </span>
              </div>
              <div className="text-sm text-gray-700 font-medium">
                Thời gian làm bài
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
                className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${
                  userAnswer?.isCorrect
                    ? "border-green-500"
                    : "border-red-500"
                }`}
              >
                {/* Question header */}
                <div className="flex items-start justify-between mb-4">
                  <p className="font-semibold text-gray-800 flex-1 text-lg">
                    <span className="text-indigo-600 mr-3">
                      Câu {idx + 1}.
                    </span>
                    {q.content}
                  </p>
                  <div
                    className={`ml-4 px-4 py-2 rounded-full text-sm font-bold flex items-center ${
                      userAnswer?.isCorrect
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {userAnswer?.isCorrect ? (
                      <>
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Đúng
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Sai
                      </>
                    )}
                  </div>
                </div>

                {/* Options */}
                <ul className="space-y-3">
                  {q.options.map((opt, i) => {
                    let bgColor = "bg-gray-50 border-gray-200";
                    let textColor = "text-gray-800";
                    let icon = null;

                    // Đáp án đúng
                    if (opt === correctOption) {
                      bgColor = "bg-green-50 border-green-300";
                      textColor = "text-green-900";
                      icon = (
                        <span className="text-green-700 font-bold ml-auto flex items-center">
                          <svg
                            className="w-5 h-5 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Đáp án đúng
                        </span>
                      );
                    }
                    // Đáp án user chọn (nếu sai)
                    else if (
                      opt === userAnswer?.answer &&
                      !userAnswer?.isCorrect
                    ) {
                      bgColor = "bg-red-50 border-red-300";
                      textColor = "text-red-900";
                      icon = (
                        <span className="text-red-700 font-bold ml-auto flex items-center">
                          <svg
                            className="w-5 h-5 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Bạn đã chọn
                        </span>
                      );
                    }

                    return (
                      <li key={i}>
                        <div
                          className={`flex items-center p-4 rounded-xl border-2 ${bgColor} ${textColor} transition-all`}
                        >
                          <span className="flex-1 font-medium">{opt}</span>
                          {icon}
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* User didn't answer */}
                {!userAnswer?.answer && (
                  <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl text-yellow-800 flex items-center">
                    <svg
                      className="w-6 h-6 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">
                      Bạn chưa trả lời câu này
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push(`/tests/${detail.testId}`)}
            className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
          >
            Làm lại bài test này
          </button>
          <button
            onClick={() => router.push("/test-history")}
            className="flex-1 py-4 bg-white text-gray-800 rounded-xl font-semibold hover:bg-gray-100 border-2 border-gray-200 transition-all"
          >
            Xem lịch sử khác
          </button>
        </div>
      </div>
    </div>
  );
}
