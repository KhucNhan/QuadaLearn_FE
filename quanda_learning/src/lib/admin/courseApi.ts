"use client";

import axios from "axios";

const BASE_URL = "http://localhost:8888/courses";

// Nếu backend có JWT
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const courseApi = {
  // 🟢 Get all courses
  getAll: async () => {
    const res = await axios.get(BASE_URL, { headers: getAuthHeaders() });
    return res.data;
  },

  // 🟢 Get course by id
  getById: async (id: number) => {
    const res = await axios.get(`${BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  // 🟢 Create course (multipart/form-data)
  create: async (data: any, file?: File) => {
    const form = new FormData();
    form.append(
      "course",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    if (file) form.append("file", file);

    const res = await axios.post(BASE_URL, form, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  // 🟡 Update course
  update: async (id: number, data: any, file?: File) => {
    const form = new FormData();
    form.append(
      "course",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    if (file) form.append("file", file);

    const res = await axios.put(`${BASE_URL}/${id}`, form, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  // 🔴 Delete course
  delete: async (id: number) => {
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },
};
