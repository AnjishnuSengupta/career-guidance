import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, ChevronRight } from "lucide-react"

// Career path data
const careerPaths = {
  science: [
    {
      title: "Engineering",
      path: [
        { stage: "Stream", description: "Science with PCM (Physics, Chemistry, Mathematics)" },
        { stage: "Entrance Exams", description: "JEE Main, JEE Advanced, BITSAT, State Engineering Entrance Exams" },
        { stage: "Undergraduate", description: "B.Tech/B.E. in various specializations (4 years)" },
        { stage: "Postgraduate (Optional)", description: "M.Tech/MS/MBA (1-2 years)" },
        {
          stage: "Career Options",
          description: "Software Engineer, Mechanical Engineer, Civil Engineer, Electronics Engineer",
        },
        {
          stage: "Advanced Paths",
          description: "Specialized roles, Research & Development, Management positions, Entrepreneurship",
        },
      ],
    },
    {
      title: "Medicine",
      path: [
        { stage: "Stream", description: "Science with PCB (Physics, Chemistry, Biology)" },
        { stage: "Entrance Exams", description: "NEET-UG, AIIMS, JIPMER" },
        { stage: "Undergraduate", description: "MBBS (5.5 years including internship)" },
        { stage: "Postgraduate", description: "MD/MS/DNB (3 years)" },
        { stage: "Specialization (Optional)", description: "DM/MCh (3 years super-specialization)" },
        {
          stage: "Career Options",
          description: "General Physician, Surgeon, Specialist, Medical Researcher, Public Health Professional",
        },
      ],
    },
    {
      title: "Research & Academia",
      path: [
        { stage: "Stream", description: "Science with any combination (PCM/PCB)" },
        { stage: "Entrance Exams", description: "KVPY, Olympiads, University-specific entrance exams" },
        { stage: "Undergraduate", description: "B.Sc. in Physics/Chemistry/Mathematics/Biology (3 years)" },
        { stage: "Postgraduate", description: "M.Sc. in chosen specialization (2 years)" },
        { stage: "Doctorate", description: "Ph.D. in specialized field (3-5 years)" },
        { stage: "Career Options", description: "Researcher, Professor, Scientist, R&D Specialist" },
      ],
    },
  ],
  commerce: [
    {
      title: "Chartered Accountancy",
      path: [
        { stage: "Stream", description: "Commerce with Mathematics" },
        { stage: "Foundation", description: "CA Foundation (after 12th)" },
        { stage: "Intermediate", description: "CA Intermediate (after passing Foundation)" },
        { stage: "Articleship", description: "3 years practical training under a practicing CA" },
        { stage: "Final", description: "CA Final examination" },
        {
          stage: "Career Options",
          description: "Chartered Accountant, Financial Analyst, Tax Consultant, Corporate Finance",
        },
      ],
    },
    {
      title: "Business Management",
      path: [
        { stage: "Stream", description: "Commerce (Mathematics recommended)" },
        { stage: "Entrance Exams", description: "CAT, XAT, SNAP, MAT, CMAT" },
        { stage: "Undergraduate", description: "BBA/B.Com/BMS (3 years)" },
        { stage: "Postgraduate", description: "MBA/PGDM (2 years)" },
        { stage: "Specialization", description: "Marketing, Finance, HR, Operations, International Business" },
        {
          stage: "Career Options",
          description: "Business Manager, Marketing Executive, Financial Manager, Entrepreneur",
        },
      ],
    },
    {
      title: "Banking & Finance",
      path: [
        { stage: "Stream", description: "Commerce with Mathematics" },
        { stage: "Undergraduate", description: "B.Com/BBA/BA Economics (3 years)" },
        { stage: "Postgraduate (Optional)", description: "MBA Finance/M.Com/MA Economics (2 years)" },
        { stage: "Professional Certifications", description: "CFA, FRM, Banking certifications" },
        { stage: "Entry-Level Positions", description: "Bank PO, Credit Analyst, Investment Associate" },
        { stage: "Career Growth", description: "Branch Manager, Investment Banker, Financial Advisor, Risk Manager" },
      ],
    },
  ],
  humanities: [
    {
      title: "Civil Services",
      path: [
        { stage: "Stream", description: "Humanities (any combination)" },
        { stage: "Undergraduate", description: "Any bachelor's degree (3-4 years)" },
        { stage: "Entrance Exam", description: "UPSC Civil Services Examination (Prelims, Mains, Interview)" },
        { stage: "Training", description: "Service-specific training at LBSNAA or other academies" },
        { stage: "Initial Posting", description: "Assistant/Deputy level positions" },
        { stage: "Career Growth", description: "IAS, IPS, IFS, IRS and other administrative services" },
      ],
    },
    {
      title: "Law",
      path: [
        { stage: "Stream", description: "Humanities (History, Political Science recommended)" },
        { stage: "Entrance Exams", description: "CLAT, AILET, University-specific law entrance exams" },
        { stage: "Undergraduate", description: "BA LLB (5 years integrated) or LLB (3 years after bachelor's)" },
        { stage: "Postgraduate (Optional)", description: "LLM (1-2 years)" },
        { stage: "Bar Enrollment", description: "Registration with State Bar Council" },
        { stage: "Career Options", description: "Advocate, Legal Advisor, Judge, Corporate Lawyer, Legal Researcher" },
      ],
    },
    {
      title: "Media & Journalism",
      path: [
        { stage: "Stream", description: "Humanities (English, Political Science, Sociology recommended)" },
        { stage: "Entrance Exams", description: "IIMC, XIC, ACJ, and other media institute entrances" },
        { stage: "Undergraduate", description: "BA Journalism/Mass Communication (3 years)" },
        { stage: "Postgraduate (Optional)", description: "MA/PG Diploma in Journalism/Mass Communication (1-2 years)" },
        { stage: "Internships", description: "Work experience with media houses, publications" },
        { stage: "Career Options", description: "Journalist, Content Creator, Editor, PR Specialist, Media Manager" },
      ],
    },
  ],
}

