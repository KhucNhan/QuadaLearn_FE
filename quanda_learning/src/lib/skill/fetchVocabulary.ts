

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
    const token = localStorage.getItem("token");


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


export async function createVocabulary(vocab: VocabularyItem): Promise<VocabularyItem | null> {
  try {
    const response = await fetch("http://localhost:8888/vocabularies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vocab),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`Lỗi API: ${response.status} - ${text}`);
      throw new Error("Không thể thêm từ vựng");
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi thêm từ vựng:", error);
    return null;
  }
}


// Cập nhật từ vựng
export async function updateVocabulary(id: number, vocab: VocabularyItem): Promise<VocabularyItem | null> {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8888/vocabularies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vocab),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`Lỗi API: ${response.status} - ${text}`);
      throw new Error("Không thể cập nhật từ vựng");
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi cập nhật từ vựng:", error);
    return null;
  }
}


