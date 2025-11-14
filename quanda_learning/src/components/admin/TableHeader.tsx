"use client";

import React from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Tooltip,
  Paper,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import RefreshIcon from "@mui/icons-material/Refresh";

interface UserTableHeaderProps {
  searchTerm: string;
  emailFilter: string;
  onSearchChange: (value: string) => void;
  onEmailFilterChange: (value: string) => void;
}

export default function UserTableHeader({
  searchTerm,
  emailFilter,
  onSearchChange,
  onEmailFilterChange,
}: UserTableHeaderProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const clearFilters = () => {
    onSearchChange("");
    onEmailFilterChange("");
  };

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 2,
        alignItems: "center",
        bgcolor: isDark ? "#1e1e1e" : "#f8fafc",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        color={isDark ? "grey.100" : "primary.main"}
      >
        👥 Danh sách người dùng
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {/* Ô tìm kiếm theo tên */}
        <TextField
          size="small"
          label="Tìm theo tên"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearchChange(e.target.value)
          }
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: isDark ? "#2c2c2c" : "white",
              color: isDark ? "#fff" : "#000",
              "& fieldset": {
                borderColor: isDark ? "#555" : "#ccc",
              },
              "&:hover fieldset": {
                borderColor: isDark ? "#aaa" : "#1976d2",
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: isDark ? "#bbb" : undefined }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => onSearchChange("")}
                    size="small"
                    aria-label="Xóa tìm kiếm"
                  >
                    <ClearIcon sx={{ color: isDark ? "#fff" : "#000" }} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Ô lọc theo email */}
        <TextField
          size="small"
          label="Lọc theo email"
          value={emailFilter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onEmailFilterChange(e.target.value)
          }
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: isDark ? "#2c2c2c" : "white",
              color: isDark ? "#fff" : "#000",
              "& fieldset": {
                borderColor: isDark ? "#555" : "#ccc",
              },
              "&:hover fieldset": {
                borderColor: isDark ? "#aaa" : "#1976d2",
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FilterAltIcon sx={{ color: isDark ? "#bbb" : undefined }} />
                </InputAdornment>
              ),
              endAdornment: emailFilter && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => onEmailFilterChange("")}
                    size="small"
                    aria-label="Xóa bộ lọc email"
                  >
                    <ClearIcon sx={{ color: isDark ? "#fff" : "#000" }} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Nút reset bộ lọc */}
        {(searchTerm || emailFilter) && (
          <Tooltip title="Làm mới bộ lọc">
            <IconButton
              onClick={clearFilters}
              sx={{
                bgcolor: isDark ? "#333" : "#e3f2fd",
                "&:hover": { bgcolor: isDark ? "#444" : "#bbdefb" },
                color: isDark ? "#fff" : "inherit",
              }}
              aria-label="Làm mới bộ lọc"
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Paper>
  );
}
