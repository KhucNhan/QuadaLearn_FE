import React, { useState, ReactNode } from "react";
import { Box } from "@mui/material";
import Header from "@/components/admin/userManagement/Header";
import Sidebar from "@/components/admin/userManagement/Sidebar";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
  toggleMode: () => void;
  mode: "light" | "dark";
}

export default function Layout({ children, toggleMode, mode }: LayoutProps) {
  const [openSidebar, setOpenSidebar] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/authenticate/login");
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar open={openSidebar} onLogout={handleLogout} /> {/* ⬅️ TRUYỀN PROP */}
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
