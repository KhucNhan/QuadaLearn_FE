import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Star, Play } from "lucide-react"

interface CourseCardProps {
  id: string
  title: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  students: number
  rating: number
  progress?: number
  image: string
  isRecommended?: boolean
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
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800",
  }

  const levelVietnamese = {
    Beginner: "Cơ bản",
    Intermediate: "Trung cấp",
    Advanced: "Nâng cao",
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      {isRecommended && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-purple-600 text-white">Đề xuất</Badge>
        </div>
      )}

      <div className="relative h-48 overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {title}
          </CardTitle>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-2 mb-3">
          <Badge className={levelColors[level]}>{levelVietnamese[level]}</Badge>
          <div className="flex items-center text-sm text-gray-500">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            {rating}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
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
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Tiến độ</span>
              <span className="text-purple-600 font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" size="sm">
          <Play className="w-4 h-4 mr-2" />
          {progress !== undefined ? "Tiếp tục học" : "Bắt đầu học"}
        </Button>
      </CardContent>
    </Card>
  )
}
