"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";

export default function Sidebar() {
    const [openCourse, setOpenCourse] = useState(false);
    const [openSkills, setOpenSkills] = useState(false);
    const [openBasic, setOpenBasic] = useState(false);
    const [openIntermediate, setOpenIntermediate] = useState(false);
    const [openAdvanced, setOpenAdvanced] = useState(false);


    return (
        <aside className="pt-[41px] w-64 h-screen fixed top-16 left-0 bg-gradient-to-b from-blue-600 via-green-500 to-teal-400 shadow-2xl border-r border-white/20 text-white z-40">
            <div className="p-6 border-b border-white/20">
                <h2 className="text-2xl font-bold tracking-wide">📘 DANH MỤC</h2>
            </div>

            <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100%-4rem)] text-sm font-medium">


                <div>
                    {/* Khóa học - Dropdown chính */}
                    <button
                        onClick={() => setOpenCourse(!openCourse)}
                        className="flex w-full items-center justify-between px-4 py-3 rounded-md text-lg font-semibold hover:bg-yellow-400 hover:text-indigo-900 transition-all"
                    >
                        <div className="flex items-center space-x-3">
                            <i className="fas fa-chalkboard-teacher w-5"></i>
                            <span>Khóa học</span>
                        </div>
                        <i className={`fas fa-chevron-${openCourse ? "down" : "right"}`}></i>
                    </button>

                    {openCourse && (
                        <div className="ml-4 mt-2 space-y-4 text-base text-white font-medium">
                            {/* Cơ bản */}
                            <div>
                                <button
                                    onClick={() => setOpenBasic(!openBasic)}
                                    className="flex w-full justify-between items-center px-2 py-1 text-lg font-semibold hover:text-yellow-300"
                                >
                                    <span>• Cơ bản</span>
                                    <i className={`fas fa-chevron-${openBasic ? "down" : "right"}`}></i>
                                </button>
                                {openBasic && (
                                    <div className="ml-5 mt-1 space-y-1">
                                        <a href="#A1" className="block hover:text-yellow-300">A1 – Beginner</a>
                                        <a href="#A2" className="block hover:text-yellow-300">A2 – Elementary</a>
                                    </div>
                                )}
                            </div>

                            {/* Trung cấp */}
                            <div>
                                <button
                                    onClick={() => setOpenIntermediate(!openIntermediate)}
                                    className="flex w-full justify-between items-center px-2 py-1 text-lg font-semibold hover:text-yellow-300"
                                >
                                    <span>• Trung cấp</span>
                                    <i className={`fas fa-chevron-${openIntermediate ? "down" : "right"}`}></i>
                                </button>
                                {openIntermediate && (
                                    <div className="ml-5 mt-1 space-y-1">
                                        <a href="#B1" className="block hover:text-yellow-300">B1 – Intermediate</a>
                                        <a href="#B2" className="block hover:text-yellow-300">B2 – Upper-Intermediate</a>
                                    </div>
                                )}
                            </div>

                            {/* Nâng cao */}
                            <div>
                                <button
                                    onClick={() => setOpenAdvanced(!openAdvanced)}
                                    className="flex w-full justify-between items-center px-2 py-1 text-lg font-semibold hover:text-yellow-300"
                                >
                                    <span>• Nâng cao</span>
                                    <i className={`fas fa-chevron-${openAdvanced ? "down" : "right"}`}></i>
                                </button>
                                {openAdvanced && (
                                    <div className="ml-5 mt-1 space-y-1">
                                        <a href="#C1" className="block hover:text-yellow-300">C1 – Advanced</a>
                                        <a href="#C2" className="block hover:text-yellow-300">C2 – Proficient</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>


                {/* Kỹ năng - Dropdown */}
                <div>
                    <button
                        onClick={() => setOpenSkills(!openSkills)}
                        className="flex w-full items-center space-x-3 px-4 py-2 rounded-md text-lg font-semibold hover:bg-yellow-400 hover:text-indigo-900 transition-all"
                    >
                        <i className="fas fa-brain w-5"></i>
                        <span>Kỹ năng</span>
                        <i className={`fas fa-chevron-${openSkills ? "down" : "right"} ml-auto`}></i>
                    </button>

                    {openSkills && (
                        <div className="ml-8 mt-2 space-y-2 text-white text-base font-medium">
                            <a href="#vocabulary" className="block hover:text-yellow-300 text-lg">• Từ vựng</a>
                            <a href="#grammar" className="block hover:text-yellow-300 text-lg">• Ngữ pháp</a>
                            <a href="#reading" className="block hover:text-yellow-300 text-lg">• Đọc hiểu</a>
                        </div>
                    )}
                </div>

                {/* Bài tập & Quiz */}
                <a href="#exercises" className="text-lg font-medium flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-indigo-900 transition-all">
                    <i className="fas fa-pencil-alt w-5"></i>
                    <span>Bài tập & Quiz</span>
                </a>

                {/* Kiểm tra trình độ */}
                <a href="#test" className="text-lg flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-indigo-900 transition-all">
                    <i className="fas fa-tasks w-5"></i>
                    <span>Kiểm tra trình độ</span>
                </a>

                {/* Lịch sử học tập */}
                <a href="#history" className="text-lg flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-indigo-900 transition-all">
                    <i className="fas fa-history w-5"></i>
                    <span>Lịch sử học tập</span>
                </a>
            </nav>
        </aside>
    );
}
