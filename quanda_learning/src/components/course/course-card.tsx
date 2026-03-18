"use client";

import React from "react";
import { Clock, Users, Star, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Elementary" | "Intermediate" | "Upper-Intermediate" | "Advanced" | "Proficient";
  duration: string;
  students: number;
  rating: number;
  progress?: number;
  image: string;
  isRecommended?: boolean;
  onSelectCourse?: (course: CourseCardProps) => void; // callback parent
}

// **MAPPING CEFR → English Level**
export const levelMap: Record<string, CourseCardProps["level"]> = {
  A1: "Beginner",
  A2: "Elementary",
  B1: "Intermediate",
  B2: "Upper-Intermediate",
  C1: "Advanced",
  C2: "Proficient",
};

export function CourseCard(props: CourseCardProps) {
  const {
    title,
    description,
    level,
    duration,
    students,
    rating,
    progress,
    image,
    isRecommended = false,
    onSelectCourse,
  } = props;

  const levelColors = {
    Beginner: "bg-green-100 text-green-800",
    Elementary: "bg-green-200 text-green-900",
    Intermediate: "bg-yellow-100 text-yellow-800",
    "Upper-Intermediate": "bg-yellow-200 text-yellow-900",
    Advanced: "bg-red-100 text-red-800",
    Proficient: "bg-red-200 text-red-900",
  };

  const levelVietnamese = {
    Beginner: "Cơ bản",
    Elementary: "Sơ cấp",
    Intermediate: "Trung cấp",
    "Upper-Intermediate": "Trung cấp cao",
    Advanced: "Nâng cao",
    Proficient: "Thành thạo",
  };

  return (
    <div className="course-card">
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="course-image"
        onError={(e) =>
        ((e.target as HTMLImageElement).src =
          "https://via.placeholder.com/400x200?text=No+Image")
        }
      />
      <div className="course-content">
        <div className="course-card-title">{title}</div>
        <div className="course-card-desc">{description}</div>
        <div className="flex items-center gap-2 mt-2">
          <Badge className={levelColors[level]}>{levelVietnamese[level]}</Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            {rating}
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {duration}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {students.toLocaleString()} học viên
          </div>
        </div>
        {progress !== undefined && (
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Tiến độ</span>
              <span className="text-purple-600 font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </div>
      <div className="course-footer">
        <button
          className="course-button"
          onClick={() => onSelectCourse && onSelectCourse(props)}
        >
          {progress !== undefined ? "Tiếp tục học" : "Bắt đầu học"}
        </button>
      </div>
    </div>
  );
}
