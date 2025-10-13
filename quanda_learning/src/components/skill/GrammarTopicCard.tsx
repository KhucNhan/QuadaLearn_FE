'use client'

import React, { useEffect, useState } from 'react'
import { getAllGrammarTopics, GrammarTopic } from '@/lib/skill/fetchGrammarTopic'
import { getTypesByTopicId, TopicType } from '@/lib/grammar/topicTypeApi'

interface Lesson extends TopicType {
  completed: boolean
}

interface GrammarTopicsProps {
  onSelectTopic: (id: number) => void
}

const GrammarTopicCard = ({
  topic,
  onLearnNow,
}: {
  topic: GrammarTopic
  onLearnNow: (id: number) => void
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden bg-gradient-to-r from-blue-50 via-white to-indigo-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-indigo-100 rounded-xl">
      <div className="flex flex-col lg:flex-row h-full">
        <div className="lg:w-1/3 h-48 lg:h-auto overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200">
          <img
            src={topic.image}
            alt={topic.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="lg:w-2/3 p-6 lg:p-8 flex flex-col justify-between">
          <div className="pb-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 leading-tight">
              {topic.name}
            </h2>
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
              {topic.description}
            </p>
          </div>
          <div className="pt-4 flex justify-end">
            <span
              className="text-sm text-indigo-600 font-semibold hover:underline cursor-pointer transition-colors"
              onClick={() => onLearnNow(topic.id)}
            >
              Học ngay →
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const GrammarTopics = ({ onSelectTopic }: GrammarTopicsProps) => {
  const [topics, setTopics] = useState<GrammarTopic[]>([])
  const [loading, setLoading] = useState(true)

  const handleLearnNow = async (topicId: number) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('Không có token!')
        return
      }

      const topicTypes = await getTypesByTopicId(topicId, token)
      const lessons = topicTypes.map((item) => ({
        ...item,
        completed: false,
      }))

      localStorage.setItem(`lessons_topic_${topicId}`, JSON.stringify(lessons))

      // Thay vì push router, gọi hàm truyền từ props
      onSelectTopic(topicId)
    } catch (err) {
      console.error('Lỗi khi load bài học:', err)
    }
  }

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.error('Không có token!')
          return
        }

        const data = await getAllGrammarTopics(token)
        setTopics(data)
      } catch (error) {
        console.error('Lỗi khi tải chủ đề ngữ pháp:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopics()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 tracking-wide">
            🌟 Chủ Đề Ngữ Pháp 🌟
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Khám phá những <span className="text-indigo-600 font-semibold">chủ đề ngữ pháp</span> cơ bản đến nâng cao để <br className="hidden md:block" />
            <span className="text-pink-600 font-medium">nâng cao kỹ năng tiếng Anh</span> của bạn mỗi ngày!
          </p>
        </div>

        {loading ? (
          <p className="text-center text-lg text-gray-500">Đang tải...</p>
        ) : (
          <div className="space-y-8">
            {topics.map((topic) => (
              <GrammarTopicCard key={topic.id} topic={topic} onLearnNow={handleLearnNow} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GrammarTopics
