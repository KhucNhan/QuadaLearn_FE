"use client";

import axios from "axios";
import type { User } from "@/lib/types/users";

const BASE_URL = "http://localhost:8888/rest/users"; // ⚠️ Cổng backend Spring Boot, không phải 3001

// Nếu backend yêu cầu JWT:
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

export const userApi = {
  // 🟢 Lấy toàn bộ user
  getAll: async (): Promise<User[]> => {
    const res = await axios.get(BASE_URL, { headers: getAuthHeaders() });
    return res.data;
  },

  // 🟢 Lấy user theo id
  getById: async (id: number): Promise<User> => {
    const res = await axios.get(`${BASE_URL}/${id}`, { headers: getAuthHeaders() });
    return res.data;
  },

  // 🟢 Tạo mới user
  create: async (data: Partial<User>, file?: File) => {
    const formData = new FormData();
    formData.append("user", new Blob([JSON.stringify(data)], { type: "application/json" }));
    if (file) formData.append("file", file);

    const res = await axios.post(BASE_URL, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },


  update: async (id: number, data: Partial<User>, file?: File) => {
    const formData = new FormData();
    formData.append("user", new Blob([JSON.stringify(data)], { type: "application/json" }));
    if (file) formData.append("file", file);

    const res = await axios.put(`${BASE_URL}/${id}`, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },


  // 🟢 Xóa user
  delete: async (id: number) => {
    const res = await axios.delete(`${BASE_URL}/${id}`, { headers: getAuthHeaders() });
    return res.data;
  },
};
