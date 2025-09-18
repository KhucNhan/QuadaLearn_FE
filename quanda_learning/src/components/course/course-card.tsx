import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Star, Play } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  duration: string;
  students: number;
  rating: number;
  progress?: number;
  image: string;
  isRecommended?: boolean;
}

export function CourseCard({
  title,
  description,
  level,
  duration,
  students,
  rating,
  progress,
  image,
  isRecommended = false,
}: CourseCardProps) {
  const levelColors = {
    A1: "bg-green-100 text-green-800",
    A2: "bg-green-200 text-green-900",
    B1: "bg-yellow-100 text-yellow-800",
    B2: "bg-yellow-200 text-yellow-900",
    C1: "bg-red-100 text-red-800",
    C2: "bg-red-200 text-red-900",
  };

  const levelVietnamese = {
    A1: "Cơ bản (A1)",
    A2: "Sơ cấp (A2)",
    B1: "Trung cấp thấp (B1)",
    B2: "Trung cấp cao (B2)",
    C1: "Nâng cao (C1)",
    C2: "Thành thạo (C2)",
  };

  return (
   <Card className="group flex flex-col md:flex-row w-full max-w-4xl mx-auto overflow-hidden shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative md:w-1/3 w-full h-48 md:h-auto overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isRecommended && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-purple-600 text-white">Đề xuất</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-4 md:w-2/3 w-full">
        <div>
          <CardTitle className="text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {title}
          </CardTitle>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center gap-2 mt-3">
            <Badge className={levelColors[level]}>
              {levelVietnamese[level]}
            </Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              {rating}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
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
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Tiến độ</span>
                <span className="text-purple-600 font-medium">
                  {progress}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>

        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4"
          size="sm"
        >
          <Play className="w-4 h-4 mr-2" />
          {progress !== undefined ? "Tiếp tục học" : "Bắt đầu học"}
        </Button>
      </div>
    </Card>
  );
}
