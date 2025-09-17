

export interface VocabularyItem {
  id: number;
  word: string;
  transcription: string;
  meaning: string;
  exampleSentence: string;
  level: string;
  topic: string;
  imageUrl?: string;
}

export async function fetchVocabularies(): Promise<VocabularyItem[]> {
  try {
    const token = localStorage.getItem("accessToken");


    const response = await fetch("http://localhost:8888/vocabularies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`Lỗi API: ${response.status} - ${text}`);
      throw new Error("Không thể lấy dữ liệu từ vựng");
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi fetch từ vựng:", error);
    return [];
  }
}
