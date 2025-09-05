import '../../styles/Features.css';

export default function Features() {
  const features = [
    {
      title: "Phân tích trình độ",
      desc: "AI đánh giá chính xác trình độ hiện tại của bạn để xây dựng lộ trình học tập cá nhân hóa.",
      img: "https://png.pngtree.com/thumb_back/fw800/background/20250711/pngtree-futuristic-ai-cybernetic-portrait-technology-face-image_17608922.webp",
    },
    {
      title: "Phản hồi kết quả",
      desc: "Nhận phản hồi chi tiết và đề xuất cải thiện sau mỗi bài kiểm tra.",
      img: "https://png.pngtree.com/background/20250422/original/pngtree-ai-robot-analyzing-financial-data-in-futuristic-setting-picture-image_16449252.jpg",
    },
  ];

  return (
    <section id="featureAI" className="bg-white rounded-lg shadow-lg p-10 mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-indigo-600 text-center">
        Tính năng tích hợp AI
      </h2>
      <div className="flex flex-col md:flex-row items-start gap-10 max-w-7xl mx-auto px-4 py-12">
        {/* Bên trái: đoạn mô tả AI */}
        <div className="md:w-1/2">
          <img
            id="backgAI"
            src="https://png.pngtree.com/thumb_back/fw800/background/20250506/pngtree-ai-and-technology-shaping-the-future-of-innovation-image_17241997.jpg"
          />

          <p id="descAI" className="text-gray-700 text-lg text-justify">
            Hệ thống học tập sử dụng AI sẽ cá nhân hóa hành trình học của bạn bằng cách phân tích điểm mạnh và điểm yếu, từ đó đưa ra các bài tập phù hợp với trình độ của bạn.
          </p>
        </div>

        {/* Bên phải: danh sách tính năng */}
        <div className="md:w-1/2">
          <div className="grid grid-cols-1 gap-8">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-8">
                {/* Ảnh bên trái */}
                <img
                  id="imageAI"
                  src={f.img}
                  alt={f.title}
                  className="h-28 w-28 flex-shrink-0"
                />

                {/* Tiêu đề và mô tả bên phải */}
                <div>
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">{f.title}</h3>
                  <p id="desc" className="text-gray-600">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
