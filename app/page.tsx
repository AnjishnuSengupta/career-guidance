"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  ChevronRight,
  Menu,
  X,
  User,
  LogOut,
  Search,
  ArrowRight,
  Send,
  BookOpen,
  School,
  Briefcase,
  Award,
  MapPin,
  DollarSign,
  GraduationCap,
  Mail,
  Phone,
  Trophy,
  Code,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { VideoPlayer } from "@/components/video-player";
import LoginPage from "@/components/login-page";
import SignupPage from "@/components/signup-page"


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState("home")
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [quizResult, setQuizResult] = useState<null | {
    stream: string
    careers: string[]
    description: string
  }>(null)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")

  const fetchCourseVideos = async (streamType = "") => {
    setIsLoadingVideos(true);
    try {
      let query = "career guidance";
      
      if (streamType) {
        const queryMap: Record<string, string> = {
          "Science": "science career paths technology engineering mathematics",
          "Commerce": "commerce business finance career paths",
          "Humanities": "humanities social science career options",
          "Arts & Design": "creative arts design career opportunities"
        };
        query = queryMap[streamType] || `${streamType} careers`;
      }
    
      const response = await fetch(`/api/youtube?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos from API');
      }
      
      const data = await response.json();
      setCourseVideos(data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setIsLoadingVideos(false);
    }
  };

  // Add this after defining fetchCourseVideos
  useEffect(() => {
    // Load default videos when the page loads
    fetchCourseVideos();
  }, []);

  const [showFirstTimeModal, setShowFirstTimeModal] = useState(false)
  const [courseVideos, setCourseVideos] = useState<Array<{
    id: string;
    title: string;
    thumbnail?: string;
    channelTitle: string;
    publishedAt: string;
    videoId: string;
  }>>([])
  const [isLoadingVideos, setIsLoadingVideos] = useState(false)
  const [currentUniversityIndex, setCurrentUniversityIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Universities data
  const universities = [
    {
      name: "Delhi University",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Academics", "Research", "Co-curriculars"],
      courses: ["B.Com", "B.Tech", "BA", "BSc", "MA", "MSc"],
      location: "New Delhi, India",
      fees: "₹20,000 - ₹50,000 per year",
      scholarships: "Merit-based and need-based scholarships available",
    },
    {
      name: "IIT Bombay",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Engineering", "Research", "Technology"],
      courses: ["B.Tech", "M.Tech", "PhD", "Dual Degree Programs"],
      location: "Mumbai, India",
      fees: "₹2,00,000 per year",
      scholarships: "Merit-based scholarships and financial aid available",
    },
    {
      name: "Christ University",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Academics", "Sports", "Arts"],
      courses: ["BBA", "B.Com", "BA", "BSc", "MBA"],
      location: "Bangalore, India",
      fees: "₹1,50,000 - ₹3,00,000 per year",
      scholarships: "Merit scholarships and sports scholarships available",
    },
    {
      name: "AIIMS",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Medicine", "Research", "Healthcare"],
      courses: ["MBBS", "MD", "MS", "PhD"],
      location: "Multiple cities across India",
      fees: "₹1,500 - ₹50,000 per year",
      scholarships: "Government subsidized education",
    },
    {
      name: "Symbiosis International University",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["Academics", "International", "Co-curriculars"],
      courses: ["Law", "Management", "Media", "Computer Science"],
      location: "Pune, India",
      fees: "₹3,00,000 - ₹5,00,000 per year",
      scholarships: "Merit-based and sports scholarships available",
    },
  ]

  // Check if user is first time visitor
  const isFirstTimeUser = () => {
    if (typeof window !== "undefined") {
      const visited = localStorage.getItem("pathway_visited")
      if (!visited && isLoggedIn) {
        localStorage.setItem("pathway_visited", "true")
        return true
      }
    }
    return false
  }

  // Check for first time users
  useEffect(() => {
    if (isFirstTimeUser()) {
      setShowFirstTimeModal(true)
    }
  }, [isLoggedIn])

  // University carousel auto-rotation
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentUniversityIndex((prev) => (prev === universities.length - 1 ? 0 : prev + 1))
      }, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPaused, universities.length])

  // Quiz questions
  const quizQuestions = [
    {
      question: "What subjects do you enjoy the most?",
      options: ["Mathematics and Physics", "Accounting and Economics", "History and Literature", "Art and Design"],
    },
    {
      question: "How do you prefer to solve problems?",
      options: [
        "Analytical thinking and calculations",
        "Strategic planning and organization",
        "Research and critical analysis",
        "Creative thinking and visualization",
      ],
    },
    {
      question: "What type of activities do you enjoy in your free time?",
      options: [
        "Building things or conducting experiments",
        "Managing finances or planning events",
        "Reading, writing, or debating",
        "Creating art or designing",
      ],
    },
    {
      question: "In a group project, what role do you usually take?",
      options: ["Technical problem solver", "Organizer and coordinator", "Researcher and writer", "Creative director"],
    },
    {
      question: "What kind of future work environment appeals to you most?",
      options: [
        "Laboratory, tech company, or engineering firm",
        "Corporate office, bank, or business setting",
        "School, publishing house, or social service",
        "Design studio, media company, or freelance",
      ],
    },
  ]

  // Quiz results based on most common answer
  const quizResults = [
    {
      stream: "Science",
      careers: ["Engineering", "Medicine", "Research Scientist", "Data Analyst", "IT Professional"],
      description:
        "You have a strong analytical mind and enjoy solving complex problems. The Science stream would allow you to explore subjects like Physics, Chemistry, Biology, and Mathematics, opening doors to careers in engineering, medicine, research, and technology.",
    },
    {
      stream: "Commerce",
      careers: ["Chartered Accountant", "Business Manager", "Financial Analyst", "Marketing Executive", "Entrepreneur"],
      description:
        "You have excellent organizational skills and a strategic mindset. The Commerce stream would help you develop expertise in business, economics, accounting, and management, preparing you for careers in finance, business, marketing, and entrepreneurship.",
    },
    {
      stream: "Humanities",
      careers: ["Lawyer", "Journalist", "Psychologist", "Teacher", "Social Worker"],
      description:
        "You have strong communication skills and a deep interest in human behavior and society. The Humanities stream would allow you to study subjects like History, Political Science, Psychology, and Literature, leading to careers in law, education, journalism, and social services.",
    },
    {
      stream: "Arts & Design",
      careers: ["Graphic Designer", "UX/UI Designer", "Animator", "Fashion Designer", "Architect"],
      description:
        "You have a creative mind and strong visual thinking skills. The Arts stream would nurture your creativity through subjects like Fine Arts, Design, and Media Studies, preparing you for careers in design, animation, architecture, and creative industries.",
    },
  ]

  // Streams data
  const streams = [
    {
      title: "Science",
      description: "The foundation for careers in technology, healthcare, and research",
      subjects: ["Physics", "Chemistry", "Biology", "Mathematics"],
      careers: ["Engineering", "Medicine", "Research", "IT"],
      opportunities: "High demand in tech, healthcare, and research sectors globally",
    },
    {
      title: "Commerce",
      description: "The pathway to business, finance, and entrepreneurship",
      subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
      careers: ["Chartered Accountancy", "Business Management", "Banking", "Marketing"],
      opportunities: "Excellent prospects in corporate, finance, and entrepreneurial ventures",
    },
    {
      title: "Humanities",
      description: "Understanding society, human behavior, and communication",
      subjects: ["History", "Political Science", "Psychology", "Sociology", "Literature"],
      careers: ["Law", "Journalism", "Teaching", "Civil Services", "Psychology"],
      opportunities: "Growing demand in education, media, legal, and social sectors",
    },
  ]

  // Courses data
  const courses = [
    {
      name: "B.Tech (Engineering)",
      stream: "Science",
      scope: "High demand across industries, especially in IT, manufacturing, and infrastructure",
      jobs: ["Software Engineer", "Product Manager", "Systems Analyst", "Research Engineer"],
    },
    {
      name: "B.Com (Commerce)",
      stream: "Commerce",
      scope: "Foundation for careers in business, finance, and accounting",
      jobs: ["Accountant", "Financial Analyst", "Business Consultant", "Banking Professional"],
    },
    {
      name: "BA Psychology",
      stream: "Humanities",
      scope: "Growing field with applications in healthcare, education, and corporate sectors",
      jobs: ["Counselor", "HR Specialist", "Research Assistant", "Social Worker"],
    },
    {
      name: "BBA (Business Administration)",
      stream: "Commerce",
      scope: "Versatile degree for various business and management roles",
      jobs: ["Business Analyst", "Marketing Executive", "Operations Manager", "Entrepreneur"],
    },
    {
      name: "BSc Computer Science",
      stream: "Science",
      scope: "Excellent prospects in the rapidly growing tech industry",
      jobs: ["Software Developer", "Data Scientist", "Cybersecurity Specialist", "AI Engineer"],
    },
    {
      name: "BA Economics",
      stream: "Humanities/Commerce",
      scope: "Valuable for roles in finance, policy, and research",
      jobs: ["Economic Analyst", "Policy Researcher", "Banking Professional", "Consultant"],
    },
  ]

  // Career paths data
  const careerPaths = [
    {
      stream: "Science",
      education: ["B.Tech in Computer Science", "Masters in AI/ML (optional)"],
      career: "Software Developer",
      progression: ["Junior Developer", "Senior Developer", "Tech Lead", "CTO"],
    },
    {
      stream: "Commerce",
      education: ["B.Com", "CA/CFA"],
      career: "Chartered Accountant",
      progression: ["Articled Assistant", "CA", "Finance Manager", "CFO"],
    },
    {
      stream: "Humanities",
      education: ["BA in Psychology", "Masters in Clinical Psychology"],
      career: "Psychologist",
      progression: ["Counselor", "Therapist", "Clinical Psychologist", "Psychology Professor"],
    },
    {
      stream: "Science",
      education: ["MBBS", "MD/MS"],
      career: "Doctor",
      progression: ["House Surgeon", "Resident Doctor", "Specialist", "Chief of Medicine"],
    },
    {
      stream: "Humanities",
      education: ["BA in Law", "LLB"],
      career: "Lawyer",
      progression: ["Junior Lawyer", "Associate", "Partner", "Senior Partner"],
    },
  ]

  // Resources data
  const resources = [
    {
      title: "Complete Guide to Entrance Exams",
      description: "Comprehensive information about JEE, NEET, CLAT, CAT, and other entrance exams",
      link: "#",
    },
    {
      title: "Top 50 Colleges in India",
      description: "Detailed rankings and information about the best colleges across streams",
      link: "#",
    },
    {
      title: "Scholarship Opportunities",
      description: "List of scholarships available for undergraduate and postgraduate students",
      link: "#",
    },
    {
      title: "Career Aptitude Test Preparation",
      description: "Resources to help you prepare for career aptitude tests",
      link: "#",
    },
    {
      title: "Interview Preparation Guide",
      description: "Tips and strategies for acing college and job interviews",
      link: "#",
    },
  ]

  // Chat messages
  const chatMessages = [
    {
      sender: "Mentor",
      name: "Dr. Sharma",
      message: "Hello! I'm Dr. Sharma, a career counselor with 15 years of experience. How can I help you today?",
      time: "10:30 AM",
    },
    {
      sender: "Student",
      name: "Rahul",
      message:
        "Hi Dr. Sharma! I'm confused between choosing Engineering and Medicine. I enjoy both Physics and Biology. What factors should I consider?",
      time: "10:32 AM",
    },
    {
      sender: "Mentor",
      name: "Dr. Sharma",
      message:
        "Great question, Rahul! Consider your long-term interests, work-life balance preferences, and the type of work environment you'd enjoy. Engineering offers more diverse career paths, while Medicine provides direct impact on people's lives but requires longer education. Would you like to discuss the day-to-day realities of both professions?",
      time: "10:35 AM",
    },
  ]

  // Handle quiz submission
  const handleQuizSubmit = () => {
    // Count the frequency of each answer type
    const answerCounts = [0, 0, 0, 0];
    quizAnswers.forEach((answer) => {
      answerCounts[answer]++;
    });
  
    // Find the most common answer
    let maxCount = 0;
    let maxIndex = 0;
    answerCounts.forEach((count, index) => {
      if (count > maxCount) {
        maxCount = count;
        maxIndex = index;
      }
    });
  
    // Get the quiz result based on the most common answer
    const result = quizResults[maxIndex];
    
    // Set the result in state
    setQuizResult(result);
    setQuizStep(quizQuestions.length + 1);
    
    // Fetch YouTube videos based on the recommended stream
    fetchCourseVideos(result.stream);
  };

// Handle login
const handleLogin = (email: string, password: string) => {
  console.log("Login attempt with:", email, password)
  setIsLoggedIn(true)
  setCurrentSection("home")
}

// Handle signup
const handleSignup = (email: string, password: string) => {
  console.log("Signup with:", email, password)
  setIsLoggedIn(true)
  setCurrentSection("home")
}

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentSection("home")
  }

  // Handle quiz answer selection
  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers]
    newAnswers[quizStep] = answerIndex
    setQuizAnswers(newAnswers)

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1)
    } else {
      handleQuizSubmit()
    }
  
  }

  // Handle tab change for videos
const handleTabChange = (value: string) => {
  // Map tab values to stream names
  const streamMap: Record<string, string> = {
    "science": "Science",
    "commerce": "Commerce",
    "humanities": "Humanities"
  };
  
  // If it's "all", fetch general videos, otherwise fetch stream-specific ones
  if (value === "all") {
    fetchCourseVideos();
  } else if (streamMap[value]) {
    fetchCourseVideos(streamMap[value]);
  }
};

  // Reset quiz
  const resetQuiz = () => {
    setQuizStarted(false)
    setQuizStep(0)
    setQuizAnswers([])
    setQuizResult(null)
  }

  // Navigation component
  const Navigation = () => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-purple-600">Pathway</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {["courses", "universities", "chat", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => setCurrentSection(item)}
              className={`text-sm font-medium transition-colors duration-300 ${
                currentSection === item ? "text-purple-600" : "text-gray-600 hover:text-purple-500"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}

          {isLoggedIn ? (
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-gray-600 hover:text-purple-500">
                <User size={18} className="mr-1" />
                Profile
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                <button
                  onClick={() => setCurrentSection("profile")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 w-full text-left"
                >
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 w-full text-left flex items-center"
                >
                  <LogOut size={16} className="mr-2" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setCurrentSection("login")}
              className="text-sm font-medium text-purple-600 hover:text-purple-500"
            >
              Login
            </button>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-500 hover:text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {["courses", "universities", "chat", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setCurrentSection(item)
                  setMobileMenuOpen(false)
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  currentSection === item
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    setCurrentSection("profile")
                    setMobileMenuOpen(false)
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 w-full text-left"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 w-full text-left flex items-center"
                >
                  <LogOut size={16} className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setCurrentSection("login")
                  setMobileMenuOpen(false)
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-purple-700 hover:bg-purple-50 w-full text-left"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )

  // Home section
  const HomeSection = () => (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Your Future Starts Here</h1>
            <p className="text-xl text-gray-600 mb-8">Helping you choose the right stream, career and college.</p>
            <Button
              onClick={() => {
                setCurrentSection("quiz")
                setQuizStarted(true)
              }}
              className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3"
            >
              Take the Career Quiz
            </Button>
          </div>
          <div className="md:w-1/2">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Students planning their future"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Discover Your Stream</h3>
            <p className="text-gray-600">
              Find the perfect academic stream that aligns with your interests, skills, and career goals.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <School className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Explore Universities</h3>
            <p className="text-gray-600">
              Browse through top universities and colleges that offer programs matching your interests.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Briefcase className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Plan Your Career</h3>
            <p className="text-gray-600">
              Explore various career paths and understand the steps needed to achieve your professional goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  )

  // Quiz section
  const QuizSection = () => (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        {!quizStarted ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Career Aptitude Quiz</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover which stream and career path might be the best fit for you based on your interests, skills, and
              preferences.
            </p>
            <Button
              onClick={() => setQuizStarted(true)}
              className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3"
            >
              Start Quiz
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8">
            {quizStep < quizQuestions.length ? (
              <>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Question {quizStep + 1} of {quizQuestions.length}
                    </span>
                    <span className="text-sm font-medium text-purple-600">
                      {Math.round((quizStep / quizQuestions.length) * 100)}% Complete
                    </span>
                  </div>
                  <Progress value={(quizStep / quizQuestions.length) * 100} className="h-2" />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-6">{quizQuestions[quizStep].question}</h3>

                <div className="space-y-4">
                  {quizQuestions[quizStep].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-sm">{String.fromCharCode(65 + index)}</span>
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="text-purple-600" size={40} />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Result: {quizResult?.stream}</h3>

                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">{quizResult?.description}</p>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-3">Recommended Careers:</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {quizResult?.careers.map((career, index) => (
                      <Badge key={index} className="bg-purple-100 text-purple-800 hover:bg-purple-200 px-3 py-1">
                        {career}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    onClick={resetQuiz}
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    Retake Quiz
                  </Button>
                  <Button onClick={() => setCurrentSection("streams")} className="bg-purple-600 hover:bg-purple-700">
                    Explore Streams
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )

  // Streams section
  const StreamsSection = () => (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Stream Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {streams.map((stream, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle>{stream.title}</CardTitle>
                <CardDescription>{stream.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-500 mb-2">Core Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {stream.subjects.map((subject, idx) => (
                      <Badge key={idx} variant="outline" className="bg-gray-50">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-gray-500 mb-2">Career Options</h4>
                  <div className="flex flex-wrap gap-2">
                    {stream.careers.map((career, idx) => (
                      <Badge key={idx} className="bg-purple-100 text-purple-800">
                        {career}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div>
                  <h4 className="font-semibold text-sm text-gray-500 mb-2">Future Opportunities</h4>
                  <p className="text-sm text-gray-600">{stream.opportunities}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )

  // Courses section
  const CoursesSection = () => (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Explore Courses</h2>

        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search your course"
              className="pl-10 pr-4 py-3 rounded-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span className="mr-2">Recommended by AI</span>
            <Badge className="bg-purple-100 text-purple-800">Personalized</Badge>
          </h3>

          <div className="flex overflow-x-auto pb-4 space-x-4 -mx-4 px-4">
            {courses.slice(0, 4).map((course, index) => (
              <Card key={index} className="min-w-[300px] max-w-[300px] flex-shrink-0">
                <CardHeader>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline">{course.stream}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-500 mb-1">Scope</h4>
                    <p className="text-sm">{course.scope}</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full">
                    <h4 className="font-semibold text-sm text-gray-500 mb-1">Job Opportunities</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.jobs.slice(0, 2).map((job, idx) => (
                        <Badge key={idx} className="bg-blue-100 text-blue-800">
                          {job}
                        </Badge>
                      ))}
                      {course.jobs.length > 2 && (
                        <Badge className="bg-gray-100 text-gray-800">+{course.jobs.length - 2} more</Badge>
                      )}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-3 mb-8 w-full max-w-md mx-auto">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="science">Science</TabsTrigger>
          <TabsTrigger value="commerce">Commerce</TabsTrigger>
        </TabsList>

          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline">{course.stream}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-500 mb-1">Scope</h4>
                    <p className="text-sm">{course.scope}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-500 mb-1">Job Opportunities</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.jobs.map((job, idx) => (
                        <Badge key={idx} className="bg-blue-100 text-blue-800">
                          {job}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="science" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course) => course.stream === "Science")
              .map((course, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>
                      <Badge variant="outline">{course.stream}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 mb-1">Scope</h4>
                      <p className="text-sm">{course.scope}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 mb-1">Job Opportunities</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.jobs.map((job, idx) => (
                          <Badge key={idx} className="bg-blue-100 text-blue-800">
                            {job}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="commerce" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course) => course.stream === "Commerce" || course.stream.includes("Commerce"))
              .map((course, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{course.name}</CardTitle>
                    <CardDescription>
                      <Badge variant="outline">{course.stream}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 mb-1">Scope</h4>
                      <p className="text-sm">{course.scope}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 mb-1">Job Opportunities</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.jobs.map((job, idx) => (
                          <Badge key={idx} className="bg-blue-100 text-blue-800">
                            {job}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )

  // Universities section
  const UniversitiesSection = () => (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">University Catalogue</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((university, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <img
                      src={university.image || "/placeholder.svg"}
                      alt={university.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                  </CardContent>
                  <CardHeader>
                    <CardTitle>{university.name}</CardTitle>
                    <CardDescription>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {university.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="bg-gray-50">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>{university.name}</DialogTitle>
                  <DialogDescription>
                    <div className="flex items-center mt-1">
                      <MapPin size={16} className="text-gray-500 mr-1" />
                      <span className="text-gray-600">{university.location}</span>
                    </div>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-500 mb-2">Courses Offered</h4>
                    <div className="flex flex-wrap gap-2">
                      {university.courses.map((course, idx) => (
                        <Badge key={idx} className="bg-purple-100 text-purple-800">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-gray-500 mb-2">Fees</h4>
                    <div className="flex items-center">
                      <DollarSign size={16} className="text-gray-500 mr-1" />
                      <span className="text-gray-700">{university.fees}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-gray-500 mb-2">Scholarships</h4>
                    <p className="text-gray-700 text-sm">{university.scholarships}</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-purple-600 hover:bg-purple-700">Apply Now</Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )

  // Career paths section
  const CareersSection = () => (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Career Path Explorer</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {careerPaths.map((path, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{path.career}</CardTitle>
                <CardDescription>
                  <Badge variant="outline">{path.stream} Stream</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-sm text-gray-500 mb-2">Education Path</h4>
                  <div className="space-y-3">
                    {path.education.map((edu, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                          {idx + 1}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="text-gray-700">{edu}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-gray-500 mb-2">Career Progression</h4>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    <div className="space-y-3">
                      {path.progression.map((step, idx) => (
                        <div key={idx} className="flex items-center relative">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 z-10">
                            <GraduationCap size={16} />
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="text-gray-700">{step}</div>
                          </div>
                          {idx < path.progression.length - 1 && (
                            <ArrowRight
                              size={16}
                              className="text-gray-400 absolute left-4 top-10 transform -translate-x-1/2"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )

  // Chat section
  const ChatSection = () => (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Connect with Mentors</h2>

        <Card>
          <CardHeader>
            <CardTitle>Mentorship Chatroom</CardTitle>
            <CardDescription>Get advice from experienced mentors and university representatives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto space-y-4">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === "Student" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.sender === "Student"
                        ? "bg-purple-100 text-gray-800"
                        : "bg-white border border-gray-200 text-gray-800"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{message.name}</span>
                      <span className="text-xs text-gray-500 ml-2">{message.time}</span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full">
              <Input placeholder="Type your message..." className="rounded-r-none" />
              <Button className="rounded-l-none bg-purple-600 hover:bg-purple-700">
                <Send size={18} />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  )

  // Resources section
  const ResourcesSection = () => (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Resources</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{resource.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Resource
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )

  // Contact section
  const ContactSection = () => (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Contact Us</h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 bg-purple-50 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Our Details</h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <MapPin className="text-purple-600" size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-gray-600">123 Education Lane, Knowledge City, 400001</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <Mail className="text-purple-600" size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-600">support@pathway.edu</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <Phone className="text-purple-600" size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-gray-600">+91 9876543210</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>Have questions? We're here to help you.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <Input id="name" placeholder="John Doe" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Your message here..." rows={4} />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Send Message</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )

  // Profile section
  const ProfileSection = () => (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-purple-600 h-32 md:h-48 relative">
            <div className="absolute -bottom-16 left-8">
              <Avatar className="h-32 w-32 border-4 border-white">
                <AvatarFallback className="text-4xl bg-purple-200 text-purple-600">RS</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="pt-20 px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">Rahul Sharma</h2>
                <p className="text-gray-600">Class 12 • New Delhi, India</p>
              </div>
              <Button className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700">Edit Profile</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Mathematics</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Science</span>
                        <span className="text-sm font-medium">88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">English</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Social Studies</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements & Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Award className="text-blue-600" size={24} />
                      </div>
                      <h4 className="font-medium text-sm">Science Olympiad</h4>
                      <p className="text-xs text-gray-500">State Rank 5</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Trophy className="text-green-600" size={24} />
                      </div>
                      <h4 className="font-medium text-sm">Debate Champion</h4>
                      <p className="text-xs text-gray-500">School Level</p>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg text-center">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <BookOpen className="text-amber-600" size={24} />
                      </div>
                      <h4 className="font-medium text-sm">Quiz Master</h4>
                      <p className="text-xs text-gray-500">Regional Winner</p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Code className="text-purple-600" size={24} />
                      </div>
                      <h4 className="font-medium text-sm">Coding Ninja</h4>
                      <p className="text-xs text-gray-500">Hackathon Winner</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Career Recommendations</CardTitle>
                  <CardDescription>Based on your quiz results and academic performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Software Engineering</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Your strong performance in Mathematics and interest in problem-solving make this a great fit.
                      </p>
                      <Badge className="bg-green-100 text-green-800">95% Match</Badge>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Data Science</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Your analytical skills and mathematics aptitude align well with this growing field.
                      </p>
                      <Badge className="bg-green-100 text-green-800">90% Match</Badge>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">AI Research</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Your problem-solving abilities and science background make this an exciting option.
                      </p>
                      <Badge className="bg-amber-100 text-amber-800">85% Match</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

// Course Videos section
const CourseVideosSection = () => (
  <section className="py-16 px-4 bg-gray-50">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Course Videos</h2>
      {isLoadingVideos ? (
        <div className="flex justify-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <VideoPlayer videoId={video.videoId || video.id} title={video.title} />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{video.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{video.channelTitle}</p>
                <p className="text-gray-500 text-xs">{video.publishedAt}</p>
              </CardContent>
            </Card>
      ))}
        </div>
      )}
    </div>
  </section>
)

  // University Carousel section
  const UniversityCarouselSection = () => (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Universities</h2>

        <div
          className="relative max-w-3xl mx-auto h-[500px] overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {universities.map((university, index) => (
            <div
              key={university.name}
              className={`absolute w-full transition-all duration-700 ease-in-out ${
                index === currentUniversityIndex ? "top-0 opacity-100" : "top-[600px] opacity-0"
              }`}
            >
              <Card className="overflow-hidden h-[500px]">
                <div className="h-64 overflow-hidden">
                  <img
                    src={university.image || "/placeholder.svg"}
                    alt={university.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{university.name}</CardTitle>
                  <CardDescription>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {university.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="bg-gray-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 mb-1">Key Programs</h4>
                      <div className="flex flex-wrap gap-2">
                        {university.courses.slice(0, 3).map((course, idx) => (
                          <Badge key={idx} className="bg-purple-100 text-purple-800">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-500 mb-1">Location</h4>
                      <p className="text-gray-700 text-sm">{university.location}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">View Details</Button>
                </CardFooter>
              </Card>
            </div>
          ))}

          {/* Carousel indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {universities.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentUniversityIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentUniversityIndex ? "bg-purple-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )

  // First Time User Modal
  const FirstTimeUserModal = () => (
    <Dialog open={showFirstTimeModal} onOpenChange={setShowFirstTimeModal}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Welcome to Pathway!</DialogTitle>
          <DialogDescription>
            Let's personalize your experience to help you find the perfect career path.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Quick Career Assessment</h3>
            <p className="text-gray-600 mb-4">What subjects do you enjoy the most?</p>
            <div className="grid grid-cols-2 gap-3">
              {["Mathematics & Physics", "Business & Economics", "Literature & Arts", "Biology & Chemistry"].map(
                (subject, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"
                  >
                    {subject}
                  </Button>
                ),
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Your Location</h3>
            <p className="text-gray-600 mb-4">This helps us recommend nearby institutions</p>
            <div className="flex space-x-3">
              <Input placeholder="City" className="flex-1" />
              <Input placeholder="State/Province" className="flex-1" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Video Preferences</h3>
            <p className="text-gray-600 mb-4">What type of educational content interests you?</p>
            <div className="grid grid-cols-2 gap-3">
              {["Career Guidance", "Course Overviews", "Student Experiences", "Industry Insights"].map(
                (pref, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"
                  >
                    {pref}
                  </Button>
                ),
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => setShowFirstTimeModal(false)}>
            Save Preferences & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  // Main content
  return (
    <div className="min-h-screen bg-white">
      {currentSection === "login" ? (
        authMode === "login" ? (
          <LoginPage 
            onLogin={handleLogin} 
            onSwitchToSignup={() => setAuthMode("signup")}
          />
        ) : (
          <SignupPage 
            onSignup={handleSignup}
            onSwitchToLogin={() => setAuthMode("login")}
          />
        )
      ) : (
        <>
          <Navigation />
          {/* Add padding to account for fixed navbar */}
          <div className="pt-16">
            {currentSection === "home" && (
              <>
                <HomeSection />
                <CourseVideosSection />
                <UniversityCarouselSection />
              </>
            )}
            {currentSection === "courses" && <CoursesSection />}
            {currentSection === "universities" && <UniversitiesSection />}
            {currentSection === "chat" && <ChatSection />}
            {currentSection === "contact" && <ContactSection />}
            {currentSection === "profile" && <ProfileSection />}
            {currentSection === "quiz" && <QuizSection />}
            {currentSection === "streams" && <StreamsSection />}
            {currentSection === "careers" && <CareersSection />}
            {currentSection === "resources" && <ResourcesSection />}
          </div>

          {/* First Time User Modal */}
          <FirstTimeUserModal />
        </>
      )}
    </div>
  )
}
