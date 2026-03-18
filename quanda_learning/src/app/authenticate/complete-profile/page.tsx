"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, BookOpen, Target, Users, Briefcase, Plane, GraduationCap } from "lucide-react"
import { useRouter } from "next/navigation"

const englishLevels = [
  {
    id: "a1",
    title: "A1 - Beginner",
    description: "Mới bắt đầu, hiểu từ cơ bản",
    icon: BookOpen,
    color: "bg-green-100 text-green-700 border-green-200",
  },
  {
    id: "a2",
    title: "A2 - Elementary",
    description: "Giao tiếp đơn giản hàng ngày",
    icon: Users,
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    id: "b1",
    title: "B1 - Intermediate",
    description: "Hiểu chủ đề quen thuộc",
    icon: Target,
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  {
    id: "b2",
    title: "B2 - Upper-Intermediate",
    description: "Giao tiếp tự nhiên, hiểu văn bản phức tạp",
    icon: GraduationCap,
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
  {
    id: "c1",
    title: "C1 - Advanced",
    description: "Sử dụng linh hoạt và hiệu quả",
    icon: Briefcase,
    color: "bg-purple-100 text-purple-700 border-purple-200",
  },
  {
    id: "c2",
    title: "C2 - Proficiency",
    description: "Thành thạo hoàn toàn như người bản xứ",
    icon: Plane,
    color: "bg-pink-100 text-pink-700 border-pink-200",
  },
]

const learningGoals = [
  {
    id: "a2",
    title: "A2 - Giao tiếp cơ bản",
    description: "Mục tiêu: Nói chuyện đơn giản hàng ngày",
    icon: Users,
  },
  {
    id: "b1",
    title: "B1 - Giao tiếp tự tin",
    description: "Mục tiêu: Hiểu và thảo luận chủ đề quen thuộc",
    icon: Target,
  },
  {
    id: "b2",
    title: "B2 - Thành thạo giao tiếp",
    description: "Mục tiêu: Giao tiếp tự nhiên, làm việc bằng tiếng Anh",
    icon: Briefcase,
  },
  {
    id: "c1",
    title: "C1 - Chuyên nghiệp",
    description: "Mục tiêu: Sử dụng tiếng Anh trong công việc chuyên môn",
    icon: GraduationCap,
  },
  {
    id: "c2",
    title: "C2 - Bậc thầy",
    description: "Mục tiêu: Thành thạo hoàn toàn như người bản xứ",
    icon: Plane,
  },
]

export default function CompleteProfilePage() {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState<string>("")
  const [selectedGoal, setSelectedGoal] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId)
  }

  const handleSubmit = async () => {
    if (!selectedLevel || !selectedGoal) return;

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8888/api/auth/complete-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ gửi JWT
        },
        body: JSON.stringify({
          currentLevel: selectedLevel,
          goal: selectedGoal,
        }),
      });

      if (!res.ok) {
        throw new Error("Lưu thất bại");
      }

      const data = await res.json();

      // 👉 Lưu lại user mới (đã update) vào localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // 👉 Chuyển sang trang dashboard/home
      router.push("/home");
    } catch (error) {
      console.error("❌ Lỗi khi lưu profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressValue = ((selectedLevel ? 1 : 0) + (selectedGoal ? 1 : 0)) * 50

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Chào mừng bạn đến với hành trình học tiếng Anh! 🎉
          </h1>
          <p className="text-lg text-muted-foreground mb-6 text-pretty">
            Hãy cho chúng tôi biết về trình độ hiện tại và mục tiêu của bạn để tạo lộ trình học phù hợp nhất.
          </p>

          {/* Progress Indicator */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Hoàn thành hồ sơ</span>
              <span>{progressValue}%</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>
        </div>

        <div className="space-y-12">
          {/* Current Level Selection */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-2">Trình độ tiếng Anh hiện tại của bạn?</h2>
              <p className="text-muted-foreground">Chọn mức độ CEFR phù hợp nhất với khả năng hiện tại của bạn</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {englishLevels.map((level) => {
                const Icon = level.icon
                const isSelected = selectedLevel === level.id

                return (
                  <Card
                    key={level.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${isSelected ? "ring-2 ring-primary shadow-lg bg-primary/5" : "hover:bg-card/80"
                      }`}
                    onClick={() => setSelectedLevel(level.id)}
                  >
                    <CardHeader className="text-center pb-2">
                      <div
                        className={`w-12 h-12 rounded-full ${level.color} flex items-center justify-center mx-auto mb-3`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-lg flex items-center justify-center gap-2">
                        {level.title}
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-primary" />}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-sm">{level.description}</CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Learning Goals Selection */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-2">Mục tiêu trình độ tiếng Anh của bạn?</h2>
              <p className="text-muted-foreground">Chọn mức độ CEFR mà bạn muốn đạt được</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {learningGoals.map((goal) => {
                const Icon = goal.icon
                const isSelected = selectedGoal === goal.id

                return (
                  <Card
                    key={goal.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)] ${isSelected ? "ring-2 ring-secondary shadow-lg bg-secondary/5" : "hover:bg-card/80"
                      }`}
                    onClick={() => handleGoalSelect(goal.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full ${isSelected ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                            } flex items-center justify-center transition-colors`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {goal.title}
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-secondary" />}
                          </CardTitle>
                          <CardDescription className="mt-1">{goal.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>

            {selectedGoal && (
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Mục tiêu đã chọn:</p>
                <div className="flex justify-center">
                  <Badge variant="secondary" className="text-sm">
                    {learningGoals.find((g) => g.id === selectedGoal)?.title}
                  </Badge>
                </div>
              </div>
            )}
          </section>

          {/* Submit Button */}
          <div className="text-center pt-8">
            <Button
              onClick={handleSubmit}
              disabled={!selectedLevel || !selectedGoal || isSubmitting}
              size="lg"
              className="px-12 py-3 text-lg font-semibold"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Đang xử lý...
                </>
              ) : (
                "Lưu & Tiếp tục"
              )}
            </Button>

            {(!selectedLevel || !selectedGoal) && (
              <p className="text-sm text-muted-foreground mt-3">
                Vui lòng chọn trình độ hiện tại và mục tiêu để tiếp tục
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            Cần hỗ trợ?{" "}
            <a href="#" className="text-primary hover:underline">
              Liên hệ với chúng tôi
            </a>{" "}
            hoặc{" "}
            <a href="#" className="text-primary hover:underline">
              Gửi phản hồi
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
