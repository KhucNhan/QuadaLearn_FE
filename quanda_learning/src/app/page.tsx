"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Courses from "@/components/sections/Courses";
import Features from "@/components/sections/Features";
import TestForm from "@/components/sections/TestForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  const searchParams = useSearchParams();

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
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        <section id="hero">
          <Hero />
        </section>

        <section id="courses">
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
