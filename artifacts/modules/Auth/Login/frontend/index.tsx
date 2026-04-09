// @ts-nocheck
/**
 * Login Frontend Module
 * This file contains the React component for the user sign-in page.
 * It uses Framer Motion for animations and connects to the strict backend module.
 */
import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useLoginUser } from "@workspace/api-client-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function AuthLogin() {
  // Navigation hook to redirect the user after login
  const [, setLocation] = useLocation();
  
  // Custom hook containing our global session state manager
  const { login } = useAuth();
  const { toast } = useToast();
  
  // Local states for the login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Hook connecting via react-query to the backend api route
  const mutation = useLoginUser();

  /**
   * Handles the submission of the login form.
   * Prevents default page reload, attempts API call, and updates session state on success.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the strict modular Auth Login backend -> /api/auth/login
      const result = await mutation.mutateAsync({ data: { email, password } });
      
      // Update global context with session data
      login(result as any);
      
      // Show success notification to the user
      toast({ title: "Welcome back!", description: `Logged in as ${(result as any).name}` });
      
      // Redirect to the home page
      setLocation("/");
    } catch (err: any) {
      // Display error notification on failure
      toast({
        title: "Login failed",
        description: err?.response?.data?.error ?? "Invalid email or password.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <PageMeta title="Sign In" description="Sign in to your Ishu account." />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        
        {/* Decorative Grid Background - Premium Aesthetic */}
        <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Glow Effect behind the main card */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />

        {/* Framer motion applies an intro slide-up animation */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="relative w-full max-w-md">
          
          {/* Glassmorphism Card Style */}
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-md p-8 shadow-xl">
            <div className="text-center mb-8">
              
              {/* Logo Link back to home */}
              <Link href="/" className="inline-flex items-center gap-2 mb-6 transition-transform hover:scale-105 duration-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-blue-400">
                  <span className="font-bold text-white text-lg">I</span>
                </div>
                <span className="font-bold text-xl text-foreground">Ishu</span>
              </Link>
              
              <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
              <p className="text-muted-foreground text-sm mt-1">Sign in to your account</p>
            </div>

            {/* Login Form UI */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com"
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  required 
                  autoComplete="email" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="pr-10"
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    autoComplete="current-password" 
                  />
                  {/* Toggle button to view or hide the password input text */}
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              {/* Submission Button with loading state disabled control */}
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 text-white gap-2 transition-transform active:scale-95 duration-200"
                disabled={mutation.isPending}>
                <LogIn className="h-4 w-4" />
                {mutation.isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              {/* Link directing them to our new Modular Register section */}
              <Link href="/auth/register" className="text-blue-500 hover:text-blue-600 font-medium transition-colors">Create account</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
