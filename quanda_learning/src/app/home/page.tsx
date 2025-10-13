'use client';

import { useState } from "react";
import Sidebar from "@/components/home_page/layout/Sidebar";
import Header from "@/components/Header";
import HeroSection from "@/components/home_page/layout/HeroSection";
import HighlightedCourses from "@/components/home_page/sections/HighlightedCourses";
import Footer from "@/components/Footer";
import Vocabulary from "@/components/skill/Vocabulary";
import GrammarTopics from "@/components/skill/GrammarTopicCard";
import CoursesByLevel from "@/components/course/CoursesByLevel";
import TopicLessons from "@/components/skill/TopicLessons";
import EnglishGrammarGuide from "@/components/skill/grammar/Knowledge";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [selectedCourseLevel, setSelectedCourseLevel] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50 h-16">
        <Header setActiveSection={setActiveSection} />
      </div>

      {/* Main layout */}
      <div className="flex flex-1 pt-16 relative">
        {/* Sidebar */}
        <div className="hidden md:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] z-40 bg-white shadow border-t border-indigo-300">
          <Sidebar
            setActiveSection={setActiveSection}
            setSelectedCourseLevel={setSelectedCourseLevel}
          />
        </div>

        {/* Main content */}
        <main className="w-full md:ml-64 flex-1 bg-gray-50 pt-[41px] transition-all duration-300 ease-in-out">

          {activeSection === "home" && (
            <>
              <HeroSection />
              <HighlightedCourses />
              <Footer />
            </>
          )}

          {activeSection === "course-levels" && selectedCourseLevel && (
            <>
              <CoursesByLevel level={selectedCourseLevel} />
              <Footer />
            </>
          )}

          {activeSection === "vocabulary" && <Vocabulary />}

          {activeSection === "GrammarTopics" && (
            <>
              {selectedLessonId ? (
                <EnglishGrammarGuide
                  typeId={selectedLessonId}
                  onBack={() => setSelectedLessonId(null)}
                />
              ) : selectedTopicId ? (
                <TopicLessons
                  topicId={selectedTopicId}
                  onBack={() => setSelectedTopicId(null)}
                  onStartLearning={(lessonId) => setSelectedLessonId(lessonId)}
                />
              ) : (
                <GrammarTopics onSelectTopic={setSelectedTopicId} />
              )}
              <Footer />
            </>
          )}

        </main>
      </div>
    </div>
  );
}
