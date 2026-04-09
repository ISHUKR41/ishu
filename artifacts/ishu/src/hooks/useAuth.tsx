import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetCurrentUser, useLogoutUser } from "@workspace/api-client-react";
import { useLocation } from "wouter";

export interface User {
  id: number;
  name: string;
  email: string;
  whatsappNumber?: string | null;
  role: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [, setLocation] = useLocation();

  const { data: currentUser, isLoading } = useGetCurrentUser({
    query: {
      queryKey: ["currentUser"],
      retry: false,
    },
  });

  const logoutMutation = useLogoutUser();

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser as User);
    } else if (!isLoading) {
      setUser(null);
    }
  }, [currentUser, isLoading]);

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync(undefined);
    } catch (e) {
      console.warn("API logout failed, clearing local state.");
    } finally {
      setUser(null);
      setLocation("/");
    }
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
