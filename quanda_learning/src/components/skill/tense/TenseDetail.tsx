"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LessonData {
  id: number;
  title: string;
  content: string;
  knowledgeTag?: string;
  courseId?: number;
}

interface TenseDetailProps {
  tenseId: number;
}

// Ví dụ cho 12 thì tiếng Anh (ID từ 19-30)
const TENSE_EXAMPLES: Record<number, Array<{ en: string; vi: string }>> = {
  31: [ // Hiện tại đơn
    { en: "I study English every day.", vi: "Tôi học tiếng Anh mỗi ngày." },
    { en: "She works in a hospital.", vi: "Cô ấy làm việc ở bệnh viện." },
    { en: "They don't like coffee.", vi: "Họ không thích cà phê." },
    { en: "Do you speak Vietnamese?", vi: "Bạn có nói tiếng Việt không?" }
  ],
  32: [ // Hiện tại tiếp diễn
    { en: "I am studying English now.", vi: "Tôi đang học tiếng Anh bây giờ." },
    { en: "She is working on a project.", vi: "Cô ấy đang làm việc với một dự án." },
    { en: "They are not watching TV.", vi: "Họ không đang xem TV." },
    { en: "Are you listening to music?", vi: "Bạn có đang nghe nhạc không?" }
  ],
  33: [ // Hiện tại hoàn thành
    { en: "I have lived here for 5 years.", vi: "Tôi đã sống ở đây được 5 năm." },
    { en: "She has finished her homework.", vi: "Cô ấy đã hoàn thành bài tập về nhà." },
    { en: "They haven't seen that movie.", vi: "Họ chưa xem bộ phim đó." },
    { en: "Have you ever been to Japan?", vi: "Bạn đã từng đến Nhật Bản chưa?" }
  ],
  34: [ // Hiện tại hoàn thành tiếp diễn
    { en: "I have been studying for 3 hours.", vi: "Tôi đã học được 3 tiếng rồi." },
    { en: "She has been working since morning.", vi: "Cô ấy đã làm việc từ sáng." },
    { en: "They haven't been waiting long.", vi: "Họ chưa đợi lâu." },
    { en: "How long have you been learning English?", vi: "Bạn đã học tiếng Anh được bao lâu rồi?" }
  ],
  35: [ // Quá khứ đơn
    { en: "I visited Paris last year.", vi: "Tôi đã đến Paris năm ngoái." },
    { en: "She worked here in 2020.", vi: "Cô ấy đã làm việc ở đây năm 2020." },
    { en: "They didn't go to the party.", vi: "Họ đã không đi dự tiệc." },
    { en: "Did you see him yesterday?", vi: "Bạn có gặp anh ấy hôm qua không?" }
  ],
  36: [ // Quá khứ tiếp diễn
    { en: "I was sleeping at 10 PM.", vi: "Tôi đang ngủ lúc 10 giờ tối." },
    { en: "She was cooking when I called.", vi: "Cô ấy đang nấu ăn khi tôi gọi." },
    { en: "They weren't studying yesterday.", vi: "Họ không học hôm qua." },
    { en: "Were you working at that time?", vi: "Bạn có đang làm việc lúc đó không?" }
  ],
  37: [ // Quá khứ hoàn thành
    { en: "I had finished before she arrived.", vi: "Tôi đã hoàn thành trước khi cô ấy đến." },
    { en: "She had left when I got there.", vi: "Cô ấy đã rời đi khi tôi đến đó." },
    { en: "They hadn't eaten dinner yet.", vi: "Họ vẫn chưa ăn tối." },
    { en: "Had you met him before?", vi: "Bạn đã gặp anh ấy trước đó chưa?" }
  ],
  38: [ // Quá khứ hoàn thành tiếp diễn
    { en: "I had been waiting for 2 hours.", vi: "Tôi đã đợi được 2 tiếng đồng hồ." },
    { en: "She had been working all day.", vi: "Cô ấy đã làm việc cả ngày." },
    { en: "They hadn't been studying hard.", vi: "Họ đã không học chăm chỉ." },
    { en: "How long had you been living there?", vi: "Bạn đã sống ở đó được bao lâu?" }
  ],
  39: [ // Tương lai đơn
    { en: "I will visit you tomorrow.", vi: "Tôi sẽ đến thăm bạn vào ngày mai." },
    { en: "She will finish it soon.", vi: "Cô ấy sẽ hoàn thành nó sớm." },
    { en: "They won't come to the meeting.", vi: "Họ sẽ không đến cuộc họp." },
    { en: "Will you help me?", vi: "Bạn sẽ giúp tôi chứ?" }
  ],
  40: [ // Tương lai gần (Be Going To)
    { en: "I am going to study abroad.", vi: "Tôi sắp đi du học." },
    { en: "She is going to buy a new car.", vi: "Cô ấy sắp mua xe mới." },
    { en: "They aren't going to attend.", vi: "Họ sẽ không tham dự." },
    { en: "Are you going to join us?", vi: "Bạn sẽ tham gia với chúng tôi chứ?" }
  ],
  41: [ // Tương lai tiếp diễn
    { en: "I will be studying at 8 PM.", vi: "Tôi sẽ đang học lúc 8 giờ tối." },
    { en: "She will be working tomorrow.", vi: "Cô ấy sẽ đang làm việc vào ngày mai." },
    { en: "They won't be attending the class.", vi: "Họ sẽ không tham dự lớp học." },
    { en: "Will you be using the computer?", vi: "Bạn sẽ đang dùng máy tính chứ?" }
  ],
  42: [ // Tương lai hoàn thành
    { en: "I will have finished by noon.", vi: "Tôi sẽ hoàn thành trước buổi trưa." },
    { en: "She will have left before you arrive.", vi: "Cô ấy sẽ đã rời đi trước khi bạn đến." },
    { en: "They won't have completed it yet.", vi: "Họ sẽ vẫn chưa hoàn thành nó." },
    { en: "Will you have graduated by then?", vi: "Bạn sẽ đã tốt nghiệp vào lúc đó chưa?" }
  ]
};

