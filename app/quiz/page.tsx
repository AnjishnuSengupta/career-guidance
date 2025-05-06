"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

// Quiz questions data
const quizQuestions = [
  {
    id: 1,
    question: "Which of these activities do you enjoy the most?",
    options: [
      { id: "a", text: "Solving mathematical problems or puzzles", type: "science" },
      { id: "b", text: "Managing finances or planning budgets", type: "commerce" },
      { id: "c", text: "Writing stories or essays", type: "humanities" },
      { id: "d", text: "Building or fixing things", type: "science" },
    ],
  },
  {
    id: 2,
    question: "In a group project, which role do you naturally take?",
    options: [
      { id: "a", text: "The researcher who gathers information", type: "science" },
      { id: "b", text: "The organizer who manages tasks and timelines", type: "commerce" },
      { id: "c", text: "The communicator who presents ideas", type: "humanities" },
      { id: "d", text: "The problem-solver who finds solutions", type: "science" },
    ],
  },
  {
    id: 3,
    question: "Which subject do you find most interesting?",
    options: [
      { id: "a", text: "Mathematics or Physics", type: "science" },
      { id: "b", text: "Economics or Business Studies", type: "commerce" },
      { id: "c", text: "History or Literature", type: "humanities" },
      { id: "d", text: "Biology or Chemistry", type: "science" },
    ],
  },
  {
    id: 4,
    question: "How do you prefer to solve problems?",
    options: [
      { id: "a", text: "Analyzing data and finding patterns", type: "science" },
      { id: "b", text: "Weighing pros and cons to make decisions", type: "commerce" },
      { id: "c", text: "Discussing with others to find creative solutions", type: "humanities" },
      { id: "d", text: "Experimenting with different approaches", type: "science" },
    ],
  },
  {
    id: 5,
    question: "Which career sounds most appealing to you?",
    options: [
      { id: "a", text: "Engineer, Doctor, or Scientist", type: "science" },
      { id: "b", text: "Entrepreneur, Accountant, or Manager", type: "commerce" },
      { id: "c", text: "Writer, Teacher, or Psychologist", type: "humanities" },
      { id: "d", text: "Architect, IT Professional, or Researcher", type: "science" },
    ],
  },
  {
    id: 6,
    question: "What type of books or articles do you enjoy reading?",
    options: [
      { id: "a", text: "Scientific journals or technology news", type: "science" },
      { id: "b", text: "Business magazines or economic analyses", type: "commerce" },
      { id: "c", text: "Novels, poetry, or social commentaries", type: "humanities" },
      { id: "d", text: "How-to guides or instructional manuals", type: "science" },
    ],
  },
  {
    id: 7,
    question: "Which skill would you most like to develop?",
    options: [
      { id: "a", text: "Technical or analytical skills", type: "science" },
      { id: "b", text: "Leadership or negotiation skills", type: "commerce" },
      { id: "c", text: "Communication or creative skills", type: "humanities" },
      { id: "d", text: "Problem-solving or critical thinking skills", type: "science" },
    ],
  },
  {
    id: 8,
    question: "How do you make important decisions?",
    options: [
      { id: "a", text: "Gather data and analyze the facts", type: "science" },
      { id: "b", text: "Consider the practical outcomes and benefits", type: "commerce" },
      { id: "c", text: "Think about how it affects people and relationships", type: "humanities" },
      { id: "d", text: "Test different options and see what works best", type: "science" },
    ],
  },
]

// Career paths based on stream
const careerPaths = {
  science: [
    {
      title: "Engineering",
      description: "Design and build solutions to technical problems",
      fields: ["Mechanical", "Electrical", "Computer", "Civil"],
    },
    {
      title: "Medicine",
      description: "Diagnose and treat health issues",
      fields: ["Doctor", "Surgeon", "Dentist", "Pharmacist"],
    },
    {
      title: "Research",
      description: "Advance knowledge through scientific inquiry",
      fields: ["Physicist", "Chemist", "Biologist", "Data Scientist"],
    },
    {
      title: "Technology",
      description: "Develop and implement technological solutions",
      fields: ["Software Developer", "AI Specialist", "Cybersecurity Expert"],
    },
  ],
  commerce: [
    {
      title: "Business Management",
      description: "Plan, organize, and oversee operations",
      fields: ["Operations Manager", "Project Manager", "Business Analyst"],
    },
    {
      title: "Finance",
      description: "Manage and analyze financial resources",
      fields: ["Accountant", "Financial Analyst", "Investment Banker"],
    },
    {
      title: "Marketing",
      description: "Promote products and services",
      fields: ["Marketing Manager", "Brand Strategist", "Digital Marketer"],
    },
    {
      title: "Entrepreneurship",
      description: "Start and run your own business",
      fields: ["Startup Founder", "Small Business Owner", "Franchise Owner"],
    },
  ],
  humanities: [
    {
      title: "Education",
      description: "Teach and mentor others",
      fields: ["Teacher", "Professor", "Educational Consultant"],
    },
    {
      title: "Media & Communication",
      description: "Create and share information",
      fields: ["Journalist", "Content Creator", "Public Relations Specialist"],
    },
    {
      title: "Social Services",
      description: "Help individuals and communities",
      fields: ["Counselor", "Social Worker", "NGO Professional"],
    },
    {
      title: "Arts & Culture",
      description: "Express ideas through creative mediums",
      fields: ["Writer", "Designer", "Curator"],
    },
  ],
}

