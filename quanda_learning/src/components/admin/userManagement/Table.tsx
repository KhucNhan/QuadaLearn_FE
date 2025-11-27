import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Chip } from "@mui/material";
import type { User } from "@/lib/types/users";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  page: number;
  rowsPerPage: number;
  totalUsers: number;
}

export default function UserTable({
  users,
  onEdit,
  onDelete,
  page,
  rowsPerPage,
  totalUsers,
}: UserTableProps) {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8888";

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Ảnh</TableCell>
                <TableCell>Họ và tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Thao tác</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.length > 0 ? (
                users.map((u, index) => {
                  const avatarUrl = u?.image
                    ? u.image.startsWith("http")
                      ? u.image
                      : `${BACKEND_URL}${u.image.startsWith("/") ? "" : "/"}${u.image}`
                    : "/images/login_register/anhnenlogin.png";

                  return (
                    <TableRow key={u.id} hover>

                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>

                      <TableCell>
                        <img
                          src={avatarUrl}
                          alt={u.name || "User"}
                          width={40}
                          height={40}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid #1976d2",
                          }}
                        />
                      </TableCell>

                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>

                      <TableCell align="center">
                        <Tooltip title="Chỉnh sửa">
                          <IconButton color="primary" onClick={() => onEdit(u)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>

                      </TableCell>

                      <TableCell align="center">
                        <Tooltip
                          title={
                            u.status === "BANNED"
                              ? "Người dùng bị khóa"
                              : "Người dùng đang hoạt động"
                          }
                        >
                          <Chip
                            label={u.status === "BANNED" ? "Đã bị khóa" : "Đang hoạt động"}
                            color={u.status === "BANNED" ? "error" : "success"}
                            variant="filled"
                            sx={{ fontWeight: 600 }}
                          />
                        </Tooltip>
                      </TableCell>

                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography>Không có người dùng nào.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </TableContainer>

        <Typography
          variant="body2"
          align="right"
          sx={{ mt: 1, color: "text.secondary" }}
        >
          Hiển thị <b>{users.length}</b> / Tổng <b>{totalUsers}</b> người dùng
        </Typography>
      </Paper>
    </Box>
  );
}
