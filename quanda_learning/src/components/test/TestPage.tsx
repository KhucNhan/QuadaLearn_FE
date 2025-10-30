"use client";

import { useEffect, useState } from "react";
import TestSidebar from "./TestSideBar";
import { useSearchParams } from "next/navigation";
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

  const searchParams = useSearchParams();
  const level = searchParams.get("level") || "unknown";
  const feedbackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `http://localhost:8888/questions/test/${testId}`
        );
        if (!res.ok) throw new Error("Failed to fetch questions");

        const data: Question[] = await res.json();
        console.log("✅ Fetched questions:", data); // 🔹 Debug log
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
    console.log(`🖊 Answer selected: q${questionId} = ${option}`); // 🔹 Debug log
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNavigate = (index: number) => {
    const el = document.getElementById(`question-${questions[index].id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async () => {
    const payload: TestSubmissionRequest = {
      aim: level,
      answers: questions.map((q) => ({
        questionId: q.id,
        answer: answers[q.id] || null,
      })),
    };

    console.log("📤 Submitting payload:", payload); // 🔹 Debug log

    try {
      setSubmitting(true);
      const res = await fetch(`http://localhost:8888/tests/${testId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit test");

      const jsonData = await res.json();
      console.log("📥 Feedback received:", jsonData);

      // chỉ lấy scoreAnalysis
      setFeedback(jsonData.scoreAnalysis);
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error("❌ Error submitting test:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading questions...</p>;
  if (questions.length === 0)
    return <p className="text-center text-red-500">No questions found.</p>;

  return (
    <div className="flex max-w-6xl mx-auto p-6 space-x-6">
      {/* Main test content */}
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">
          {testId === 1
            ? "Bài kiểm tra đánh giá năng lực"
            : `Bài kiểm tra số ${testId}`}
        </h2>

        {questions.map((q, idx) => {
          const userAnswer = answers[q.id] || null;
          const submitted = !!feedback; // đã submit hay chưa

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
                  const userAnswer = answers[q.id]; // lấy đáp án của người dùng
                  let bgColor = "bg-white"; // mặc định
                  if (submitted) {
                    if (opt === q.answerKey) {
                      bgColor = "bg-green-100"; // đáp án đúng
                    } else {
                      bgColor = "bg-red-100"; // sai
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
                          disabled={submitted} // không cho chỉnh sửa sau submit
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
      />
    </div>
  );
}
