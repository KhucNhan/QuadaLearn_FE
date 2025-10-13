// lib/api/grammarTopicApi.ts

export interface GrammarTopic {
  id: number
  name: string
  description: string
  image: string
}

const API_URL = 'http://localhost:8888/grammar-topics'

export const getAllGrammarTopics = async (token: string): Promise<GrammarTopic[]> => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Lỗi khi gọi API: ${response.status} - ${response.statusText}`)
  }

  const data = await response.json()
  return data as GrammarTopic[]
}
