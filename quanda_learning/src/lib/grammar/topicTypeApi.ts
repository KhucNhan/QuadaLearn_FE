// lib/api/topicTypeApi.ts

export interface TopicType {
  id: number;
  title: string;
  description: string;
  level: string;
  image: string;
  topic_id: number;
}

const API_URL = 'http://localhost:8888/topic-types';

export const getTypesByTopicId = async (
  topicId: number,
  token: string
): Promise<TopicType[]> => {
  const response = await fetch(`${API_URL}/by-topic/${topicId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Lỗi khi gọi API: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data as TopicType[];
};
