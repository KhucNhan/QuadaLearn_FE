import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Courses from "@/components/sections/Courses";

import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        <Hero />
        <Courses />
      </main>
      <Footer />
    </>
  );
}
