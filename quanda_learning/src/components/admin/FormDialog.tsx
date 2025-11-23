"use client";

import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
  Stack,
  Divider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import type { User } from "@/lib/types/users";

interface UserFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData, file?: File) => void;
  defaultValues: Partial<User>;
}

export interface UserFormData extends Partial<User> {
  avatarFile?: FileList;
}

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
const genders = ["MALE", "FEMALE"];

const BACKEND_URL = "http://localhost:8888";


export default function UserFormDialog({
  open,
  onClose,
  onSubmit,
  defaultValues,
}: UserFormDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues,
    mode: "onBlur",
  });

  const selectedFile = watch("avatarFile");

  // Reset khi sửa user khác
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const previewUrl = useMemo(() => {
    if (selectedFile && selectedFile[0]) {
      return URL.createObjectURL(selectedFile[0]);
    }

    if (defaultValues?.image) {
      return defaultValues.image.startsWith("http")
        ? defaultValues.image
        : `${BACKEND_URL}${defaultValues.image}`;
    }

    return "";
  }, [selectedFile, defaultValues]);

  const handleFormSubmit = (data: UserFormData) => {
    const file = selectedFile?.[0];
    onSubmit(data, file);
  };

  // Handlers cho Select
  const handleGenderChange = (e: SelectChangeEvent) => {
    setValue("gender", e.target.value as "MALE" | "FEMALE");
  };
  const handleLevelChange = (e: SelectChangeEvent) => {
    setValue("currentLevel", e.target.value);
  };
  const handleGoalChange = (e: SelectChangeEvent) => {
    setValue("goal", e.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{ fontWeight: 700, textAlign: "center", color: "primary.main" }}
      >
        {defaultValues?.id ? "Cập nhật người dùng" : "Thêm người dùng mới"}
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            mt: 2,
          }}
        >
          {/* Avatar */}
          <Avatar
            src={previewUrl}
            sx={{
              width: 120,
              height: 120,
              border: "3px solid #1976d2",
              mb: 1,
            }}
          />
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{ textTransform: "none" }}
          >
            Tải ảnh lên
            <input type="file" hidden accept="image/*" {...register("avatarFile")} />
          </Button>

          <Stack spacing={2} sx={{ width: "100%" }}>
            <TextField
              label="Họ và tên"
              fullWidth
              {...register("name", {
                required: "Vui lòng nhập họ tên",
                minLength: { value: 3, message: "Tối thiểu 3 ký tự" },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Email"
              fullWidth
              {...register("email", {
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email không hợp lệ",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            {!defaultValues?.id && (
              <TextField
                label="Mật khẩu"
                type="password"
                fullWidth
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu",
                  minLength: { value: 6, message: "Ít nhất 6 ký tự" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}

            {/* Giới tính */}
            <FormControl fullWidth>
              <InputLabel>Giới tính</InputLabel>
              <Select
                value={watch("gender") || ""}
                label="Giới tính"
                onChange={handleGenderChange}
              >
                <MenuItem value="">-- Chọn giới tính --</MenuItem>
                {genders.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g === "MALE" ? "Nam" : "Nữ"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Trình độ hiện tại */}
            <FormControl fullWidth>
              <InputLabel>Trình độ hiện tại</InputLabel>
              <Select
                value={watch("currentLevel") || ""}
                label="Trình độ hiện tại"
                onChange={handleLevelChange}
              >
                <MenuItem value="">-- Chọn trình độ --</MenuItem>
                {levels.map((lvl) => (
                  <MenuItem key={lvl} value={lvl}>
                    {lvl}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Mục tiêu học */}
            <FormControl fullWidth>
              <InputLabel>Mục tiêu học</InputLabel>
              <Select
                value={watch("goal") || ""}
                label="Mục tiêu học"
                onChange={handleGoalChange}
              >
                <MenuItem value="">-- Chọn mục tiêu --</MenuItem>
                {levels.map((lvl) => (
                  <MenuItem key={lvl} value={lvl}>
                    {lvl}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          {/* Trạng thái người dùng – chỉ hiển thị khi edit */}
          {defaultValues?.id && (
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={watch("status") || "ACTIVE"}
                label="Trạng thái"
                onChange={(e) => setValue("status", e.target.value as "ACTIVE" | "BANNED")}
              >
                <MenuItem value="ACTIVE">Đang hoạt động</MenuItem>
                <MenuItem value="BANNED">Đã bị khóa</MenuItem>
              </Select>
            </FormControl>
          )}


          <DialogActions sx={{ justifyContent: "center", width: "100%" }}>
            <Button onClick={onClose} color="inherit" variant="outlined">
              Hủy
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Lưu
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
