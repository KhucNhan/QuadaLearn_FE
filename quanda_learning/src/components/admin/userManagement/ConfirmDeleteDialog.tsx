"use client";

import React, { useState } from "react";
import type { User } from "@/lib/types/users";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";


interface UserConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  user?: User | null;
}

export default function UserConfirmDialog({
  open,
  onClose,
  onConfirm,
  user,
}: UserConfirmDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontWeight: 600,
          color: "error.main",
        }}
      >
        <WarningAmberRoundedIcon color="error" /> Xác nhận xóa người dùng
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ mt: 1, mb: 2 }}>
          Bạn có chắc chắn muốn xóa người dùng{" "}
          <b>{user?.name || "này"}</b> không?
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={loading}>
          Hủy
        </Button>
        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
          disabled={loading}
          sx={{ minWidth: 120 }}
        >
          {loading ? (
            <Box display="flex" alignItems="center" gap={1}>
              <CircularProgress size={18} color="inherit" />
              <span>Đang xóa...</span>
            </Box>
          ) : (
            "Xóa"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
