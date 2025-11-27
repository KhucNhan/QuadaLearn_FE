"use client";

import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography
} from "@mui/material";

export default function CourseConfirmDialog({ open, onClose, onConfirm, course }: any) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Xác nhận xóa</DialogTitle>

            <DialogContent>
                <Typography>
                    Bạn có chắc chắn muốn xóa khóa học:
                    <strong> {course?.name}</strong>?
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button color="error" variant="contained" onClick={onConfirm}>
                    Xóa
                </Button>
            </DialogActions>
        </Dialog>
    );
}
