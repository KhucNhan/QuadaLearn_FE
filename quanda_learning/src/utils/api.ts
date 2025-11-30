// src/utils/api.ts

const API_BASE_URL = "http://localhost:8888";

/**
 * THÊM MỚI: Check token expired
 */
const isTokenExpired = (token: string): boolean => {
  try {
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    const exp = payload.exp * 1000; // Convert to milliseconds
    return Date.now() > exp;
  } catch (e) {
    console.error('Error checking token expiration:', e);
    return true; // Consider invalid token as expired
  }
};

/**
 * Lấy auth token từ localStorage
 */
export function getAuthToken(): string | null {
  const token = localStorage.getItem("token"); // ✅ Lấy trực tiếp từ "token" key
  
  if (!token) return null;
  
  // ✅ Check expired trước khi trả về
  if (isTokenExpired(token)) {
    console.warn('⚠️ Token expired - clearing auth data');
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return null;
  }
  
  return token;
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
    console.warn('❌ No valid token - redirecting to login');
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/authenticate/login";
    throw new Error("No auth token found or token expired");
  }
  
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  console.log('🌐 API Request:', { url, method: options?.method || 'GET' });
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options?.headers,
    },
  });
  
  // ✅ Auto logout nếu token hết hạn (401 Unauthorized)
  if (response.status === 401) {
    console.error('❌ 401 Unauthorized - clearing auth and redirecting');
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    window.location.href = "/authenticate/login";
    throw new Error("Unauthorized");
  }
  
  return response;
}

/**
 * ✅ THÊM MỚI: Fetch public (không cần auth)
 */
export async function fetchPublic(
  endpoint: string,
  options?: RequestInit
): Promise<Response> {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
}
