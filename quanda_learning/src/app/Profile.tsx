"use client"

import React, { useEffect, useState } from "react"
import { X, Edit3, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fetchUser, updateUser, uploadAvatar } from "@/lib/profile-user/userApi" // đường dẫn tùy project của bạn


interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
  userId: number
}

interface UserInfo {
  id?: number
  name: string
  email: string
  gender: string
  avatarUrl?: string | null
  newAvatarFile?: File // để lưu file mới chọn
}

export function ProfileModal({ isOpen, onClose, userId }: ProfileModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isNameConfirmed, setIsNameConfirmed] = useState(true)
  const [nameError, setNameError] = useState<string | null>(null)

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    gender: "",
    avatarUrl: null,
  })
  const [editInfo, setEditInfo] = useState<UserInfo>(userInfo)
  const [tempName, setTempName] = useState(userInfo.name)

  // Fetch user mỗi khi mở modal
  useEffect(() => {
    if (!isOpen) return
    let mounted = true
    setLoading(true)
    setError(null)
      ; (async () => {
        try {
          const u = await fetchUser(userId)
          const mapped: UserInfo = {
            id: u.id,
            name: u.name ?? u.username ?? "",
            email: u.email ?? "",
            gender: u.gender === "MALE" ? "Nam" : u.gender === "FEMALE" ? "Nữ" : "",
            avatarUrl: u.image ?? u.avatarUrl ?? null,
          }
          if (!mounted) return
          setUserInfo(mapped)
          setEditInfo(mapped)
          setTempName(mapped.name)
        } catch (err) {
          console.error("Fetch user failed", err)
          setError("Không thể tải thông tin người dùng.")
        } finally {
          if (mounted) setLoading(false)
        }
      })()
    return () => {
      mounted = false
    }
  }, [isOpen, userId])

  // Ngăn scroll khi mở modal
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleEdit = () => setIsEditing(true)
  const handleCancel = () => {
    setIsEditing(false)
    setEditInfo(userInfo)
  }

  // 🧠 Chỉ cập nhật tạm local, không gọi API
  const handleNameSave = () => {
    if (!tempName.trim()) {
      setNameError("Tên không được để trống")
      return
    }
    setNameError(null)
    setEditInfo((prev) => ({ ...prev, name: tempName }))
    setIsEditingName(false)
    setIsNameConfirmed(true)
  }

  const handleNameCancel = () => {
    setTempName(editInfo.name)
    setIsEditingName(false)
    setIsNameConfirmed(true)
  }
  const handleNameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleNameSave()
    if (e.key === "Escape") handleNameCancel()
  }

  // 🖼 Chọn ảnh — chỉ preview, chưa upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const previewUrl = URL.createObjectURL(file)
    setEditInfo((prev) => ({ ...prev, avatarUrl: previewUrl, newAvatarFile: file }))
  }


  const handleSave = async () => {

    if (!editInfo.gender || editInfo.gender.trim() === "") {
      setError("⚠️ Vui lòng chọn giới tính trước khi cập nhật!");
      return;
    }


    setSaving(true)
    setError(null)
    try {
      let avatarUrl = editInfo.avatarUrl

      if (editInfo.newAvatarFile) {
        const data = await uploadAvatar(userId, editInfo.newAvatarFile)
        avatarUrl = data.url
      }

      const payload = {
        name: editInfo.name,
        email: editInfo.email,
        gender:
          editInfo.gender === "Nam"
            ? "MALE"
            : editInfo.gender === "Nữ"
              ? "FEMALE"
              : editInfo.gender,
        image: avatarUrl,
      }

      const updated = await updateUser(userId, payload)
      const mapped: UserInfo = {
        id: updated.id,
        name: updated.name ?? editInfo.name,
        email: updated.email ?? editInfo.email,
        gender: updated.gender === "MALE" ? "Nam" : updated.gender === "FEMALE" ? "Nữ" : editInfo.gender,
        avatarUrl: avatarUrl ?? updated.image ?? userInfo.avatarUrl ?? null,
      }

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
      const newUser = { ...storedUser, name: mapped.name, email: mapped.email, avatar: mapped.avatarUrl }
      localStorage.setItem("user", JSON.stringify(newUser))

      window.dispatchEvent(new Event("userUpdated"))


      setUserInfo(mapped)
      setEditInfo(mapped)
      setIsEditing(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    } catch (err) {
      console.error("Update user failed", err)
      setError("Cập nhật thất bại. Vui lòng thử lại.")
    } finally {
      setSaving(false)
    }
  }

  if (!isOpen) return null


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />

      {showSuccess && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-60 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <Check size={16} />
          <span className="text-sm font-medium">Cập nhật thành công!</span>
        </div>
      )}

      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-xl shadow-2xl border border-purple-500/30 w-full max-w-sm mx-4 transform transition-all duration-300 overflow-hidden">
        <div className="relative px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 border-b border-purple-400/30">
          <h1 className="text-white text-base font-medium text-center">Thông tin tài khoản</h1>
          <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20">
            <X size={18} />
          </button>
        </div>

        <div className="relative overflow-hidden">
          {/* VIEW */}
          <div className={`transition-transform duration-300 ease-in-out ${isEditing ? "-translate-x-full" : "translate-x-0"}`}>
            <div className="relative h-32 overflow-hidden">
              <img src="/images/background/background-quandaLearn.jpg" alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-pink-600/40" />
            </div>

            <div className="relative px-4 pb-4">
              <div className="flex items-center gap-3 -mt-8 mb-4">
                <div className="relative w-16 h-16">
                  <Avatar className="w-16 h-16 border-4 border-purple-500 shadow-lg ring-2 ring-purple-400/50">
                    <AvatarImage
                      src={
                        editInfo.avatarUrl
                          ? editInfo.avatarUrl.startsWith("http") || editInfo.avatarUrl.startsWith("blob:")
                            ? editInfo.avatarUrl
                            : `http://localhost:8888${editInfo.avatarUrl}`
                          : "/images/login_register/anhnenlogin.png"
                      }
                    />

                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-lg font-semibold">
                      {userInfo.name?.charAt(0) ?? "U"}
                    </AvatarFallback>
                  </Avatar>

                </div>

                <div className="mt-8 flex-1">
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <Input value={tempName} onChange={(e) => setTempName(e.target.value)} onKeyDown={handleNameKeyPress} className="bg-slate-800/50 border-purple-500/50 text-white focus:border-purple-400 focus:ring-purple-400/20 text-xl font-semibold h-8 px-2" autoFocus />
                      <button onClick={handleNameSave} className="p-1 rounded text-green-400 hover:text-green-300">
                        <Check size={16} />
                      </button>
                      <button onClick={handleNameCancel} className="p-1 rounded text-red-400 hover:text-red-300">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group">
                      <h2 className="text-xl font-semibold text-white">{userInfo.name}</h2>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-white font-medium text-base mb-3">Thông tin cá nhân</h3>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center py-1">
                  <span className="text-purple-200 text-sm">Email</span>
                  <span className="text-white text-sm">{userInfo.email}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-purple-200 text-sm">Tên</span>
                  <span className="text-white text-sm">{userInfo.name}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-purple-200 text-sm">Giới tính</span>
                  <span className="text-white text-sm">{userInfo.gender}</span>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent mb-4" />

              <Button onClick={handleEdit} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-2.5 rounded-lg">
                <Edit3 size={16} /> Cập nhật
              </Button>
              {error && <div className="text-sm text-red-400 mt-2">{error}</div>}
            </div>
          </div>

          {/* EDIT MODE */}
          <div className={`absolute top-0 left-0 w-full transition-transform duration-300 ease-in-out ${isEditing ? "translate-x-0" : "translate-x-full"}`}>
            <div className="relative h-32 overflow-hidden">
              <img src="images\\background\\background-quandaLearn.jpg" alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-pink-600/40" />
            </div>

            <div className="relative px-4 pb-4">
              <div className="flex items-center gap-3 -mt-8 mb-4">
                <div className="relative w-16 h-16">
                  <Avatar className="w-16 h-16 border-4 border-purple-500 shadow-lg ring-2 ring-purple-400/50">
                    <AvatarImage
                      src={
                        editInfo.avatarUrl
                          ? editInfo.avatarUrl.startsWith("http") || editInfo.avatarUrl.startsWith("blob:")
                            ? editInfo.avatarUrl
                            : `http://localhost:8888${editInfo.avatarUrl}`
                          : "/images/login_register/anhnenlogin.png"
                      }
                    />
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-lg font-semibold">
                      {editInfo.name?.charAt(0) ?? "U"}
                    </AvatarFallback>
                  </Avatar>

                  <label className="absolute bottom-0 right-0 bg-purple-600 p-1 rounded-full cursor-pointer hover:bg-purple-700">
                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11s1.343 3 3 3 3-1.343 3-3zm0 0v3m0 0h3m-3 0H9m0-9h6m2 0a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h2" />
                    </svg>
                  </label>
                </div>

                <div className="mt-8 flex items-center gap-2">
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={tempName}
                        onChange={(e) => {
                          const value = e.target.value
                          setTempName(value)
                          setNameError(value.trim() === "" ? "Tên không được để trống" : null)
                        }}
                        onKeyDown={handleNameKeyPress}
                        className="bg-slate-800/50 border-purple-500/50 text-white focus:border-purple-400 focus:ring-purple-400/20 text-xl font-semibold h-8 px-2"
                        autoFocus
                      />
                      {nameError && (
                        <p className="text-red-400 text-sm mt-1">{nameError}</p>
                      )}

                      <button
                        onClick={() => {
                          handleNameSave()
                        }}
                        className="p-1 rounded text-green-400 hover:text-green-300"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => {
                          handleNameCancel()
                        }}
                        className="p-1 rounded text-red-400 hover:text-red-300"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold text-white">{editInfo.name}</h2>
                      <button
                        onClick={() => {
                          setIsEditingName(true)
                          setIsNameConfirmed(false) // 🧠 đang sửa tên → khóa nút cập nhật
                        }}
                        className="p-1 rounded text-purple-300 hover:text-white"
                      >
                        <Edit3 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-white font-medium text-base">
                  Chỉnh sửa thông tin:
                </h3>


                {!editInfo.gender && (
                  <p className="text-red-400 text-sm ml-4">
                    ⚠️ Vui lòng chọn giới tính
                  </p>
                )}
              </div>


              <div className="space-y-4 mb-6">
                <div>
                  <Label className="text-purple-200 text-sm mb-2 block">Email</Label>
                  <Input
                    value={editInfo.email}
                    onChange={(e) => setEditInfo({ ...editInfo, email: e.target.value })}
                    className="bg-slate-800/50 border-purple-500/50 text-white"
                    placeholder="email@example.com"
                    type="email"
                  />
                </div>

                <div>
                  <Label className="text-purple-200 text-sm mb-2 block">Giới tính</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Nam"
                        checked={editInfo.gender === "Nam"}
                        onChange={(e) => setEditInfo({ ...editInfo, gender: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="text-white text-sm">Nam</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Nữ"
                        checked={editInfo.gender === "Nữ"}
                        onChange={(e) => setEditInfo({ ...editInfo, gender: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="text-white text-sm">Nữ</span>

                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleCancel} variant="outline" className="flex-1">
                  Hủy
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving || !isNameConfirmed || !editInfo.gender || !!nameError}
                  className={`flex-1 transition-opacity ${!isNameConfirmed || !editInfo.gender || nameError
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                    }`}
                >
                  {saving ? "Đang lưu..." : "Cập nhật"}
                </Button>


              </div>

              {error && <div className="text-sm text-red-400 mt-2">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
