import React, { useState, ReactNode } from "react";
import { Box } from "@mui/material";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";


interface LayoutProps {
  children: ReactNode;
  toggleMode: () => void;
  mode: "light" | "dark";
}

export default function Layout({ children, toggleMode, mode }: LayoutProps) {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar open={openSidebar} />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.3s",
        }}
      >
        <Header
          toggleSidebar={() => setOpenSidebar(!openSidebar)}
          toggleMode={toggleMode}
          mode={mode}
        />
        <Box sx={{ p: 3, flex: 1, overflow: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}
