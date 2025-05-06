import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Building, Award, ArrowRight } from "lucide-react"

// Stream data
const streamData = {
  science: {
    title: "Science Stream",
    description:
      "The Science stream focuses on developing analytical and problem-solving skills through the study of natural phenomena, mathematics, and technology.",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"],
    careers: [
      { title: "Engineering", description: "Design and build solutions to technical problems in various fields." },
      { title: "Medicine", description: "Diagnose and treat health issues as a doctor, surgeon, or specialist." },
      { title: "Research", description: "Advance knowledge through scientific inquiry and experimentation." },
      {
        title: "Information Technology",
        description: "Develop software, manage networks, or specialize in cybersecurity.",
      },
    ],
    colleges: [
      { name: "Indian Institutes of Technology (IITs)", location: "Multiple locations across India" },
      { name: "All India Institute of Medical Sciences (AIIMS)", location: "New Delhi and other cities" },
      { name: "Indian Institute of Science (IISc)", location: "Bangalore" },
      { name: "National Institute of Technology (NITs)", location: "Multiple locations across India" },
    ],
    exams: ["JEE Main & Advanced", "NEET", "BITSAT", "KVPY", "Olympiads"],
  },
  commerce: {
    title: "Commerce Stream",
    description:
      "The Commerce stream prepares students for careers in business, finance, and economics through practical and theoretical knowledge of commercial activities.",
    subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics", "Statistics"],
    careers: [
      {
        title: "Chartered Accountancy",
        description: "Manage financial records, audits, and provide financial advice.",
      },
      { title: "Business Management", description: "Plan, organize, and oversee business operations and strategies." },
      {
        title: "Banking & Finance",
        description: "Work in financial institutions managing investments and transactions.",
      },
      { title: "Entrepreneurship", description: "Start and run your own business ventures." },
    ],
    colleges: [
      { name: "Shri Ram College of Commerce", location: "Delhi" },
      { name: "St. Xavier's College", location: "Mumbai and Kolkata" },
      { name: "Christ University", location: "Bangalore" },
      { name: "Loyola College", location: "Chennai" },
    ],
    exams: ["CA Foundation", "CS Foundation", "CAT", "XAT", "CLAT (for BBA-LLB)"],
  },
  humanities: {
    title: "Humanities Stream",
    description:
      "The Humanities stream explores human culture, society, and expression through subjects that develop critical thinking and communication skills.",
    subjects: ["History", "Political Science", "Sociology", "Psychology", "Literature", "Geography"],
    careers: [
      { title: "Civil Services", description: "Serve in administrative roles in government departments." },
      { title: "Law", description: "Practice as an advocate, legal consultant, or judge." },
      { title: "Media & Journalism", description: "Create and share information through various media channels." },
      { title: "Education & Research", description: "Teach and conduct research in academic institutions." },
    ],
    colleges: [
      { name: "St. Stephen's College", location: "Delhi" },
      { name: "Lady Shri Ram College", location: "Delhi" },
      { name: "Presidency College", location: "Kolkata" },
      { name: "Fergusson College", location: "Pune" },
    ],
    exams: ["UPSC Civil Services", "CLAT", "CUET", "Entrance exams for specific colleges"],
  },
}

export default function StreamsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Academic Streams</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
        Explore the three main academic streams available after Class 10, each offering unique subjects, career
        opportunities, and educational pathways.
      </p>

      <Tabs defaultValue="science" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="science" id="science">
            Science
          </TabsTrigger>
          <TabsTrigger value="commerce" id="commerce">
            Commerce
          </TabsTrigger>
          <TabsTrigger value="humanities" id="humanities">
            Humanities
          </TabsTrigger>
        </TabsList>

        {Object.entries(streamData).map(([key, stream]) => (
          <TabsContent key={key} value={key} className="space-y-8">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 md:p-10 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{stream.title}</h2>
              <p className="text-lg mb-6">{stream.description}</p>

              <div className="flex flex-wrap gap-3 mb-6">
                {stream.subjects.map((subject, index) => (
                  <span key={index} className="px-4 py-2 bg-background rounded-full text-sm font-medium">
                    {subject}
                  </span>
                ))}
              </div>

              <Button asChild>
                <Link href="/quiz">
                  Find Your Fit <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-2">
                    <Briefcase className="h-5 w-5 mr-2 text-primary" />
                    <CardTitle>Career Opportunities</CardTitle>
                  </div>
                  <CardDescription>Popular career paths for {stream.title.toLowerCase()} students</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {stream.careers.map((career, index) => (
                      <li key={index} className="border-b border-border pb-3 last:border-0 last:pb-0">
                        <h4 className="font-semibold">{career.title}</h4>
                        <p className="text-muted-foreground text-sm">{career.description}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center mb-2">
                    <Building className="h-5 w-5 mr-2 text-secondary" />
                    <CardTitle>Top Colleges</CardTitle>
                  </div>
                  <CardDescription>Prestigious institutions for {stream.title.toLowerCase()} education</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {stream.colleges.map((college, index) => (
                      <li key={index} className="border-b border-border pb-3 last:border-0 last:pb-0">
                        <h4 className="font-semibold">{college.name}</h4>
                        <p className="text-muted-foreground text-sm">{college.location}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 mr-2 text-accent" />
                  <CardTitle>Important Entrance Exams</CardTitle>
                </div>
                <CardDescription>Key competitive exams for {stream.title.toLowerCase()} students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {stream.exams.map((exam, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-accent/10 text-accent-foreground rounded-md text-sm font-medium"
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Is {stream.title} Right for You?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Consider this stream if you:</h4>
                  <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                    {key === "science" && (
                      <>
                        <li>Enjoy solving complex problems</li>
                        <li>Are curious about how things work</li>
                        <li>Excel in mathematics and logical thinking</li>
                        <li>Are interested in technology and innovation</li>
                        <li>Want to pursue research or technical fields</li>
                      </>
                    )}
                    {key === "commerce" && (
                      <>
                        <li>Have an interest in business and economics</li>
                        <li>Enjoy working with numbers and statistics</li>
                        <li>Have good organizational and planning skills</li>
                        <li>Are interested in entrepreneurship</li>
                        <li>Want to understand how markets and finances work</li>
                      </>
                    )}
                    {key === "humanities" && (
                      <>
                        <li>Enjoy reading, writing, and discussing ideas</li>
                        <li>Are interested in human behavior and society</li>
                        <li>Have strong communication skills</li>
                        <li>Enjoy creative expression and critical thinking</li>
                        <li>Want to understand social and cultural dynamics</li>
                      </>
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-secondary mb-2">Skills you'll develop:</h4>
                  <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                    {key === "science" && (
                      <>
                        <li>Analytical thinking and problem-solving</li>
                        <li>Attention to detail and precision</li>
                        <li>Research methodology</li>
                        <li>Technical expertise</li>
                        <li>Data analysis and interpretation</li>
                      </>
                    )}
                    {key === "commerce" && (
                      <>
                        <li>Financial literacy and management</li>
                        <li>Business acumen and strategic thinking</li>
                        <li>Negotiation and decision-making</li>
                        <li>Market analysis</li>
                        <li>Entrepreneurial mindset</li>
                      </>
                    )}
                    {key === "humanities" && (
                      <>
                        <li>Critical thinking and analysis</li>
                        <li>Written and verbal communication</li>
                        <li>Research and information synthesis</li>
                        <li>Cultural awareness and empathy</li>
                        <li>Creative problem-solving</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Still Unsure Which Stream to Choose?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/quiz">Take the Career Quiz</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/career-paths">Explore Career Paths</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
