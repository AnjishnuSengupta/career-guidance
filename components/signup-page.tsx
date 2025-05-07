"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface SignupPageProps {
  onSignup: (email: string, password: string) => void
  onSwitchToLogin?: () => void
}

export default function SignupPage({ onSignup, onSwitchToLogin }: SignupPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    // Password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }
    
    setIsLoading(true)
    
    try {
      // Create user with Firebase auth
      await createUserWithEmailAndPassword(auth, email, password)
      
      // Call the parent component's onSignup handler
      onSignup(email, password)
    } catch (err: any) {
      // Handle Firebase auth errors
      let errorMessage = "Failed to create account. Please try again."
      
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = "Email already in use. Please try a different email or login."
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address."
      } else if (err.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Choose a stronger password."
      }
      
      setError(errorMessage)
      console.error("Signup error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="bg-purple-600 md:w-1/2 p-8 flex items-center justify-center">
        <div className="text-white max-w-md">
          <h1 className="text-4xl font-bold mb-4">Pathway</h1>
          <p className="text-xl mb-6">Your journey to the perfect career starts here</p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <ChevronRight className="mr-2" size={18} />
              Discover your ideal stream
            </li>
            <li className="flex items-center">
              <ChevronRight className="mr-2" size={18} />
              Explore suitable courses
            </li>
            <li className="flex items-center">
              <ChevronRight className="mr-2" size={18} />
              Find the best universities
            </li>
            <li className="flex items-center">
              <ChevronRight className="mr-2" size={18} />
              Plan your career path
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Create an Account</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="••••••••" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">Already have an account? </span>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  if (onSwitchToLogin) onSwitchToLogin()
                }} 
                className="text-sm font-medium text-purple-600 hover:text-purple-500"
              >
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}