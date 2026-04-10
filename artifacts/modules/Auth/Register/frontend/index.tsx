// ============================================================================
// FILE: index.tsx
// MODULE: Auth
// PURPOSE: This file provides the implementation for index.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

// @ts-nocheck
/**
 * Register Frontend Module
 * This file contains the React component for the user registration page.
 * It uses Framer Motion for smooth animations and connects tightly to our feature-sliced backend.
 */
import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useRegisterUser } from "@workspace/api-client-react";
import { PageMeta } from "@/components/layout/PageMeta";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, UserPlus } from "lucide-react";

export default function AuthRegister() {
  // Navigation hook to redirect the user after registration
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Local state representing the complete registration form data structure
  const [form, setForm] = useState({ name: "", email: "", password: "", whatsappNumber: "" });
  
  // Local state controlling the password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Hook connecting via react-query to the backend api route
  const mutation = useRegisterUser();

  /**
   * Handles the submission of the registration form.
   * Performs client-side validation and then triggers the modular backend endpoint.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Immediate client-side validation for minimum security
    if (form.password.length < 6) {
      toast({ title: "Weak password", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    
    try {
      // Call the strict modular Auth Register backend -> /api/auth/register
      await mutation.mutateAsync({ data: form });
      
      // Provide positive feedback
      toast({ title: "Account created!", description: "Your account is ready. Please sign in to continue." });
      
      // Force explicit sign-in after registration to prevent surprise auto-login behavior
      setLocation("/auth/login");
    } catch (err: any) {
      // Display specific server error or generic fallback
      toast({
        title: "Registration failed",
        description: err?.response?.data?.error ?? "Something went wrong. Try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <PageMeta title="Create Account" description="Create your free Ishu account." />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        
        {/* Decorative Grid Background - Premium Abstract Aesthetic */}
        <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Ambient Glow Effect matching the registration theme */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />

        {/* Framer motion applies an intro slide-up animation */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="relative w-full max-w-md">
          
          {/* Glassmorphism Card Style container */}
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-md p-8 shadow-xl">
            <div className="text-center mb-8">
              
              {/* Logo Link back to home */}
              <Link href="/" className="inline-flex items-center gap-2 mb-6 transition-transform hover:scale-105 duration-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-blue-400">
                  <span className="font-bold text-white text-lg">I</span>
                </div>
                <span className="font-bold text-xl text-foreground">Ishu</span>
              </Link>
              
              <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
              <p className="text-muted-foreground text-sm mt-1">Join millions of students on Ishu</p>
            </div>

            {/* Registration Form UI */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Your full name"
                  value={form.name} 
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com"
                  value={form.email} 
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))} 
                  required 
                  autoComplete="email" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number (optional)</Label>
                <Input 
                  id="whatsapp" 
                  type="tel" 
                  placeholder="+91 XXXXXXXXXX"
                  value={form.whatsappNumber} 
                  onChange={e => setForm(f => ({ ...f, whatsappNumber: e.target.value }))} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Min 6 characters"
                    className="pr-10"
                    value={form.password} 
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))} 
                    required 
                  />
                  {/* Toggle button to view or hide the password input text */}
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              {/* Submission Button with loading state disabled control */}
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 text-white gap-2 mt-2 transition-transform active:scale-95 duration-200"
                disabled={mutation.isPending}>
                <UserPlus className="h-4 w-4" />
                {mutation.isPending ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              {/* Link directing them to our Modular Login section */}
              <Link href="/auth/login" className="text-blue-500 hover:text-blue-600 font-medium transition-colors">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
