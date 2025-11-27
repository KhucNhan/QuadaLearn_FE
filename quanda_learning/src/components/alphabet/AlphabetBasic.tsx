"use client";
import { useEffect } from "react";

const examples: Record<string, { word: string; meaning: string; sentence: string }> = {
  A: { word: "Apple", meaning: "Quả táo", sentence: "I eat an apple every day." },
  B: { word: "Beautiful", meaning: "Đẹp", sentence: "The sunset is beautiful." },
  C: { word: "Computer", meaning: "Máy tính", sentence: "I use a computer for work." },
  D: { word: "Dog", meaning: "Con chó", sentence: "My dog is very friendly." },
  E: { word: "Elephant", meaning: "Con voi", sentence: "An elephant has a long trunk." },
  F: { word: "Friend", meaning: "Bạn bè", sentence: "My friend is coming over." },
  G: { word: "Garden", meaning: "Vườn", sentence: "We have a beautiful garden." },
  H: { word: "Hello", meaning: "Xin chào", sentence: "Hello, how are you?" },
  I: { word: "Island", meaning: "Đảo", sentence: "We visited a tropical island." },
  J: { word: "Jump", meaning: "Nhảy", sentence: "The cat can jump high." },
  K: { word: "King", meaning: "Vua", sentence: "The king rules the kingdom." },
  L: { word: "Love", meaning: "Tình yêu", sentence: "I love my family." },
  M: { word: "Music", meaning: "Âm nhạc", sentence: "I listen to music every day." },
  N: { word: "Nature", meaning: "Thiên nhiên", sentence: "Nature is beautiful." },
  O: { word: "Ocean", meaning: "Đại dương", sentence: "The ocean is vast." },
  P: { word: "Peace", meaning: "Hòa bình", sentence: "We need peace in the world." },
  Q: { word: "Queen", meaning: "Nữ hoàng", sentence: "The queen wears a crown." },
  R: { word: "Rain", meaning: "Mưa", sentence: "It rains a lot here." },
  S: { word: "Sun", meaning: "Mặt trời", sentence: "The sun rises in the east." },
  T: { word: "Tree", meaning: "Cây", sentence: "The tree is tall." },
  U: { word: "Umbrella", meaning: "Ô", sentence: "Take an umbrella if it rains." },
  V: { word: "Victory", meaning: "Chiến thắng", sentence: "We celebrate our victory." },
  W: { word: "Water", meaning: "Nước", sentence: "Drink plenty of water." },
  X: { word: "Xylophone", meaning: "Đàn xilôfon", sentence: "He plays the xylophone." },
  Y: { word: "Yellow", meaning: "Màu vàng", sentence: "The banana is yellow." },
  Z: { word: "Zoo", meaning: "Vườn thú", sentence: "We went to the zoo." },
};

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Alphabet() {

  const speakLetter = (letter: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(letter);
      utterance.lang = "en-US";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Browser không hỗ trợ voice. Vui lòng dùng Chrome!");
    }
  };

  return (
    <div style={styles.body}>
      <header style={styles.header}>
        <h1>🔤 Bảng Chữ Cái Tiếng Anh</h1>
      </header>

      <div style={styles.container}>
        <div style={styles.grid}>
          {letters.map((letter) => {
            const ex = examples[letter];
            return (
              <div
                key={letter}
                style={styles.card}
                onClick={() => (window.location.href = `/vocabulary?letter=${letter}`)}
              >
                <div style={styles.letter}>{letter}</div>

                <button
                  style={styles.button}
                  onClick={(e) => {
                    e.stopPropagation();
                    speakLetter(letter);
                  }}
                >
                  🔊 Nghe
                </button>

                <div style={styles.example}>
                  <p style={styles.word}>{ex.word}</p>
                  <p style={styles.meaning}>{ex.meaning}</p>
                  <p style={styles.sentence}>{ex.sentence}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}



const styles: Record<string, any> = {
  body: {
    background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
    fontFamily: "Roboto, sans-serif",
    minHeight: "100vh",
  },
  header: {
    background: "#1976d2",
    color: "white",
    textAlign: "center",
    padding: "20px",
  },
  container: {
    maxWidth: "1200px",
    margin: "20px auto",
    padding: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.3s",
  },
  letter: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#1976d2",
  },
  button: {
    background: "#4caf50",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "20px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  example: {
    background: "#f9f9f9",
    borderLeft: "4px solid #1976d2",
    borderRadius: "10px",
    padding: "10px",
  },
  word: { fontWeight: "bold", color: "#1976d2" },
  meaning: { color: "#555", fontSize: "14px" },
  sentence: { fontStyle: "italic", color: "#777", fontSize: "14px" },
};
