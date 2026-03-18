"use client";

import React, { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Layout from "@/components/admin/userManagement/Layout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#f9fafb", paper: "#fff" },
              }
            : {
                background: { default: "#121212", paper: "#1e1e1e" },
              }),
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout toggleMode={toggleMode} mode={mode}>
        {children}
      </Layout>
    </ThemeProvider>
  );
}
