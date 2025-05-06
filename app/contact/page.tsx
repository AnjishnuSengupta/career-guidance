"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    queryType: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formState)
    setSubmitted(true)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Contact Us</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
        Have questions about your career path? Need guidance on choosing the right stream? Our career counselors are
        here to help you make informed decisions.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div>
          {!submitted ? (
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Your contact number"
                        value={formState.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="class">Current Class</Label>
                    <Select onValueChange={(value) => handleSelectChange("class", value)} value={formState.class}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">Class 10</SelectItem>
                        <SelectItem value="11">Class 11</SelectItem>
                        <SelectItem value="12">Class 12</SelectItem>
                        <SelectItem value="graduate">College/Graduate</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Type of Query</Label>
                    <RadioGroup
                      onValueChange={(value) => handleSelectChange("queryType", value)}
                      value={formState.queryType}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="stream" id="stream" />
                        <Label htmlFor="stream">Stream Selection</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="career" id="career" />
                        <Label htmlFor="career">Career Guidance</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="college" id="college" />
                        <Label htmlFor="college">College Admission</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="exam" id="exam" />
                        <Label htmlFor="exam">Entrance Exam Preparation</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your query in detail..."
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Query
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-muted/30">
              <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Your message has been received. One of our career counselors will get back to you within 24 hours.
                </p>
                <Button onClick={() => setSubmitted(false)}>Send Another Query</Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Reach out to us directly through these channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                  <p className="text-muted-foreground">Monday to Saturday, 9am to 6pm</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">guidance@careercompass.com</p>
                  <p className="text-muted-foreground">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Office Address</h3>
                  <p className="text-muted-foreground">123 Education Lane, Knowledge Park</p>
                  <p className="text-muted-foreground">New Delhi, India - 110001</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Is career counseling free?</h3>
                <p className="text-muted-foreground">
                  Basic guidance through our website is free. Personalized one-on-one sessions have nominal charges.
                </p>
              </div>
              <div>
                <h3 className="font-medium">How can I book a counseling session?</h3>
                <p className="text-muted-foreground">
                  You can request a session through this contact form or call our helpline directly.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Do you provide guidance for entrance exam preparation?</h3>
                <p className="text-muted-foreground">
                  Yes, our counselors can guide you on preparation strategies and recommend resources.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Can parents join the counseling sessions?</h3>
                <p className="text-muted-foreground">
                  We encourage parents to participate in the career planning process.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
