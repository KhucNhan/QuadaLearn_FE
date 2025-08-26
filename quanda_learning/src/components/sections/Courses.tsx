function CourseCard({ title, desc, img }: { title: string; desc: string; img: string }) {
  return (
    <article className="bg-white rounded-lg shadow-md p-6 flex flex-col">
      <img src={img} alt={title} className="rounded-md mb-4 object-cover h-48 w-full" />
      <h3 className="text-xl font-semibold mb-2 text-indigo-700">{title}</h3>
      <p className="text-gray-700 flex-grow">{desc}</p>
      <button className="mt-4 bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition">
        Xem chi tiết
      </button>
    </article>
  );
}

export default function Courses() {
  const courses = [
    { title: "Tiếng Anh Giao Tiếp", desc: "Phát triển kỹ năng nói và nghe để tự tin giao tiếp.", img: "https://storage.googleapis.com/a1aa/image/60b7c9ec-a7c1-429b-a6dd-442da50ea230.jpg" },
    { title: "Ngữ Pháp Tiếng Anh", desc: "Học các quy tắc ngữ pháp cơ bản và nâng cao.", img: "https://storage.googleapis.com/a1aa/image/ec1f0f9c-9b63-4152-66a8-bf0518176afc.jpg" },
    { title: "Từ Vựng Tiếng Anh", desc: "Mở rộng vốn từ vựng theo chủ đề.", img: "https://storage.googleapis.com/a1aa/image/fcdaf0f7-d6d5-4500-1fc4-73759fa7f743.jpg" },
    { title: "Luyện Nghe Tiếng Anh", desc: "Cải thiện khả năng nghe hiểu qua bài tập thực tế.", img: "https://storage.googleapis.com/a1aa/image/963c430c-12cb-4281-3781-d163ae8cae25.jpg" },
    { title: "Viết Tiếng Anh", desc: "Rèn luyện kỹ năng viết từ cơ bản đến nâng cao.", img: "https://storage.googleapis.com/a1aa/image/ddcd6747-786b-41ac-821f-a3ff49bfc5c4.jpg" },
    { title: "Luyện Phát Âm", desc: "Học phát âm chuẩn để tự tin giao tiếp.", img: "https://storage.googleapis.com/a1aa/image/531bc865-e1b1-4880-f72f-99e0c9654471.jpg" },
  ];

  return (
    <section id="khoa-hoc" className="space-y-12">
      <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">Các Khóa Học Phổ Biến</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((c, i) => (
          <CourseCard key={i} {...c} />
        ))}
      </div>
    </section>
  );
}
