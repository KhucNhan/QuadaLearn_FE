"use client";

import React from "react";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const courses = ["Beginner English", "Business English", "Conversational", "Grammar Mastery"];
  const resources = ["Blog", "E-books", "Podcasts", "Webinars"];
  const support = ["Help Center", "Contact Us", "FAQs", "Terms of Service"];
  const community = ["Forums", "Events", "Ambassadors", "Newsletter"];

  const socialIcons = [
    { icon: <FaFacebookF />, link: "#", delay: "0s" },
    { icon: <FaTwitter />, link: "#", delay: "0.2s" },
    { icon: <FaInstagram />, link: "#", delay: "0.4s" },
    { icon: <FaLinkedinIn />, link: "#", delay: "0.6s" },
  ];

  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Left Section: Title + Description + Social Icons */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h2 className="text-3xl font-extrabold tracking-wide drop-shadow-lg">
            English Mastery
          </h2>
          <p className="max-w-sm text-center md:text-left text-indigo-200">
            Empower your English skills with interactive lessons, expert tutors, and real-time feedback.
          </p>
          <div className="flex space-x-6 mt-4">
            {socialIcons.map((s, idx) => (
              <a
                key={idx}
                href={s.link}
                aria-label="social"
                className="text-2xl text-white hover:text-yellow-300 transition-colors duration-300"
                style={{ animation: `bounce 2s ${s.delay} infinite` }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right Section: Grid of Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full max-w-lg text-indigo-200">
          {[
            { title: "Courses", items: courses },
            { title: "Resources", items: resources },
            { title: "Support", items: support },
            { title: "Community", items: community },
          ].map((section, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-lg mb-3 border-b border-indigo-400 pb-1">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-yellow-300 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-indigo-400 pt-6 text-center text-indigo-300 text-sm select-none">
        &copy; 2025 English Mastery. All rights reserved.
      </div>

      {/* Tailwind custom bounce animation */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </footer>
  );
}
