"use client";

import TenseExercise from "@/components/skill/tense/TenseExercise";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Mapping tenseId -> knowledgeTag
const TENSE_MAPPING: Record<number, { tag: string; name: string }> = {
  31: { tag: "Present Simple", name: "Thì hiện tại đơn" },
  32: { tag: "Present Continuous", name: "Thì hiện tại tiếp diễn" },
  33: { tag: "Present Perfect", name: "Thì hiện tại hoàn thành" },
  34: { tag: "Present Perfect Continuous", name: "Thì hiện tại hoàn thành tiếp diễn" },
  35: { tag: "Past Simple", name: "Thì quá khứ đơn" },
  36: { tag: "Past Continuous", name: "Thì quá khứ tiếp diễn" },
  37: { tag: "Past Perfect", name: "Thì quá khứ hoàn thành" },
  38: { tag: "Past Perfect Continuous", name: "Thì quá khứ hoàn thành tiếp diễn" },
  39: { tag: "Future Simple", name: "Thì tương lai đơn" },
  40: { tag: "Be Going To", name: "Thì tương lai gần" },
  41: { tag: "Future Continuous", name: "Thì tương lai tiếp diễn" },
  42: { tag: "Future Perfect", name: "Thì tương lai hoàn thành" },
};

export default function ExercisePage() {
  const params = useParams();
  const router = useRouter();
  const tenseId = Number(params.tenseId);
  
  const [tenseInfo, setTenseInfo] = useState<{ tag: string; name: string } | null>(null);

  useEffect(() => {
    const info = TENSE_MAPPING[tenseId];
    if (!info) {
      router.push('/home');
      return;
    }
    setTenseInfo(info);
  }, [tenseId, router]);

  if (!tenseInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return <TenseExercise knowledgeTag={tenseInfo.tag} tenseName={tenseInfo.name} />;
}