export default function CareerQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>(Array(quizQuestions.length).fill(""))
  const [showResults, setShowResults] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = selectedOption
      setAnswers(newAnswers)

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
      } else {
        setShowResults(true)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(answers[currentQuestion - 1])
    }
  }

  const calculateResults = () => {
    const streamCounts = {
      science: 0,
      commerce: 0,
      humanities: 0,
    }

    answers.forEach((answer, index) => {
      const question = quizQuestions[index]
      const selectedOption = question.options.find((option) => option.id === answer)
      if (selectedOption) {
        streamCounts[selectedOption.type as keyof typeof streamCounts]++
      }
    })

    // Find the stream with the highest count
    let recommendedStream: keyof typeof streamCounts = "science"
    let maxCount = 0

    for (const [stream, count] of Object.entries(streamCounts)) {
      if (count > maxCount) {
        maxCount = count
        recommendedStream = stream as keyof typeof streamCounts
      }
    }

    return {
      recommendedStream,
      streamCounts,
    }
  }

  const results = calculateResults()
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Career Aptitude Quiz</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Answer these questions honestly to discover which academic stream and career paths might be the best fit for
        your interests and strengths.
      </p>

      {!showResults ? (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </p>
              <Progress value={progress} className="w-32" />
            </div>
            <CardTitle className="text-xl md:text-2xl">{quizQuestions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
              {quizQuestions[currentQuestion].options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-2 mb-4 p-3 rounded-md hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleNext} disabled={!selectedOption}>
              {currentQuestion < quizQuestions.length - 1 ? (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Submit <CheckCircle2 className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-center">Your Results</CardTitle>
              <CardDescription className="text-center text-lg">Based on your answers, we recommend:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {results.recommendedStream.charAt(0).toUpperCase() + results.recommendedStream.slice(1)} Stream
                </h3>
                <p className="text-lg max-w-2xl mx-auto">
                  {results.recommendedStream === "science" &&
                    "You have a natural inclination towards analytical thinking and problem-solving. The Science stream would allow you to explore fields that require technical expertise and innovation."}
                  {results.recommendedStream === "commerce" &&
                    "You show strong organizational and practical skills. The Commerce stream would help you develop business acumen and prepare for careers in finance, management, and entrepreneurship."}
                  {results.recommendedStream === "humanities" &&
                    "You demonstrate excellent communication and creative abilities. The Humanities stream would nurture your expression and understanding of human behavior and society."}
                </p>
              </div>

              <h4 className="text-xl font-semibold mb-4">Potential Career Paths</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {careerPaths[results.recommendedStream].map((career, index) => (
                  <Card key={index} className="bg-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle>{career.title}</CardTitle>
                      <CardDescription>{career.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {career.fields.map((field, i) => (
                          <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {field}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4 flex-wrap">
              <Button asChild>
                <Link href={`/streams#${results.recommendedStream}`}>Learn More About This Stream</Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowResults(false)
                  setCurrentQuestion(0)
                  setAnswers(Array(quizQuestions.length).fill(""))
                  setSelectedOption(null)
                }}
              >
                Retake Quiz
              </Button>
            </CardFooter>
          </Card>

          <div className="text-center">
            <h4 className="text-xl font-semibold mb-4">Your Aptitude Breakdown</h4>
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
              <Card className="flex-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-primary">Science</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    {Math.round((results.streamCounts.science / quizQuestions.length) * 100)}%
                  </div>
                  <Progress
                    value={(results.streamCounts.science / quizQuestions.length) * 100}
                    className="h-2 bg-primary/20"
                  />
                </CardContent>
              </Card>
              <Card className="flex-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-secondary">Commerce</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    {Math.round((results.streamCounts.commerce / quizQuestions.length) * 100)}%
                  </div>
                  <Progress
                    value={(results.streamCounts.commerce / quizQuestions.length) * 100}
                    className="h-2 bg-secondary/20"
                  />
                </CardContent>
              </Card>
              <Card className="flex-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-accent">Humanities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    {Math.round((results.streamCounts.humanities / quizQuestions.length) * 100)}%
                  </div>
                  <Progress
                    value={(results.streamCounts.humanities / quizQuestions.length) * 100}
                    className="h-2 bg-accent/20"
                  />
                </CardContent>
              </Card>
            </div>
            <p className="text-muted-foreground">
              Remember, this is just a guide. You can always explore multiple interests across different streams!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
