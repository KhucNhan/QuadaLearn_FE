type TestSidebarProps = {
  totalQuestions: number;
  onNavigate: (index: number) => void;
  answers: Record<number, string>;
};

export default function TestSidebar({
  totalQuestions,
  onNavigate,
  answers,
}: TestSidebarProps) {
  return (
    <aside className="w-72 h-screen sticky top-0 bg-white border-l border-gray-200 p-6 flex flex-col">
      {/* Timer */}
      <div className="text-center mb-6">
        <p className="text-lg font-semibold">Time Remaining</p>
        <p className="text-2xl font-bold text-red-600">30:00</p>
      </div>

      {/* Question navigation */}
      <div className="mb-6">
        <p className="text-lg font-semibold mb-3">Questions</p>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: totalQuestions }, (_, i) => {
            const isAnswered = Object.keys(answers).length > 0 && answers[i + 1];
            return (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                className={`w-10 h-10 rounded-full ${
                  isAnswered
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 hover:bg-indigo-500 hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit button */}
      <button className="mt-auto w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700">
        Submit Test
      </button>
    </aside>
  );
}
