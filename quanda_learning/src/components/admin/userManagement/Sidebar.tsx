"use client";

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";

import { useRouter } from "next/navigation"; // 👈 BẮT BUỘC

interface SidebarProps {
  open: boolean;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onLogout }) => {
  const router = useRouter(); // 👈 KHAI BÁO ROUTER

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      onClick: () => router.push("/adminDashboard/adminPage"),
    },
    {
      text: "Users",
      icon: <PeopleIcon />,
      onClick: () => router.push("/adminDashboard/adminPage"),
    },
    {
      text: "Courses",
      icon: <SchoolIcon />,
      onClick: () => router.push("/adminDashboard/coursePage"),
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 250 : 80,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 250 : 80,
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <Tooltip
            key={item.text}
            title={!open ? item.text : ""}
            placement="right"
          >
            <ListItem disablePadding>
              <ListItemButton onClick={item.onClick}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} sx={{ ml: 2 }} />}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>

      <Divider />

      {/* Logout */}
      <Tooltip title={!open ? "Đăng xuất" : ""} placement="right">
        <ListItem disablePadding>
          <ListItemButton onClick={onLogout}>
            <ListItemIcon
              sx={{ minWidth: 0, justifyContent: "center", color: "red" }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Đăng xuất"
                sx={{ ml: 2, color: "red", fontWeight: "bold" }}
              />
            )}
          </ListItemButton>
        </ListItem>
      </Tooltip>
    </Drawer>
  );
};

export default Sidebar;
