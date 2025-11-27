"use client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface SidebarProps {
  setActiveSection: (section: string) => void;
  setSelectedCourseLevel: (level: string | null) => void;
  setSelectedTense: (tenseId: number) => void; // Thêm prop để set thì được chọn
  setSelectedHistoryId: (historyId: number | null) => void; // Thêm prop để set lịch sử được chọn
}

export default function Sidebar({
  setActiveSection,
  setSelectedCourseLevel,
  setSelectedTense,
  setSelectedHistoryId,
}: SidebarProps) {
  const [openCourse, setOpenCourse] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);
  const [openBasic, setOpenBasic] = useState(false);
  const [openIntermediate, setOpenIntermediate] = useState(false);
  const [openAdvanced, setOpenAdvanced] = useState(false);
  const [openExercises, setOpenExercises] = useState(false); // Thêm state cho Bài tập & Quiz

  const router = useRouter();

  // 12 thì tiếng Anh với ID thực tế trong database
  const tenses = [
    { id: 31, name: "Hiện tại đơn" },
    { id: 32, name: "Hiện tại tiếp diễn" },
    { id: 33, name: "Hiện tại hoàn thành" },
    { id: 34, name: "Hiện tại hoàn thành tiếp diễn" },
    { id: 35, name: "Quá khứ đơn" },
    { id: 36, name: "Quá khứ tiếp diễn" },
    { id: 37, name: "Quá khứ hoàn thành" },
    { id: 38, name: "Quá khứ hoàn thành tiếp diễn" },
    { id: 39, name: "Tương lai đơn" },
    { id: 40, name: "Tương lai gần (Be Going To)" },
    { id: 41, name: "Tương lai tiếp diễn" },
    { id: 42, name: "Tương lai hoàn thành" },
  ];

  return (
    <aside className="pt-[41px] w-64 h-screen fixed top-16 left-0 bg-gradient-to-b from-blue-600 via-green-500 to-teal-400 shadow-2xl border-r border-white/20 text-white z-40">
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
            <i
              className={`fas fa-chevron-${openCourse ? "down" : "right"}`}
            ></i>
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
                  <i
                    className={`fas fa-chevron-${openBasic ? "down" : "right"}`}
                  ></i>
                </button>
                {openBasic && (
                  <div className="ml-5 mt-1 space-y-1">
                    <a
                      href="#"
                      onClick={() => {
                        setActiveSection("course-levels");
                        setSelectedCourseLevel("A1");
                      }}
                      className="block hover:text-yellow-300"
                    >
                      A1 – Beginner
                    </a>
                    <a
                      href="#"
                      onClick={() => {
                        setActiveSection("course-levels");
                        setSelectedCourseLevel("A2");
                      }}
                      className="block hover:text-yellow-300"
                    >
                      A2 – Elementary
                    </a>
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
                  <i
                    className={`fas fa-chevron-${
                      openIntermediate ? "down" : "right"
                    }`}
                  ></i>
                </button>
                {openIntermediate && (
                  <div className="ml-5 mt-1 space-y-1">
                    <a
                      href="#"
                      onClick={() => {
                        setActiveSection("course-levels");
                        setSelectedCourseLevel("B1");
                      }}
                      className="block hover:text-yellow-300"
                    >
                      B1 – Intermediate
                    </a>
                    <a
                      href="#"
                      onClick={() => {
                        setActiveSection("course-levels");
                        setSelectedCourseLevel("B2");
                      }}
                      className="block hover:text-yellow-300"
                    >
                      B2 – Upper-Intermediate
                    </a>
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
                  <i
                    className={`fas fa-chevron-${
                      openAdvanced ? "down" : "right"
                    }`}
                  ></i>
                </button>
                {openAdvanced && (
                  <div className="ml-5 mt-1 space-y-1">
                    <a
                      href="#"
                      onClick={() => {
                        setActiveSection("course-levels");
                        setSelectedCourseLevel("C1");
                      }}
                      className="block hover:text-yellow-300"
                    >
                      C1 – Advanced
                    </a>
                    <a
                      href="#"
                      onClick={() => {
                        setActiveSection("course-levels");
                        setSelectedCourseLevel("C2");
                      }}
                      className="block hover:text-yellow-300"
                    >
                      C2 – Proficient
                    </a>
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
            <span>Kiến thức</span>
            <i
              className={`fas fa-chevron-${
                openSkills ? "down" : "right"
              } ml-auto`}
            ></i>
          </button>

          {openSkills && (
            <div className="ml-8 mt-2 space-y-2 text-white text-base font-medium">
              <button
                onClick={() => setActiveSection("vocabulary")}
                className="block text-left w-full hover:text-yellow-300 text-lg"
              >
                • Từ vựng
              </button>
              <button
                onClick={() => setActiveSection("GrammarTopics")}
                className="block text-left w-full hover:text-yellow-300 text-lg"
              >
                • Ngữ pháp
              </button>
              <button
                onClick={() => setActiveSection("reading")}
                className="block text-left w-full hover:text-yellow-300 text-lg"
              >
                • Đọc hiểu
              </button>
            </div>
          )}
        </div>

        {/* Bài tập & Quiz - Dropdown với 12 thì */}
        <div>
          <button
            onClick={() => setOpenExercises(!openExercises)}
            className="flex w-full items-center justify-between px-4 py-3 rounded-md text-lg font-semibold hover:bg-yellow-400 hover:text-indigo-900 transition-all"
          >
            <div className="flex items-center space-x-3">
              <i className="fas fa-pencil-alt w-5"></i>
              <span>Bài tập & Quiz</span>
            </div>
            <i
              className={`fas fa-chevron-${openExercises ? "down" : "right"}`}
            ></i>
          </button>

          {openExercises && (
            <div className="ml-8 mt-2 space-y-2 text-white text-base font-medium">
              {tenses.map((tense, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveSection("tense-detail");
                    setSelectedTense(tense.id); // Truyền tenseId (1-12)
                  }}
                  className="block text-left w-full hover:text-yellow-300"
                >
                  • {tense.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Kiểm tra trình độ */}
        <Link
          href="/test/level_test"
          className="text-lg flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-indigo-900 transition-all"
        >
          <i className="fas fa-tasks w-5"></i>
          <span>Kiểm tra trình độ</span>
        </Link>

        {/* Lịch sử học tập */}
        <button
          onClick={() => {
            setSelectedHistoryId(null); // reset detail
            setActiveSection("test-history");
          }}
          className="text-lg flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-indigo-900 transition-all"
        >
          <i className="fas fa-history w-5"></i>
          <span>Lịch sử học tập</span>
        </button>
      </nav>
    </aside>
  );
}
