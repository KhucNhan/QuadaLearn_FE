type QuestionCardProps = {
  number: number;
  question: string;
  options: string[];
};

export default function QuestionCard({ number, question, options }: QuestionCardProps) {
  return (
    <div className="p-4 bg-white rounded-lg shadow mb-6">
      <p className="font-medium mb-3">
        {number}. {question}
      </p>
      {options.map((opt, i) => (
        <label key={i} className="block">
          <input type="radio" name={`q${number}`} className="mr-2" /> {opt}
        </label>
      ))}
    </div>
  );
}
