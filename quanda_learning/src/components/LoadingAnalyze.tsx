import { useEffect, useState, useRef } from "react";

interface LoadingAnalyzeProps {
  feedbackReady: boolean;
  onComplete?: () => void;
}

export default function LoadingAnalyze({
  feedbackReady,
  onComplete,
}: LoadingAnalyzeProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // ✅ Track interval

  const steps = [
    {
      icon: "📝",
      text: "Đang phân tích câu trả lời của bạn...",
      duration: 1500,
    },
    { icon: "🧮", text: "Tính toán điểm số...", duration: 1200 },
    { icon: "📊", text: "Đánh giá trình độ...", duration: 1200 },
    { icon: "🤖", text: "AI đang tạo phản hồi chi tiết...", duration: -1 },
  ];

  useEffect(() => {
    console.log(
      "⚡ useEffect triggered - step:",
      step,
      "feedbackReady:",
      feedbackReady
    );

    // ✅ Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // ✅ Nếu đã success thì dừng
    if (showSuccess) {
      console.log("✅ Already showing success, stopping");
      return;
    }

    // ✅ Bước cuối (step 3): chờ feedback
    if (step === 3) {
      console.log("🤖 At step 3, waiting for feedback...");
      if (feedbackReady) {
        console.log("✅ Feedback ready! Showing success");
        setShowSuccess(true);
        setTimeout(() => {
          onComplete?.();
        }, 1200);
      }
      return;
    }

    // ✅ Nếu vượt quá step 3, force về step 3
    if (step > 3) {
      console.log("⚠️ Step exceeded 3, forcing back to step 3");
      setStep(3);
      return;
    }

    const currentStep = steps[step];
    console.log(`📊 Running step ${step}: ${currentStep.text}`);

    // ✅ Các bước thường (0, 1, 2): chạy progress bar
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          const nextStep = step + 1;
          console.log(`✅ Step ${step} completed, moving to step ${nextStep}`);
          setTimeout(() => {
            setStep(nextStep);
            setProgress(0);
          }, 200);
          return 100;
        }
        return prev + 100 / (currentStep.duration / 50);
      });
    }, 50);

    return () => {
      console.log(`🧹 Cleaning up step ${step}`);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [step, feedbackReady, showSuccess, onComplete]);

  const currentStep = steps[step] || steps[steps.length - 1];
  const isLastStep = step === 3; // ✅ FIX: Hardcode index cuối cùng

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in">
        {/* Icon Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {showSuccess ? (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center animate-scale-in">
                <svg
                  className="w-16 h-16 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="checkmark-path"
                    d="M5 13l4 4L19 7"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : (
              <>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center animate-pulse-slow">
                  {isLastStep ? (
                    // ✅ Spinner cho step cuối
                    <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    // Emoji cho các step khác
                    <span className="text-5xl animate-bounce-subtle">
                      {currentStep.icon}
                    </span>
                  )}
                </div>

                {/* Ring xoay chỉ hiện ở các step không phải cuối */}
                {!isLastStep && (
                  <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 border-r-purple-600 border-b-pink-600 border-l-blue-600 animate-spin-slow"></div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Step Text */}
        <h3 className="text-xl font-bold text-center text-gray-800 mb-6 animate-fade-in">
          {showSuccess ? "Hoàn thành! 🎉" : currentStep.text}
        </h3>

        {/* Progress Bar - ẨN ở step cuối */}
        {!showSuccess && !isLastStep && (
          <div className="mb-4">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              {Math.round(progress)}%
            </p>
          </div>
        )}

        {/* Step Indicators */}
        {!showSuccess && (
          <div className="flex justify-center space-x-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index < step
                    ? "w-8 bg-gradient-to-r from-indigo-600 to-purple-600"
                    : index === step
                    ? "w-12 bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}

        {/* Fun Facts */}
        {!showSuccess && (
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
            <p className="text-sm text-gray-700 text-center italic">
              <span className="font-semibold text-indigo-600">💡 Mẹo:</span>{" "}
              {step === 0 &&
                "Học đều đặn mỗi ngày 30 phút hiệu quả hơn học dồn!"}
              {step === 1 &&
                "Luyện nghe và nói song song sẽ cải thiện phát âm!"}
              {step === 2 && "Đọc sách tiếng Anh giúp mở rộng vốn từ vựng!"}
              {step >= 3 && "Thực hành với người bản xứ là cách học tốt nhất!"}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .checkmark-path {
          stroke-dasharray: 48; /* tổng chiều dài path */
          stroke-dashoffset: 48; /* bắt đầu ẩn toàn bộ */
          animation: dash 0.7s ease-out forwards;
        }

        @keyframes dash {
          to {
            stroke-dashoffset: 0; /* hiện ra toàn bộ nét */
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 20px rgba(99, 102, 241, 0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes check-draw {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-check-draw {
          animation: check-draw 0.5s ease-out forwards;
        }

        .check-path {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }
      `}</style>
    </div>
  );
}
