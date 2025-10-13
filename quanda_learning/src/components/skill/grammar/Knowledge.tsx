'use client';

import { useEffect, useState } from 'react';
import '../../../styles/grammar/knowledge.css';
import { getKnowledgeByTypeId, getExamplesByDetailId } from '@/lib/grammar/KnowledgeAPI';

interface Props {
  typeId: number;
  onBack: () => void;
}


export default function EnglishGrammarGuide({ typeId, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'Grammar' | 'Example'>('Grammar');
  const [grammars, setGrammars] = useState([]);
  const [examples, setExamples] = useState([]);

  useEffect(() => {
    if (activeTab === 'Grammar') {
      getKnowledgeByTypeId(typeId).then(setGrammars);
    } else {
      getExamplesByDetailId(typeId).then(setExamples);
    }
  }, [activeTab, typeId]);

  return (
    <div className="grammar-container">
      <button onClick={onBack} className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        ← Quay lại
      </button>

      <nav className="grammar-tabs">
        <button
          className={`grammar-tab-btn ${activeTab === 'Grammar' ? 'active' : ''}`}
          onClick={() => setActiveTab('Grammar')}
        >
          Grammar
        </button>
        <button
          className={`grammar-tab-btn ${activeTab === 'Example' ? 'active' : ''}`}
          onClick={() => setActiveTab('Example')}
        >
          Example
        </button>
      </nav>

      <h3 className="grammar-category-title text-2xl font-bold text-center text-blue-700 dark:text-blue-300 my-4">
        {activeTab === 'Grammar' ? 'Lý thuyết Ngữ pháp' : 'Ví dụ minh họa'}
      </h3>

      <div className="grammar-grid">
        {activeTab === 'Grammar' &&
          grammars.map((g: any) => (
            <GrammarCard
              key={g.id}
              title={g.title}
              desc={g.description}
              how_to_use={g.howToUse}
              examples={[g.structure]}
              mode="grammar"
            />
          ))}
        {activeTab === 'Example' &&
          examples.map((e: any) => (
            <GrammarCard
              key={e.id}
              title={e.note}
              desc={e.sentenceVi}
              examples={[e.sentenceEn]}
              mode="example"
            />
          ))}
      </div>
    </div>
  );
}

function GrammarCard({
  title,
  desc,
  how_to_use,
  examples,
  mode = "grammar", // "grammar" hoặc "example"
}: {
  title: string;
  desc: string;
  how_to_use?: string;
  examples: string[];
  mode?: "grammar" | "example";
}) {
  return (
    <div className="grammar-card p-4 rounded-lg shadow-md bg-white dark:bg-zinc-800 transition-all hover:shadow-lg">
      <div className="grammar-card-header mb-3">
        <h2 className="grammar-card-title text-xl font-bold text-blue-600 dark:text-blue-400">
          {title}
        </h2>
      </div>

      {mode === "grammar" ? (
        <div className="grammar-card-content space-y-4">
          {/* Mô tả */}
          <div className="grammar-section">
            <h3 className="grammar-section-title text-base font-semibold text-gray-700 dark:text-gray-300">
              Mô tả
            </h3>
            <p className="grammar-description text-gray-800 dark:text-gray-100">{desc}</p>
          </div>

          {/* Cách sử dụng */}
          {how_to_use && (
            <div className="grammar-section">
              <h3 className="grammar-section-title text-base font-semibold text-gray-700 dark:text-gray-300">
                Cách sử dụng
              </h3>
              <p className="grammar-description text-gray-800 dark:text-gray-100">{how_to_use}</p>
            </div>
          )}

          {/* Công thức */}
          <div className="grammar-section">
            <h3 className="grammar-section-title text-base font-semibold text-gray-700 dark:text-gray-300">
              Cấu trúc
            </h3>
            <ul className="grammar-example-list list-disc list-inside text-gray-800 dark:text-gray-100">
              {examples.map((ex, idx) => (
                <li key={idx} className="grammar-example-item">
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="example-card space-y-3">
          <div>
            <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">
              Tiếng Anh
            </h3>
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-100">
              {examples.map((ex, idx) => (
                <li key={idx}>{ex}</li>
              ))}
            </ul>
          </div>


          <div>
            <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">
              Nghĩa
            </h3>
            <p className="text-gray-800 dark:text-gray-100">{desc}</p>
          </div>



        </div>
      )}
    </div>
  );
}
