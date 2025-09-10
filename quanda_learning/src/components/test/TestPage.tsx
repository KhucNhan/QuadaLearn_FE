"use client";

import { useEffect, useState } from "react";
import TestSidebar from "./TestSidebar";

interface Question {
  id: number;
  question: string;
  options: string[];
}

export default function TestPage({ testId }: { testId: number }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<number, string>>({}); 
  // answers[q.id] = "đáp án"

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`http://localhost:8888/questions/test/${testId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data: Question[] = await res.json();
        setQuestions(data);
      } catch (err) {
        console.error("❌ Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [testId]);

  // Hàm scroll tới câu hỏi
  const handleNavigate = (index: number) => {
    const el = document.getElementById(`question-${questions[index].id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Khi user chọn đáp án
  const handleAnswer = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading questions...</p>;
  }

  if (questions.length === 0) {
    return <p className="text-center text-red-500">No questions found.</p>;
  }

  return (
    <div className="flex max-w-6xl mx-auto p-6 space-x-6">
      {/* Main content */}
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">Test {testId}</h2>

        {questions.map((q, idx) => (
          <div id={`question-${q.id}`} key={q.id} className="mb-6 scroll-mt-24">
            <p className="font-semibold mb-2">
              {idx + 1}. {q.question}
            </p>
            <ul className="space-y-2">
              {q.options.map((opt, i) => (
                <li key={i}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleAnswer(q.id, opt)}
                    />
                    <span>{opt}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <TestSidebar
        totalQuestions={questions.length}
        onNavigate={handleNavigate}
        answers={answers}
      />
    </div>
  );
}
