"use client";

import React, { useEffect, useState } from "react";
import { courseApi } from "@/lib/admin/courseApi";

import CourseTable from "@/components/admin/courseManagement/Table";
import CourseFormDialog from "@/components/admin/courseManagement/FormDialog";
import CourseConfirmDialog from "@/components/admin/courseManagement/ConfirmDeleteDialog";
import CourseTableHeader from "@/components/admin/courseManagement/TableHeader";

import type { Course } from "@/lib/types/course";

import {
    Container, Typography, Button, Divider, Box,
    Paper, Snackbar, Alert, CircularProgress
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export default function CoursePage() {

    // ---------------- State ----------------
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const [openConfirm, setOpenConfirm] = useState<boolean>(false);
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [levelFilter, setLevelFilter] = useState<string>("");

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    // ---------------- Fetch Courses ----------------
    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                const res: Course[] = await courseApi.getAll();
                setCourses(res);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    // ---------------- Create / Update ----------------
    const handleSubmit = async (data: Partial<Course>, file?: File) => {
        try {
            if (editingCourse) {
                const updated: Course = await courseApi.update(editingCourse.id, data, file);

                setCourses(prev =>
                    prev.map((c: Course) =>
                        c.id === editingCourse.id ? updated : c
                    )
                );

                setAlert({ open: true, message: "Cập nhật thành công!", severity: "success" });
            } else {
                const created: Course = await courseApi.create(data, file);
                setCourses(prev => [created, ...prev]);

                setAlert({ open: true, message: "Thêm khóa học thành công!", severity: "success" });
            }

            setOpenDialog(false);
            setEditingCourse(null);

        } catch {
            setAlert({ open: true, message: "Lỗi khi lưu dữ liệu!", severity: "error" });
        }
    };

    // ---------------- Delete ----------------
    const handleConfirmDelete = async () => {
        if (!courseToDelete) return;

        try {
            await courseApi.delete(courseToDelete.id);

            setCourses(prev =>
                prev.filter((c: Course) => c.id !== courseToDelete.id)
            );

            setAlert({ open: true, message: "Xóa thành công!", severity: "success" });
        } catch {
            setAlert({ open: true, message: "Lỗi khi xóa!", severity: "error" });
        }

        setOpenConfirm(false);
        setCourseToDelete(null);
    };

    // ---------------- Filter ----------------
    const filteredCourses: Course[] = courses.filter((c: Course) => {
        const matchName = c.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchLevel = levelFilter === "" || c.level === levelFilter;
        return matchName && matchLevel;
    });

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={3}>
                    <Typography variant="h4" fontWeight={700}>Quản lý khóa học</Typography>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setEditingCourse(null);
                            setOpenDialog(true);
                        }}
                    >
                        Thêm khóa học
                    </Button>
                </Box>

                <CourseTableHeader
                    searchTerm={searchTerm}
                    levelFilter={levelFilter}
                    onSearchChange={setSearchTerm}
                    onLevelFilterChange={setLevelFilter}
                />

                <Divider sx={{ my: 2 }} />

                {loading ? (
                    <Box textAlign="center" py={5}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <CourseTable
                        courses={filteredCourses}
                        onEdit={(c: Course) => {
                            setEditingCourse(c);
                            setOpenDialog(true);
                        }}
                        onDelete={(c: Course) => {
                            setCourseToDelete(c);
                            setOpenConfirm(true);
                        }}
                    />
                )}
            </Paper>

            {/* Form Dialog */}
            <CourseFormDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSubmit={handleSubmit}
                defaultValues={
                    editingCourse ?? {
                        name: "",
                        level: "",
                        description: "",
                        image: ""
                    }
                }
            />

            {/* Confirm Delete */}
            <CourseConfirmDialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                onConfirm={handleConfirmDelete}
                course={courseToDelete}
            />

            {/* Snackbar */}
            <Snackbar
                open={alert.open}
                autoHideDuration={2500}
                onClose={() => setAlert(prev => ({ ...prev, open: false }))}
            >
                <Alert severity={alert.severity}>{alert.message}</Alert>
            </Snackbar>
        </Container>
    );
}
