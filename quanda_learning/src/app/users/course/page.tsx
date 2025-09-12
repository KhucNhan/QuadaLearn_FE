import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Target, Trophy, TrendingUp, Filter } from "lucide-react"
import { CourseCard } from "@/components/course/course-card";

export default function CoursesPage() {
  // Mock user data - trong thực tế sẽ lấy từ database/API
  const userData = {
    name: "Minh Anh",
    level: "Intermediate",
    completedCourses: 3,
    totalHours: 45,
    currentStreak: 7,
  }

  const recommendedCourses = [
    {
      id: "1",
      title: "Giao tiếp tiếng Anh hàng ngày",
      description: "Học cách giao tiếp tự nhiên trong các tình huống thường gặp",
      level: "Intermediate" as const,
      duration: "6 tuần",
      students: 12500,
      rating: 4.8,
      progress: 35,
      image: "/images/course/english-conversation-class.png",
      isRecommended: true,
    },
    {
      id: "2",
      title: "Ngữ pháp tiếng Anh nâng cao",
      description: "Nắm vững các cấu trúc ngữ pháp phức tạp",
      level: "Advanced" as const,
      duration: "8 tuần",
      students: 8900,
      rating: 4.9,
      image: "/images/course/english-grammar-books.jpg",
      isRecommended: true,
    },
    {
      id: "3",
      title: "Luyện nghe IELTS",
      description: "Cải thiện kỹ năng nghe để đạt điểm cao IELTS",
      level: "Intermediate" as const,
      duration: "10 tuần",
      students: 15600,
      rating: 4.7,
      image: "/images/course/ielts-listening-practice.jpg",
      isRecommended: true,
    },
  ]

  const allCourses = [
    {
      id: "4",
      title: "Tiếng Anh cho người mới bắt đầu",
      description: "Khóa học cơ bản dành cho người chưa biết gì về tiếng Anh",
      level: "Beginner" as const,
      duration: "12 tuần",
      students: 25000,
      rating: 4.6,
      image: "/images/course/english-alphabet-learning.jpg",
    },
    {
      id: "5",
      title: "Tiếng Anh thương mại",
      description: "Học tiếng Anh chuyên ngành kinh doanh và thương mại",
      level: "Advanced" as const,
      duration: "8 tuần",
      students: 7800,
      rating: 4.8,
      image: "/images/course/business-english-meeting.png",
    },
    {
      id: "6",
      title: "Phát âm tiếng Anh chuẩn",
      description: "Cải thiện phát âm và giọng điệu tiếng Anh",
      level: "Intermediate" as const,
      duration: "6 tuần",
      students: 11200,
      rating: 4.7,
      image: "/images/course/english-pronunciation-practice.png",
    },
    {
      id: "7",
      title: "Từ vựng tiếng Anh nâng cao",
      description: "Mở rộng vốn từ vựng với 3000+ từ thông dụng",
      level: "Intermediate" as const,
      duration: "10 tuần",
      students: 18900,
      rating: 4.5,
      image: "/images/course/english-vocabulary-flashcards.png",
    },
    {
      id: "8",
      title: "Luyện thi TOEIC",
      description: "Chuẩn bị tốt nhất cho kỳ thi TOEIC",
      level: "Advanced" as const,
      duration: "12 tuần",
      students: 13400,
      rating: 4.9,
      image: "/images/course/toeic-test-preparation.jpg",
    },
    {
      id: "9",
      title: "Tiếng Anh cho trẻ em",
      description: "Khóa học vui nhộn dành cho trẻ từ 6-12 tuổi",
      level: "Beginner" as const,
      duration: "16 tuần",
      students: 32000,
      rating: 4.8,
      image: "/images/course/children-learning-english-with-games.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header isLoggedIn={true} userName={userData.name} /> */}

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng trở lại, {userData.name}! 👋</h1>
          <p className="text-gray-600">Hãy tiếp tục hành trình học tiếng Anh của bạn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{userData.completedCourses}</p>
                  <p className="text-sm text-gray-600">Khóa học hoàn thành</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{userData.totalHours}h</p>
                  <p className="text-sm text-gray-600">Tổng thời gian học</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Trophy className="w-8 h-8 text-yellow-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{userData.currentStreak}</p>
                  <p className="text-sm text-gray-600">Ngày liên tiếp</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <Badge className="bg-yellow-100 text-yellow-800 mb-1">
                    {userData.level === "Intermediate" ? "Trung cấp" : userData.level}
                  </Badge>
                  <p className="text-sm text-gray-600">Trình độ hiện tại</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Courses */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Khóa học đề xuất cho bạn</h2>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {recommendedCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))} */}
          </div>
        </section>

        {/* All Courses */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tất cả khóa học</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {allCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))} */}
          </div>
        </section>
      </main>
    </div>
  )
}
