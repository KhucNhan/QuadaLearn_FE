"use client";

import React from "react";
import { TextField, MenuItem, Box } from "@mui/material";

interface Props {
    searchTerm: string;
    levelFilter: string;
    onSearchChange: (value: string) => void;
    onLevelFilterChange: (value: string) => void;
}

export default function CourseTableHeader({
    searchTerm,
    levelFilter,
    onSearchChange,
    onLevelFilterChange,
}: Props) {
    return (
        <Box display="flex" gap={2}>
            <TextField
                label="Tìm theo tên khóa học"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                fullWidth
            />

            <TextField
                select
                label="Lọc theo level"
                value={levelFilter}
                onChange={(e) => onLevelFilterChange(e.target.value)}
                sx={{ width: 250 }}
            >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
            </TextField>
        </Box>
    );
}