export default function CareerPathsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Career Path Explorer</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
        Visualize your journey from choosing a stream to becoming a professional. Explore common career paths and
        understand the steps involved in each.
      </p>

      <Tabs defaultValue="science" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="science">Science Paths</TabsTrigger>
          <TabsTrigger value="commerce">Commerce Paths</TabsTrigger>
          <TabsTrigger value="humanities">Humanities Paths</TabsTrigger>
        </TabsList>

        {Object.entries(careerPaths).map(([key, paths]) => (
          <TabsContent key={key} value={key} className="space-y-12">
            {paths.map((career, index) => (
              <div key={index} className="space-y-6">
                <h2 className="text-2xl font-bold">{career.title} Path</h2>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20" />
                  <div className="space-y-8">
                    {career.path.map((step, stepIndex) => (
                      <div key={stepIndex} className="relative flex items-start">
                        <div className="absolute left-0 flex items-center justify-center w-12 h-12">
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-xs text-white font-bold">{stepIndex + 1}</span>
                          </div>
                        </div>
                        <Card className="ml-16 w-full">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{step.stage}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="text-base">{step.description}</CardDescription>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-muted p-6 rounded-lg mt-8">
              <h3 className="text-xl font-semibold mb-4">
                Key Considerations for {key.charAt(0).toUpperCase() + key.slice(1)} Careers
              </h3>
              <ul className="space-y-3">
                {key === "science" && (
                  <>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Time Investment:</strong> Science careers often require longer education periods (4-9
                        years after 12th) depending on specialization.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Competitive Entrance Exams:</strong> Preparation for exams like JEE and NEET requires
                        dedicated effort and often coaching.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Continuous Learning:</strong> Scientific fields evolve rapidly, requiring lifelong
                        learning and adaptation.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Interdisciplinary Opportunities:</strong> Modern science careers often blend multiple
                        disciplines (e.g., bioinformatics, mechatronics).
                      </span>
                    </li>
                  </>
                )}
                {key === "commerce" && (
                  <>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Professional Certifications:</strong> Many commerce careers value professional
                        certifications (CA, CFA, etc.) alongside degrees.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Practical Experience:</strong> Internships and practical training are crucial for career
                        advancement.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Global Opportunities:</strong> Commerce qualifications often have international
                        recognition and mobility.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Entrepreneurship Potential:</strong> Commerce education provides a strong foundation for
                        starting your own business.
                      </span>
                    </li>
                  </>
                )}
                {key === "humanities" && (
                  <>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Versatile Applications:</strong> Humanities degrees offer flexibility to enter diverse
                        career fields.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Competitive Civil Services:</strong> Preparation for UPSC and other administrative
                        services requires dedicated study and multiple attempts.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Communication Skills:</strong> Most humanities careers place high value on excellent
                        written and verbal communication.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>
                        <strong>Evolving Media Landscape:</strong> Media and content careers are rapidly changing with
                        digital transformation.
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Need Personalized Guidance?</h2>
        <p className="text-center mb-6">
          Our career quiz can help you identify which path might be the best fit for your interests and strengths.
        </p>
        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link href="/quiz">
              Take the Career Quiz <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
