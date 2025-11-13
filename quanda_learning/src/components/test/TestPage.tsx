"use client";

import { useEffect, useState } from "react";
import TestSidebar from "./TestSideBar";
import { useSearchParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import React, { useRef } from "react";

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
  const [isSubmitted, setIsSubmitted] = useState(false); // Thêm state để track đã submit

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
        setQuestions(data);
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

  const handleSubmit = () => {
    if (isSubmitted) return; // Ngăn submit nhiều lần
    
    setIsSubmitted(true); // Đánh dấu đã submit
    const fakeFeedback = "Your score analysis (mock)";
    setFeedback(fakeFeedback);

    setTimeout(() => {
      feedbackRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    console.log("📤 Answers submitted (mock):", answers);
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading questions...</p>;
  if (questions.length === 0)
    return <p className="text-center text-red-500">No questions found.</p>;

  return (
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
                    // Chuyển answerKey (A,B,C,D) thành index (0,1,2,3)
                    const correctIndex = q.answerKey.charCodeAt(0) - 65;
                    const correctOption = q.options[correctIndex];
                    
                    // Highlight đáp án đúng màu xanh
                    if (opt === correctOption) {
                      bgColor = "bg-green-100";
                    }
                    // Highlight đáp án sai của user màu đỏ
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
      />
    </div>
  );
}