export default function TenseDetail({ tenseId }: TenseDetailProps) {
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLessonDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`🔍 Fetching lesson with ID: ${tenseId}`);
        
        // Lấy token từ localStorage (nếu có)
        const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
        
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
          console.log('🔑 Token found, adding to request');
        } else {
          console.warn('⚠️ No token found in localStorage');
        }
        
        const res = await fetch(`http://localhost:8888/lessons/${tenseId}`, {
          method: 'GET',
          headers: headers,
        });
        
        console.log(`📡 Response status: ${res.status}`);
        
        if (!res.ok) {
          const errorText = await res.text();
          console.error(`❌ API Error: ${res.status} - ${errorText}`);
          
          if (res.status === 401) {
            throw new Error("Bạn cần đăng nhập để xem nội dung này");
          }
          
          throw new Error(`Không thể tải bài học (Status: ${res.status})`);
        }

        const data: LessonData = await res.json();
        console.log("✅ Lesson data received:", data);
        
        if (!data || !data.title) {
          throw new Error("Dữ liệu bài học không hợp lệ");
        }
        
        setLesson(data);
      } catch (err: unknown) {
        console.error("❌ Error fetching lesson:", err);
        const errorMessage = err instanceof Error ? err.message : "Không thể tải dữ liệu. Vui lòng thử lại sau.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (tenseId) {
      fetchLessonDetail();
    }
  }, [tenseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center shadow-lg">
          <i className="fas fa-exclamation-triangle text-red-500 text-5xl mb-4"></i>
          <p className="text-red-600 font-semibold text-xl">{error || "Không tìm thấy dữ liệu"}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // Lấy ví dụ tương ứng với tenseId
  const examples = TENSE_EXAMPLES[tenseId] || TENSE_EXAMPLES[1];

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      {/* Header với gradient */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <i className="fas fa-clock text-4xl mr-4"></i>
            <div>
              <h1 className="text-4xl font-bold">{lesson.title}</h1>
              <p className="text-indigo-100 mt-2">Tìm hiểu cấu trúc và cách sử dụng</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung giải thích */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center mb-6 pb-4 border-b-2 border-indigo-100">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
            <i className="fas fa-book text-white text-xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Giải thích chi tiết</h2>
        </div>
        
        <div 
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />
      </div>

      {/* Ví dụ minh họa */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center mb-6 pb-4 border-b-2 border-yellow-100">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-4">
            <i className="fas fa-lightbulb text-white text-xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Ví dụ minh họa</h2>
        </div>
        
        <div className="space-y-4">
          {examples.map((example, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 border-l-4 border-indigo-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4 shadow-md">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium text-lg mb-2">{example.en}</p>
                  <p className="text-gray-600 italic flex items-center">
                    <i className="fas fa-language text-indigo-500 mr-2"></i>
                    {example.vi}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action - Làm bài tập */}
      <div className="bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/4 -translate-x-1/4"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3 flex items-center">
              <i className="fas fa-rocket mr-3"></i>
              Sẵn sàng luyện tập?
            </h3>
            <p className="text-green-50 text-lg">
              Hoàn thành các bài tập để củng cố kiến thức về <strong>{lesson.title}</strong>
            </p>
            <div className="mt-4 flex items-center space-x-4 text-green-100">
              <div className="flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                <span>20+ câu hỏi</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-trophy mr-2"></i>
                <span>Kiểm tra ngay</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => router.push(`/exercises/tense/${tenseId}`)}
            className="group px-8 py-4 bg-white text-green-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
          >
            <i className="fas fa-pencil-alt text-xl"></i>
            <span className="text-lg">Làm bài tập ngay</span>
            <i className="fas fa-arrow-right text-xl group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
