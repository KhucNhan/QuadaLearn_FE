"use client";

import React, { useEffect, useState } from "react";
import { userApi } from "@/lib/admin/userApi";
import UserTable from "@/components/admin/Table";
import UserFormDialog from "@/components/admin/FormDialog";
import UserConfirmDialog from "@/components/admin/ConfirmDeleteDialog";
import UserTableHeader from "@/components/admin/TableHeader";
import type { User } from "@/lib/types/users";

import {
    Container,
    Typography,
    Button,
    Divider,
    Box,
    Paper,
    TablePagination,
    Snackbar,
    Alert,
    CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AlertState {
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
}

export default function UserPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [alert, setAlert] = useState<AlertState>({
        open: false,
        message: "",
        severity: "success",
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // 🟢 Lấy danh sách người dùng
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await userApi.getAll();
                setUsers(res);
            } catch {
                setAlert({
                    open: true,
                    message: "Không thể tải danh sách người dùng!",
                    severity: "error",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (data: Partial<User>, file?: File) => {
        try {
            if (editingUser) {
                const updatedUser = await userApi.update(editingUser.id, data, file);

                setUsers((prev) =>
                    prev.map((u) =>
                        u.id === editingUser.id ? updatedUser : u
                    )
                );

                setAlert({
                    open: true,
                    message: "Cập nhật thành công!",
                    severity: "success",
                });
            }
            else {
                // thêm mới có file
                const res = await userApi.create(data, file);

                setUsers((prev) => [res, ...prev]);

                setAlert({
                    open: true,
                    message: "Thêm người dùng thành công!",
                    severity: "success",
                });
            }

            setOpenDialog(false);
            setEditingUser(null);
        } catch (error) {
            console.log(error);
            setAlert({
                open: true,
                message: "Lỗi khi lưu dữ liệu!",
                severity: "error",
            });
        }
    };


    // 🟢 Xác nhận xóa user
    const handleConfirmDelete = async () => {
        if (!userToDelete) return;
        try {
            await userApi.delete(userToDelete.id);
            setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
            setAlert({ open: true, message: "Xóa người dùng thành công!", severity: "success" });
        } catch {
            setAlert({ open: true, message: "Lỗi khi xóa người dùng!", severity: "error" });
        } finally {
            setOpenConfirm(false);
            setUserToDelete(null);
        }
    };

    // 🟢 Lọc và phân trang
    const filteredUsers = (users || []).filter(
        (u) =>
            (u?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) &&
            (u?.email?.toLowerCase() || "").includes(emailFilter.toLowerCase())
    );

    const paginatedUsers = filteredUsers.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    // 🟢 Hiển thị
    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" fontWeight={700}>
                        Quản lý người dùng
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setEditingUser(null);
                            setOpenDialog(true);
                        }}
                        sx={{ borderRadius: 2, textTransform: "none" }}
                    >
                        Thêm người dùng
                    </Button>
                </Box>

                <UserTableHeader
                    searchTerm={searchTerm}
                    emailFilter={emailFilter}
                    onSearchChange={setSearchTerm}
                    onEmailFilterChange={setEmailFilter}
                />

                <Divider sx={{ my: 2 }} />

                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" py={6}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <UserTable
                        users={paginatedUsers}
                        onEdit={(u) => {
                            setEditingUser(u);
                            setOpenDialog(true);
                        }}
                        onDelete={(u) => {
                            setUserToDelete(u);
                            setOpenConfirm(true);
                        }}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        totalUsers={users.length}
                    />
                )}

                <TablePagination
                    component="div"
                    count={filteredUsers.length}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                    labelRowsPerPage="Số dòng mỗi trang:"
                />
            </Paper>

            {/* 🟡 Form thêm/sửa người dùng */}
            <UserFormDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSubmit={handleSubmit}
                defaultValues={editingUser || { name: "", email: "", image: "" }}
            />

            {/* 🔴 Xác nhận xóa */}
            <UserConfirmDialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                onConfirm={handleConfirmDelete}
                user={userToDelete}
            />

            {/* 🟢 Snackbar thông báo */}
            <Snackbar
                open={alert.open}
                autoHideDuration={3000}
                onClose={() => setAlert({ ...alert, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity={alert.severity} variant="filled">
                    {alert.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
