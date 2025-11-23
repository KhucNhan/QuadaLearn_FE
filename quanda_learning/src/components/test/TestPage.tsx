"use client";

import { useEffect, useState } from "react";
import TestSidebar from "./TestSideBar";
import { useSearchParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import React, { useRef } from "react";
import LoadingAnalyze from "../LoadingAnalyze";

interface Question {
  id: number;
  content: string;
  options: string[];
  answerKey?: string;
}

interface TestSubmissionRequest {
  aim: string;
  answers: { questionId: number; answer: string | null }[];
}

export default function TestPage({ testId }: { testId: number }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [feedbackReady, setFeedbackReady] = useState(false); // Track khi feedback đã sẵn sàng

  const searchParams = useSearchParams();
  const level = searchParams.get("level") || "unknown";
  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `http://localhost:8888/questions/test/${testId}`
        );
        if (!res.ok) throw new Error("Failed to fetch questions");

        const data: Question[] = await res.json();
        console.log("✅ Fetched questions:", data);
        
        // Tráo thứ tự câu hỏi và tráo thứ tự options
        const shuffledQuestions = data
          .sort(() => Math.random() - 0.5) // Tráo câu hỏi
          .map((q) => ({
            ...q,
            options: [...q.options].sort(() => Math.random() - 0.5), // Tráo options
          }));
        
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

  const handleSubmit = async () => {
  if (isSubmitted) return;
  
  setIsSubmitted(true);
  setShowLoading(true);
  setFeedbackReady(false);
  
  const payload: TestSubmissionRequest = {
    aim: level,
    answers: questions.map((q) => ({
      questionId: q.id,
      answer: answers[q.id] || null,
    })),
  };

  console.log("📤 Submitting payload:", payload);

  try {
    setSubmitting(true);
    const res = await fetch(`http://localhost:8888/tests/${testId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // ✅ Log thêm thông tin response
    console.log("📊 Response status:", res.status);
    console.log("📊 Response ok:", res.ok);
    
    // ✅ Lấy error message từ backend nếu có
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error("❌ Error response:", errorData);
      throw new Error(errorData?.message || `Failed to submit test (${res.status})`);
    }

    const jsonData = await res.json();
    console.log("📥 Feedback received:", jsonData);

    // Set feedback data và đánh dấu đã sẵn sàng
    setFeedback(jsonData.scoreAnalysis);
    setFeedbackReady(true);

  } catch (err) {
    console.error("❌ Error submitting test:", err);
    setIsSubmitted(false);
    setShowLoading(false);
    setFeedbackReady(false);
    
    // ✅ Hiển thị error message cụ thể hơn
    alert(`Có lỗi xảy ra khi nộp bài:\n${err instanceof Error ? err.message : 'Unknown error'}\n\nVui lòng thử lại!`);
  } finally {
    setSubmitting(false);
  }
};

  const handleLoadingComplete = () => {
    // Animation hoàn thành, ẩn loading và scroll đến feedback
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
      {/* Loading Analyze Animation */}
      {showLoading && (
        <LoadingAnalyze 
          feedbackReady={feedbackReady} 
          onComplete={handleLoadingComplete} 
        />
      )}

      <div className="flex max-w-6xl mx-auto p-6 space-x-6">
        {/* Main test content */}
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          {/* Back button */}
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

                    if (submitted && q.answerKey) {
                      const correctIndex = q.answerKey.charCodeAt(0) - 65;
                      const correctOption = q.options[correctIndex];
                      
                      if (opt === correctOption) {
                        bgColor = "bg-green-100";
                      }
                      else if (opt === userAnswer && userAnswer !== correctOption) {
                        bgColor = "bg-red-100";
                      }
                    }

                    return (
                      <li key={i}>
                        <label
                          className={`flex items-center space-x-2 p-2 rounded ${bgColor}`}
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

          {/* Feedback */}
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

        {/* Sidebar */}
        <TestSidebar
          totalQuestions={questions.length}
          onNavigate={handleNavigate}
          answers={answers}
          onSubmit={handleSubmit}
          isSubmitted={isSubmitted}
          questionIds={questions.map((q) => q.id)}
        />
      </div>
    </>
  );
}
