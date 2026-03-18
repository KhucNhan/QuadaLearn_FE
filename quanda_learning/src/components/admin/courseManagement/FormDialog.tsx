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
  MenuItem,
  Divider,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import type { Course } from "@/lib/types/course";

interface CourseFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CourseFormData, file?: File) => void;
  defaultValues: Partial<Course>;
}

export interface CourseFormData extends Partial<Course> {
  imageFile?: FileList;
}

const BACKEND_URL = "http://localhost:8888";

export default function CourseFormDialog({
  open,
  onClose,
  onSubmit,
  defaultValues,
}: CourseFormDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CourseFormData>({
    defaultValues,
    mode: "onBlur",
  });

  // When editing another course, reset form
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const selectedFile = watch("imageFile");

  // 🟢 Preview ảnh giống UserForm
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

  const handleFormSubmit = (data: CourseFormData) => {
    const file = selectedFile?.[0];
    onSubmit(data, file);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{ fontWeight: 700, textAlign: "center", color: "primary.main" }}
      >
        {defaultValues?.id ? "Cập nhật khóa học" : "Thêm khóa học mới"}
      </DialogTitle>

      <Divider />

      <DialogContent
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 🟢 Ảnh preview */}
        <Avatar
          src={previewUrl}
          sx={{
            width: 120,
            height: 120,
            border: "3px solid #1976d2",
            mb: 2,
          }}
        />

        {/* 🟢 Upload giống UserForm */}
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          sx={{ textTransform: "none" }}
        >
          Tải ảnh lên
          <input type="file" hidden accept="image/*" {...register("imageFile")} />
        </Button>

        {/* Form */}
        <Stack spacing={2} sx={{ width: "100%", mt: 3 }}>
          <TextField
            label="Tên khóa học"
            fullWidth
            {...register("name", { required: "Không được bỏ trống" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Level"
            select
            fullWidth
            value={watch("level") || ""}
            onChange={(e) => setValue("level", e.target.value)}
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </TextField>

          <TextField
            label="Mô tả"
            fullWidth
            multiline
            rows={4}
            {...register("description")}
          />
        </Stack>

        <DialogActions sx={{ mt: 3 }}>
          <Button onClick={onClose} color="inherit" variant="outlined">
            Hủy
          </Button>
          <Button onClick={handleSubmit(handleFormSubmit)} variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
