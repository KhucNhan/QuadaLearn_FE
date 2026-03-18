"use client";

import { useEffect, useState } from "react";
import TestSidebar from "./TestSideBar";
import { useSearchParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import React, { useRef } from "react";
import LoadingAnalyze from "../LoadingAnalyze";
import { fetchWithAuth } from "@/utils/api";

interface Question {
  id: number;
  content: string;
  options: string[];
  answerKey?: string;
  correctOption?: string | null;
}

interface TestSubmissionRequest {
  aim: string;
  answers: { questionId: number; answer: string | null }[];
  timeSpent: number;
}

export default function TestPage({ testId }: { testId: number }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [feedbackReady, setFeedbackReady] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const searchParams = useSearchParams();
  const level = searchParams.get("level") || "unknown";
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // ✅ Quản lý timer ở parent
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  // ✅ Auto submit khi hết giờ
  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted && !submitting) {
      console.log("⏰ Time's up! Auto submitting...");
      performSubmit();
    }
  }, [timeLeft, isSubmitted, submitting]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `http://localhost:8888/questions/test/${testId}`
        );
        if (!res.ok) throw new Error("Failed to fetch questions");

        const data: Question[] = await res.json();
        console.log("✅ Fetched questions:", data);

        const shuffledQuestions = data
          .sort(() => Math.random() - 0.5)
          .map((q) => {
            const originalOptions = q.options;
            const correctIndex = q.answerKey
              ? q.answerKey.charCodeAt(0) - 65
              : -1;

            const correctOption =
              correctIndex >= 0 ? originalOptions[correctIndex] : null;

            const shuffledOptions = [...originalOptions].sort(
              () => Math.random() - 0.5
            );

            return {
              ...q,
              options: shuffledOptions,
              correctOption, // <-- thêm thuộc tính mới
            };
          });

        setQuestions(shuffledQuestions);
      } catch (err) {
        console.error("❌ Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [testId]);

  const handleAnswer = (questionId: number, option: string) => {
    console.log(`🖊 Answer selected: q${questionId} = ${option}`);
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNavigate = (index: number) => {
    const el = document.getElementById(`question-${questions[index].id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ✅ Function 1: Check và hiện modal (KHÔNG submit)
  const handleSubmit = () => {
    if (isSubmitted || submitting) {
      console.log("⚠️ Already submitted or submitting");
      return;
    }

    const answeredCount = Object.keys(answers).length;
    const unansweredCount = questions.length - answeredCount;

    console.log("🔍 Submit check:", {
      unansweredCount,
      timeLeft,
      answeredCount,
      totalQuestions: questions.length,
    });

    // Check điều kiện cần confirm
    let message = "";

    if (unansweredCount > 5 && timeLeft > 1800) {
      message = `⚠️ BẠN CÒN:\n\n• ${unansweredCount} câu chưa làm\n• ${Math.floor(
        timeLeft / 60
      )} phút thời gian\n\nBạn có chắc chắn muốn nộp bài không?`;
    } else if (unansweredCount > 5) {
      message = `⚠️ Bạn còn ${unansweredCount} câu chưa làm!\n\nBạn có chắc chắn muốn nộp bài không?`;
    } else if (timeLeft > 1800 && unansweredCount > 0) {
      message = `⏰ Bạn còn ${Math.floor(
        timeLeft / 60
      )} phút và ${unansweredCount} câu chưa làm!\n\nBạn có chắc chắn muốn nộp bài không?`;
    }

    // Nếu cần confirm → hiện modal
    if (message) {
      console.log("✅ Showing confirm modal");
      setConfirmMessage(message);
      setShowConfirm(true);
      return;
    }

    // Không cần confirm → submit luôn
    console.log("⏭️ No confirmation needed");
    performSubmit();
  };

  // ✅ Function 2: Submit thực sự (được gọi từ modal hoặc trực tiếp)
  const performSubmit = async () => {
    if (isSubmitted || submitting) {
      console.log("⚠️ Already submitted or submitting");
      return;
    }

    console.log("📤 Performing submit...");

    // Set flags ngay lập tức
    setSubmitting(true);
    setIsSubmitted(true);
    setShowLoading(true);
    setFeedbackReady(false);

    const testStartTime = Date.now() - (60 * 60 - timeLeft) * 1000;
    const timeSpentSeconds = Math.floor((Date.now() - testStartTime) / 1000);

    const payload: TestSubmissionRequest = {
      aim: level,
      answers: questions.map((q) => ({
        questionId: q.id,
        answer: answers[q.id] || null,
      })),
      timeSpent: timeSpentSeconds,
    };

    console.log("📤 Submitting payload:", payload);

    try {
      const res = await fetchWithAuth(`/tests/${testId}/submit`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      console.log("📊 Response status:", res.status);

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error("❌ Error response:", errorData);
        throw new Error(
          errorData?.message || `Failed to submit test (${res.status})`
        );
      }

      const jsonData = await res.json();
      console.log("📥 Feedback received:", jsonData);

      setFeedback(jsonData.scoreAnalysis);
      setFeedbackReady(true);
    } catch (err) {
      console.error("❌ Error submitting test:", err);
      setIsSubmitted(false);
      setShowLoading(false);
      setFeedbackReady(false);

      alert(
        `Có lỗi xảy ra khi nộp bài:\n${
          err instanceof Error ? err.message : "Unknown error"
        }\n\nVui lòng thử lại!`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setTimeout(() => {
      feedbackRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading questions...</p>;
  if (questions.length === 0)
    return <p className="text-center text-red-500">No questions found.</p>;

  return (
    <>
      {showLoading && (
        <LoadingAnalyze
          feedbackReady={feedbackReady}
          onComplete={handleLoadingComplete}
        />
      )}

      <div className="flex max-w-6xl mx-auto p-6 space-x-6">
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          <button
            onClick={() => router.back()}
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
            Quay lại
          </button>

          <h2 className="text-2xl font-bold text-indigo-700 mb-6">
            {testId === 1
              ? "Bài kiểm tra đánh giá năng lực"
              : `Bài kiểm tra số ${testId}`}
          </h2>

          {questions.map((q, idx) => {
            const userAnswer = answers[q.id] || null;
            const submitted = !!feedback;

            return (
              <div
                id={`question-${q.id}`}
                key={q.id}
                className="mb-6 scroll-mt-24"
              >
                <p className="font-semibold mb-2">
                  {idx + 1}. {q.content}
                </p>
                <ul className="space-y-2">
                  {q.options.map((opt, i) => {
                    let bgColor = "bg-white";
                    let borderColor = "";

                    if (submitted && q.correctOption) {
                      const correctOption = q.correctOption;

                      if (!userAnswer) {
                        bgColor = "bg-yellow-100";
                      }

                      // 2. Đáp án đúng -> xanh
                      if (opt === correctOption && userAnswer) {
                        bgColor = "bg-green-100";
                        borderColor = "border-2 border-green-500";
                      }

                      // 3. Đáp án sai người dùng chọn -> đỏ
                      if (opt === userAnswer && userAnswer !== correctOption) {
                        bgColor = "bg-red-100";
                        borderColor = "border-2 border-red-500";
                      }
                    }

                    return (
                      <li key={i}>
                        <label
                          className={`flex items-center space-x-2 p-2 rounded ${bgColor} ${borderColor} transition-colors`}
                        >
                          <input
                            type="radio"
                            name={`q-${q.id}`}
                            value={opt}
                            checked={userAnswer === opt}
                            disabled={submitted}
                            onChange={() => handleAnswer(q.id, opt)}
                          />
                          <span>{opt}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          {feedback && (
            <div
              ref={feedbackRef}
              className="mt-8 p-4 bg-green-50 border border-green-300 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                AI Feedback:
              </h3>
              <div className="prose prose-green">
                <ReactMarkdown>{feedback}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        <TestSidebar
          totalQuestions={questions.length}
          onNavigate={handleNavigate}
          answers={answers}
          onSubmit={handleSubmit}
          isSubmitted={isSubmitted}
          questionIds={questions.map((q) => q.id)}
          timeLeft={timeLeft}
        />
      </div>

      {/* ✅ Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-in fade-in zoom-in duration-200">
            <div className="flex justify-center pt-8 pb-4">
              <div className="bg-amber-100 rounded-full p-4">
                <svg
                  className="w-12 h-12 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            <div className="px-8 pb-6">
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                Xác nhận nộp bài
              </h3>
              <p className="text-gray-600 text-center whitespace-pre-line leading-relaxed">
                {confirmMessage}
              </p>
            </div>

            <div className="flex gap-3 px-8 pb-8">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  performSubmit(); // ✅ GỌI performSubmit, KHÔNG gọi handleSubmit
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
