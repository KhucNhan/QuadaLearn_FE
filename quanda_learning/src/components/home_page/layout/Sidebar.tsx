"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Sidebar() {
    return (
        <div>
            <aside className="pt-[41px] w-64 h-screen fixed top-16 left-0 bg-gradient-to-b from-blue-600 via-green-500 to-teal-400 shadow-2xl border-r border-white/20 text-white z-40">

                <div className="p-6 border-b border-white/20">
                    <h2 className="text-2xl font-bold tracking-wide">📘 DANH MỤC</h2>
                </div>

                <nav className="p-4 space-y-3 overflow-y-auto h-[calc(100%-4rem)]">
                    {[
                        { id: "courses", label: "Khóa học nổi bật", icon: "fa-star" },
                        { id: "A1", label: "Trình độ A1", icon: "fa-seedling" },
                        { id: "A2", label: "Trình độ A2", icon: "fa-leaf" },
                        { id: "B1", label: "Trình độ B1", icon: "fa-book" },
                        { id: "B2", label: "Trình độ B2", icon: "fa-graduation-cap" },
                        { id: "C1", label: "Trình độ C1", icon: "fa-award" },
                        { id: "C2", label: "Trình độ C2", icon: "fa-crown" },
                    ].map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-indigo-900 transition-all duration-200 font-medium"
                        >
                            <i className={`fas ${item.icon} w-5`}></i>
                            <span>{item.label}</span>
                        </a>
                    ))}
                </nav>
            </aside>
        </div>
    );
}
