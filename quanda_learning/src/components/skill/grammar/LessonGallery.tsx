'use client';

import React from 'react';

interface Lesson {
  id: number;
  title: string;
  description: string;
  level: string;
  image: string;
  completed: boolean;
}

interface Props {
  lessons: Lesson[];
  onStartLearning: (lessonId: number) => void;
}

const LessonGallery = ({ lessons, onStartLearning }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br to-mint-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-blue-400 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-2">
            📚 Kiến thức học tập bổ ích
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="group relative bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-pink-200"
            >
              <div className="absolute left-0 top-0 h-full w-4 bg-gradient-to-b from-pink-400 to-purple-500 transform -skew-x-12 group-hover:w-5 transition-all duration-300"></div>
              <div className="relative pt-6 pb-4 px-4">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-48 object-cover rounded-2xl shadow-lg mx-auto block"
                />
              </div>
              <div className="p-6 pt-3 text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-3 line-clamp-1 group-hover:text-pink-600 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2 px-2">
                  {lesson.description}
                </p>
                <div className="flex justify-center items-center gap-1 mb-4">
                  <span className="text-pink-500">📖</span>
                  <span className="text-sm font-medium text-gray-700">{lesson.level}</span>
                </div>
                <button
                  onClick={() => onStartLearning(lesson.id)}
                  className={`w-full px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md ${
                    lesson.completed
                      ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-green-500 hover:to-blue-600'
                      : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600'
                  }`}
                >
                  {lesson.completed ? '📖 Xem lại' : '🚀 Bắt đầu học'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonGallery;
