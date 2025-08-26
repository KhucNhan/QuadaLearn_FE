export default function Features() {
  const features = [
    {
      title: "Phân Tích Trình Độ",
      desc: "AI đánh giá chính xác năng lực hiện tại của bạn để xây dựng lộ trình học phù hợp.",
      img: "https://storage.googleapis.com/a1aa/image/fc053232-5807-4bec-58e6-46cce9082c20.jpg",
    },
    {
      title: "Tạo Bài Tập Cá Nhân",
      desc: "Bài tập được thiết kế riêng dựa trên điểm mạnh và điểm yếu của bạn.",
      img: "https://storage.googleapis.com/a1aa/image/9527817d-1af7-47f8-87ae-836c4652eb70.jpg",
    },
    {
      title: "Phản Hồi Năng Lực",
      desc: "Nhận phản hồi chi tiết và đề xuất cải thiện sau mỗi bài kiểm tra.",
      img: "https://storage.googleapis.com/a1aa/image/ee4814c8-e5e8-4a71-e15d-14543355f8b0.jpg",
    },
  ];

  return (
    <section id="tinh-nang" className="bg-white rounded-lg shadow-lg p-10 max-w-5xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-indigo-600 text-center">
        Tính Năng Tích Hợp AI
      </h2>
      <p className="text-center text-gray-700 max-w-3xl mx-auto text-lg">
        Công nghệ AI giúp cá nhân hóa lộ trình học, phân tích điểm mạnh và điểm yếu, 
        và cung cấp bài tập phù hợp với trình độ của bạn.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map((f, i) => (
          <div key={i} className="space-y-4">
            <img src={f.img} alt={f.title} className="mx-auto h-28 w-28 object-contain" />
            <h3 className="text-xl font-semibold text-indigo-700">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
