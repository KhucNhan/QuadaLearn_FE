"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Box,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface HeaderProps {
  toggleSidebar: () => void;
  toggleMode: () => void;
  mode: "light" | "dark";
}

export default function Header({ toggleSidebar, toggleMode, mode }: HeaderProps) {
  const theme = useTheme();

  return (
    <AppBar position="sticky" color="primary" elevation={1}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Logo + Sidebar toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Tooltip title="Mở/đóng menu">
            <IconButton color="inherit" onClick={toggleSidebar} size="large">
              <MenuIcon />
            </IconButton>
          </Tooltip>

          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Admin Dashboard
          </Typography>
        </Box>

        {/* Nút chuyển chế độ sáng/tối */}
        <Tooltip title={mode === "dark" ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}>
          <IconButton
            color="inherit"
            onClick={toggleMode}
            size="large"
            sx={{
              bgcolor: mode === "dark" ? "#1e1e1e" : "#e3f2fd",
              "&:hover": { bgcolor: mode === "dark" ? "#333" : "#bbdefb" },
              borderRadius: "50%",
              transition: "all 0.2s ease-in-out",
            }}
          >
            {mode === "dark" ? (
              <Brightness7Icon sx={{ color: "#ffeb3b" }} />
            ) : (
              <Brightness4Icon sx={{ color: "#1565c0" }} />
            )}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
