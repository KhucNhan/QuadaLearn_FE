// src/utils/api.ts

const API_BASE_URL = "http://localhost:8888";

/**
 * Lấy auth token từ localStorage
 */
export function getAuthToken(): string | null {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  
  try {
    const user = JSON.parse(userStr);
    return user?.token || null;
  } catch {
    return null;
  }
}

/**
 * Tạo headers với auth token
 */
export function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  return headers;
}

/**
 * Fetch với auth tự động
 */
export async function fetchWithAuth(
  endpoint: string,
  options?: RequestInit
): Promise<Response> {
  const token = getAuthToken();
  
  if (!token) {
    alert("Bạn cần đăng nhập để tiếp tục.");
    window.location.href = "/authenticate/login";
    throw new Error("No auth token found");
  }
  
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options?.headers,
    },
  });
  
  // Auto logout nếu token hết hạn
  if (response.status === 401) {
    localStorage.removeItem("user");
    window.location.href = "/authenticate/login";
    alert("Session expired. Please login again.");
  }
  
  return response;
}
