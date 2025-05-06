import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, ExternalLink, BookOpen, Video, FileText, GraduationCap } from "lucide-react"

// Resource data
const resources = {
  exams: [
    {
      title: "JEE Main & Advanced Guide",
      description: "Comprehensive guide for engineering entrance preparation",
      type: "PDF",
      icon: FileText,
      link: "#",
    },
    {
      title: "NEET Preparation Strategy",
      description: "Tips and strategies for medical entrance exam",
      type: "Article",
      icon: BookOpen,
      link: "#",
    },
    {
      title: "CAT Exam Walkthrough",
      description: "Video explanation of MBA entrance exam pattern",
      type: "Video",
      icon: Video,
      link: "#",
    },
    {
      title: "UPSC Civil Services Roadmap",
      description: "Step-by-step preparation guide for civil services",
      type: "PDF",
      icon: FileText,
      link: "#",
    },
    {
      title: "CLAT Preparation Tips",
      description: "Strategies for law entrance examination",
      type: "Article",
      icon: BookOpen,
      link: "#",
    },
    {
      title: "Entrance Exam Calendar 2023-24",
      description: "Important dates for all major entrance exams",
      type: "PDF",
      icon: FileText,
      link: "#",
    },
  ],
  colleges: [
    {
      title: "Top Engineering Colleges in India",
      description: "Ranking and admission details for engineering institutions",
      type: "Article",
      icon: BookOpen,
      link: "#",
    },
    {
      title: "Medical College Admission Process",
      description: "Guide to getting into top medical colleges",
      type: "Video",
      icon: Video,
      link: "#",
    },
    {
      title: "Commerce College Comparison",
      description: "Detailed comparison of top commerce colleges",
      type: "PDF",
      icon: FileText,
      link: "#",
    },
    {
      title: "Liberal Arts Universities Guide",
      description: "Overview of best humanities and liberal arts programs",
      type: "Article",
      icon: BookOpen,
      link: "#",
    },
    {
      title: "College Campus Virtual Tours",
      description: "Virtual walkthrough of top college campuses",
      type: "Video",
      icon: Video,
      link: "#",
    },
    {
      title: "Scholarship Opportunities Guide",
      description: "List of scholarships available at various institutions",
      type: "PDF",
      icon: FileText,
      link: "#",
    },
  ],
  aptitude: [
    {
      title: "Career Aptitude Test",
      description: "Comprehensive test to identify your strengths and interests",
      type: "Interactive",
      icon: GraduationCap,
      link: "/quiz",
    },
    {
      title: "Multiple Intelligence Assessment",
      description: "Discover your dominant intelligence types",
      type: "PDF",
      icon: FileText,
      link: "#",
    },
    {
      title: "Personality and Career Matching",
      description: "How your personality traits align with career options",
      type: "Article",
      icon: BookOpen,
      link: "#",
    },
    {
      title: "Skills Assessment Framework",
      description: "Framework to evaluate your technical and soft skills",
      type: "PDF",
      icon: FileText,
      link: "#",
    },
    {
      title: "Interest Mapping Exercise",
      description: "Activity to map your interests to potential careers",
      type: "Interactive",
      icon: GraduationCap,
      link: "#",
    },
    {
      title: "Career Values Clarification",
      description: "Identify what you value most in your future career",
      type: "Video",
      icon: Video,
      link: "#",
    },
  ],
}

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Career Resources</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
        Access guides, articles, videos, and downloadable materials to help you prepare for entrance exams, explore
        colleges, and assess your aptitude for different career paths.
      </p>

      <Tabs defaultValue="exams" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="exams">Entrance Exams</TabsTrigger>
          <TabsTrigger value="colleges">College Guides</TabsTrigger>
          <TabsTrigger value="aptitude">Aptitude Tests</TabsTrigger>
        </TabsList>

        {Object.entries(resources).map(([key, items]) => (
          <TabsContent key={key} value={key}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((resource, index) => (
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <resource.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">{resource.type}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-4">
                    <Button asChild variant={resource.type === "PDF" ? "default" : "outline"} className="w-full">
                      <Link href={resource.link}>
                        {resource.type === "PDF" ? (
                          <>
                            <Download className="mr-2 h-4 w-4" /> Download
                          </>
                        ) : (
                          <>
                            <ExternalLink className="mr-2 h-4 w-4" /> View Resource
                          </>
                        )}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-16 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Additional Resources</CardTitle>
            <CardDescription className="text-center">
              Explore these external resources for more in-depth information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Government Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" /> National Career Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" /> Ministry of Education Portal
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" /> National Scholarship Portal
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Career Counseling</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" /> Book a Counseling Session
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" /> Career Counselor Directory
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-primary hover:underline flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" /> Contact Our Experts
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Can't Find What You're Looking For?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our team of career counselors is here to help you with personalized guidance and resources.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}
