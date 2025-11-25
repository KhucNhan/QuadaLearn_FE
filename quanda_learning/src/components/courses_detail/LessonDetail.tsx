"use client";
import { useEffect, useState } from "react";
import { getKnowledgeByLessonId, getExamplesByDetailId } from "../../lib/grammar/KnowledgeAPI";

export default function LessonDetail({ lessonId, onBack }: { lessonId: number; onBack: () => void }) {
  const [knowledgeData, setKnowledgeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const knowledgeList = await getKnowledgeByLessonId(lessonId);

        const fullData = await Promise.all(
          knowledgeList.map(async (k: any) => {
            const examples = await getExamplesByDetailId(k.id).catch(() => []);
            return { ...k, examples };
          })
        );

        setKnowledgeData(fullData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [lessonId]);

  if (loading) return <p className="text-center text-gray-500">⏳ Đang tải nội dung...</p>;

  return (
    <div className="p-6">
      <button onClick={onBack} className="text-blue-500 underline mb-4">⬅ Quay lại</button>
      <h1 className="text-2xl font-bold mb-4">Nội dung bài học</h1>

      {knowledgeData.length === 0 ? (
        <p className="text-gray-600 italic">⚠ Nội dung đang được cập nhật.</p>
      ) : (
        knowledgeData.map((k) => (
          <div key={k.id} className="border rounded-lg p-4 shadow mb-4 bg-white">
            <h2 className="font-semibold text-xl text-gray-900">{k.title}</h2>
            <p className="mt-2 text-gray-700">{k.description}</p>

            {k.structure && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg">📌 Cấu trúc:</h3>
                <p className="bg-gray-100 p-3 rounded text-gray-800">{k.structure}</p>
              </div>
            )}

            {k.howToUse && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg">🛠 Cách dùng:</h3>
                <p className="bg-gray-100 p-3 rounded text-gray-800">{k.howToUse}</p>
              </div>
            )}

            {k.examples?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-lg">📝 Ví dụ:</h3>
                <ul className="bg-gray-50 p-3 rounded-lg space-y-2">
                  {k.examples.map((ex: any) => (
                    <li key={ex.id} className="border-b pb-2">
                      <p className="font-medium text-gray-900"> {ex.example || ex.sentenceEn}</p>
                      <p className="text-gray-600 italic"> {ex.meaning || ex.sentenceVi}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
