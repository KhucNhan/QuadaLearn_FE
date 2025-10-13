"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Courses from "@/components/sections/Courses";
import Features from "@/components/sections/Features";
import TestForm from "@/components/sections/TestForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const scrollToId = searchParams.get("scrollTo");
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [searchParams]);

  return (
    <>
      <Header setActiveSection={setActiveSection} />
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        <section id="hero">
          <Hero />
        </section>

        <section id="courses">
          <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">
            Các khóa học phổ biến nhất
          </h2>
          <Courses />
        </section>

        <section id="featureAI">
          <Features />
        </section>

        <section id="capacityTest">
          <TestForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
