import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Courses from "@/components/sections/Courses"
import Footer from "@/components/Footer";
import Features from "@/components/sections/Features";
import TestForm from "@/components/sections/TestForm";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        <Hero />
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-8">
        Các khóa học phổ biến nhất
      </h2>
        <Courses />
        <Features/>
        <TestForm/>
      </main>
      <Footer />
    </>
  );
}
