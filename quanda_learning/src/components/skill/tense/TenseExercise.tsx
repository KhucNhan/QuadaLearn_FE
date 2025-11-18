"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Question {
  id: number;
  content: string;
  options: string[];
  answerKey: string;
  knowledgeTag: string;
}

interface TenseExerciseProps {
  knowledgeTag: string; // Ví dụ: "Present Simple"
  tenseName: string; // Ví dụ: "Thì hiện tại đơn"
}

export default function TenseExercise({ knowledgeTag, tenseName }: TenseExerciseProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        console.log(`🔍 Fetching questions for tag: ${knowledgeTag}`);

        const res = await fetch(`http://localhost:8888/questions/tag/${encodeURIComponent(knowledgeTag)}`);
        
        if (!res.ok) throw new Error("Failed to fetch questions");

        const data: Question[] = await res.json();
        console.log("✅ Questions received:", data);
        
        // Tráo câu hỏi ngẫu nhiên
        const shuffled = data.sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
      } catch (err) {
        console.error("❌ Error fetching questions:", err);
        setError("Không thể tải câu hỏi. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (knowledgeTag) {
      fetchQuestions();
    }
  }, [knowledgeTag]);

  const handleAnswer = (questionId: number, answer: string) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [questionId]: answer }));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.answerKey) {
        correct++;
      }
    });
    return { correct, total: questions.length };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải câu hỏi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center shadow-lg">
          <i className="fas fa-exclamation-triangle text-red-500 text-5xl mb-4"></i>
          <p className="text-red-600 font-semibold text-xl">{error}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 text-center shadow-lg">
          <i className="fas fa-info-circle text-yellow-500 text-5xl mb-4"></i>
          <p className="text-yellow-700 font-semibold text-xl mb-2">Chưa có câu hỏi</p>
          <p className="text-gray-600">Hiện tại chưa có câu hỏi cho {tenseName}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const { correct, total } = submitted ? calculateScore() : { correct: 0, total: questions.length };
  const percentage = submitted ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-6 mb-8 text-white">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center text-white hover:text-yellow-300 font-medium transition"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Quay lại
        </button>
        <h1 className="text-3xl font-bold mb-2">Bài tập: {tenseName}</h1>
        <p className="text-indigo-100">
          {submitted 
            ? `Kết quả: ${correct}/${total} câu đúng (${percentage}%)`
            : `Hoàn thành ${Object.keys(answers).length}/${total} câu hỏi`
          }
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((question, index) => {
          const userAnswer = answers[question.id];
          const isCorrect = userAnswer === question.answerKey;
          const isAnswered = userAnswer !== undefined;

          return (
            <div
              key={question.id}
              className={`bg-white rounded-xl shadow-md p-6 border-2 transition-all ${
                submitted
                  ? isCorrect
                    ? 'border-green-400 bg-green-50'
                    : isAnswered
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start mb-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-4 ${
                  submitted
                    ? isCorrect
                      ? 'bg-green-500'
                      : isAnswered
                      ? 'bg-red-500'
                      : 'bg-gray-400'
                    : 'bg-indigo-600'
                }`}>
                  {submitted && isAnswered ? (
                    isCorrect ? (
                      <i className="fas fa-check"></i>
                    ) : (
                      <i className="fas fa-times"></i>
                    )
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800 mb-4">
                    {question.content}
                  </p>

                  {/* Options */}
                  <div className="space-y-3">
                    {question.options.map((option, optIndex) => {
                      const isSelected = userAnswer === option;
                      const isCorrectAnswer = option === question.answerKey;
                      
                      let bgColor = 'bg-white hover:bg-gray-50';
                      let borderColor = 'border-gray-300';
                      let textColor = 'text-gray-800';

                      if (submitted) {
                        if (isCorrectAnswer) {
                          bgColor = 'bg-green-100';
                          borderColor = 'border-green-500';
                          textColor = 'text-green-800';
                        } else if (isSelected && !isCorrect) {
                          bgColor = 'bg-red-100';
                          borderColor = 'border-red-500';
                          textColor = 'text-red-800';
                        }
                      } else if (isSelected) {
                        bgColor = 'bg-indigo-100';
                        borderColor = 'border-indigo-500';
                      }

                      return (
                        <label
                          key={optIndex}
                          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${bgColor} ${borderColor} ${
                            submitted ? 'cursor-not-allowed' : 'hover:shadow-md'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option}
                            checked={isSelected}
                            onChange={() => handleAnswer(question.id, option)}
                            disabled={submitted}
                            className="w-5 h-5 text-indigo-600 mr-3"
                          />
                          <span className={`flex-1 font-medium ${textColor}`}>
                            {option}
                          </span>
                          {submitted && isCorrectAnswer && (
                            <i className="fas fa-check-circle text-green-600 text-xl ml-2"></i>
                          )}
                          {submitted && isSelected && !isCorrect && (
                            <i className="fas fa-times-circle text-red-600 text-xl ml-2"></i>
                          )}
                        </label>
                      );
                    })}
                  </div>

                  {/* Show correct answer if wrong */}
                  {submitted && !isCorrect && isAnswered && (
                    <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 rounded">
                      <p className="text-green-800 font-medium">
                        <i className="fas fa-lightbulb mr-2"></i>
                        Đáp án đúng: <strong>{question.answerKey}</strong>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length === 0}
            className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 ${
              Object.keys(answers).length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
            }`}
          >
            <i className="fas fa-check-circle mr-2"></i>
            Kiểm tra đáp án
          </button>
        </div>
      )}

      {/* Result Summary */}
      {submitted && (
        <div className={`mt-8 p-6 rounded-2xl shadow-xl ${
          percentage >= 80 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
          percentage >= 50 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
          'bg-gradient-to-r from-red-400 to-pink-500'
        }`}>
          <div className="text-white text-center">
            <i className={`fas ${percentage >= 80 ? 'fa-trophy' : percentage >= 50 ? 'fa-medal' : 'fa-redo'} text-6xl mb-4`}></i>
            <h2 className="text-3xl font-bold mb-2">
              {percentage >= 80 ? 'Xuất sắc!' : percentage >= 50 ? 'Khá tốt!' : 'Cố gắng thêm!'}
            </h2>
            <p className="text-xl mb-4">
              Bạn trả lời đúng {correct}/{total} câu ({percentage}%)
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                  setQuestions(prev => [...prev].sort(() => Math.random() - 0.5));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition"
              >
                <i className="fas fa-redo mr-2"></i>
                Làm lại
              </button>
              <button
                onClick={() => router.back()}
                className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 transition"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Quay lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
