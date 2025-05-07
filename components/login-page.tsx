"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface LoginPageProps {
  onLogin: (email: string, password: string) => void
  onSwitchToSignup?: () => void
}

export default function LoginPage({ onLogin, onSwitchToSignup }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    
    try {
      // Firebase authentication
      await signInWithEmailAndPassword(auth, email, password)
      
      // Call the parent component's onLogin handler
      onLogin(email, password)
    } catch (err: any) {
      // Handle Firebase auth errors
      let errorMessage = "Failed to login. Please try again."
      
      if (err.code === 'auth/invalid-credential') {
        errorMessage = "Invalid email or password."
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = "User not found. Please check your email."
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password."
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = "Too many login attempts. Please try again later."
      }
      
      setError(errorMessage)
      console.error("Login error:", err)
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
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login to Your Account</h2>
          
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
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">Don't have an account? </span>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  if (onSwitchToSignup) onSwitchToSignup()
                }} 
                className="text-sm font-medium text-purple-600 hover:text-purple-500"
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}