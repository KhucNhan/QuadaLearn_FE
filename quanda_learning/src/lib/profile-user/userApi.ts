const API_BASE = "http://localhost:8888/api/users" // đổi cổng nếu backend bạn khác

export async function fetchUser(userId: number) {
  const token = localStorage.getItem("token") // nếu backend yêu cầu JWT
  const res = await fetch(`${API_BASE}/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  })
  if (!res.ok) throw new Error("Failed to fetch user")
  return await res.json()
}

export async function updateUser(userId: number, payload: any) {
  const token = localStorage.getItem("token")
  const res = await fetch(`${API_BASE}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error("Failed to update user")
  return await res.json()
}

export async function uploadAvatar(userId: number, file: File) {
  const token = localStorage.getItem("token")
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(`${API_BASE}/${userId}/upload-avatar`, {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: formData,
  })
  if (!res.ok) throw new Error("Failed to upload avatar")
  return await res.json()
}
