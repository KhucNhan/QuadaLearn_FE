'use client'

import React, { useEffect, useState } from 'react'
import LessonGallery from '@/components/skill/grammar/LessonGallery'
import { TopicType } from '@/lib/grammar/topicTypeApi'

interface Lesson extends TopicType {
  completed: boolean
}

interface Props {
  topicId: number;
  onBack: () => void;
  onStartLearning: (lessonId: number) => void;
}


const TopicLessons = ({ topicId, onBack, onStartLearning }: Props) => {
  const [lessons, setLessons] = useState<Lesson[]>([])

  useEffect(() => {
    const storedData = localStorage.getItem(`lessons_topic_${topicId}`)
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData)
        setLessons(parsed)
      } catch (err) {
        console.error('Lỗi khi parse dữ liệu bài học:', err)
      }
    }
  }, [topicId])

  return (
    <div className="grammar-container">
      <button onClick={onBack} className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        ← Quay lại
      </button>
      <LessonGallery lessons={lessons} onStartLearning={onStartLearning} />
    </div>
  );
};

export default TopicLessons
