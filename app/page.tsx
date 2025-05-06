import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, Compass, GraduationCap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Future{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Discover the perfect career path based on your interests, skills, and passions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link href="/quiz">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link href="/streams">Explore Streams</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How We Help You Choose Your Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Compass className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Personalized Career Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Take our interactive quiz to discover career paths that match your unique interests and strengths.
                </CardDescription>
                <Link href="/quiz" className="inline-flex items-center text-primary mt-4 hover:underline">
                  Take the quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Stream Exploration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Learn about Science, Commerce, and Humanities streams with detailed insights into subjects and
                  opportunities.
                </CardDescription>
                <Link href="/streams" className="inline-flex items-center text-primary mt-4 hover:underline">
                  Explore streams <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Career Path Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Visualize potential career journeys from choosing a stream to becoming a professional in your field.
                </CardDescription>
                <Link href="/career-paths" className="inline-flex items-center text-primary mt-4 hover:underline">
                  View career paths <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card">
              <CardContent className="pt-6">
                <p className="italic mb-4">
                  "The career quiz helped me realize my passion for design. Now I'm pursuing architecture and couldn't
                  be happier with my choice!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <span className="font-semibold text-primary">RP</span>
                  </div>
                  <div>
                    <p className="font-medium">Rahul Patel</p>
                    <p className="text-sm text-muted-foreground">Class 12 Student, Delhi</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardContent className="pt-6">
                <p className="italic mb-4">
                  "I was confused between Science and Commerce. The stream comparison helped me understand which path
                  aligned better with my goals."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                    <span className="font-semibold text-secondary">AM</span>
                  </div>
                  <div>
                    <p className="font-medium">Ananya Mehta</p>
                    <p className="text-sm text-muted-foreground">Class 11 Student, Mumbai</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Discover Your Ideal Career Path?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take our comprehensive career assessment quiz and get personalized recommendations based on your unique
            profile.
          </p>
          <Button asChild size="lg" className="text-lg">
            <Link href="/quiz">Take the Career Quiz</Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <p className="text-muted-foreground">Career Paths</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <p className="text-muted-foreground">Academic Streams</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">10,000+</div>
              <p className="text-muted-foreground">Students Guided</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
