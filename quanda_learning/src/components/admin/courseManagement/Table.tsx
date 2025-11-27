"use client";

import React from "react";
import {
    Table, TableHead, TableRow, TableCell,
    TableBody, IconButton, Avatar, Tooltip
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CourseTable({ courses, onEdit, onDelete }: any) {

    const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8888";

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Ảnh</TableCell>
                    <TableCell>Tên khóa học</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell>Mô tả</TableCell>
                    <TableCell align="right">Hành động</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {courses.map((c: any) => {

                    // ⭐ Logic xử lý URL ảnh giống UserTable
                    const imageUrl = c?.image
                        ? c.image.startsWith("http")
                            ? c.image
                            : `${BACKEND_URL}${c.image.startsWith("/") ? "" : "/"}${c.image}`
                        : "/images/default_course.png";

                    return (
                        <TableRow key={c.id}>
                            <TableCell>
                                <Avatar
                                    src={imageUrl}
                                    variant="rounded"
                                    sx={{ width: 48, height: 48 }}
                                />
                            </TableCell>

                            <TableCell>{c.name}</TableCell>
                            <TableCell>{c.level}</TableCell>
                            <TableCell sx={{ maxWidth: 350 }}>
                                {c.description?.substring(0, 70)}...
                            </TableCell>

                            <TableCell align="right">
                                <Tooltip title="Sửa">
                                    <IconButton color="primary" onClick={() => onEdit(c)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Xóa">
                                    <IconButton color="error" onClick={() => onDelete(c)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
