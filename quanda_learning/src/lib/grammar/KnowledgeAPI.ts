const BASE_URL = 'http://localhost:8888'; // hoặc 8888 nếu đúng cổng backend bạn

// Lấy danh sách knowledge theo typeId
export async function getKnowledgeByTypeId(typeId: number) {
  const res = await fetch(`${BASE_URL}/knowledge/by-type/${typeId}`);
  if (!res.ok) throw new Error('Failed to fetch knowledge');
  return res.json();
}

// Lấy danh sách examples theo detailId
export async function getExamplesByDetailId(detailId: number) {
  const res = await fetch(`${BASE_URL}/grammar-examples/by-detail/${detailId}`);
  if (!res.ok) throw new Error('Failed to fetch examples');
  return res.json();
}


export async function getKnowledgeByLessonId(lessonId: number) {
  const res = await fetch(`${BASE_URL}/knowledge/by-lesson/${lessonId}`);
  if (!res.ok) throw new Error('Failed to fetch knowledge by lessonId');
  return res.json();
}

