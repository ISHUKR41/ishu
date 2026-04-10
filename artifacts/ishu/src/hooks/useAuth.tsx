// FILE: artifacts/ishu/src/hooks/useAuth.tsx
// PURPOSE: Implementation file for a dedicated ISHU module section.

import React, { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
const CURRENT_USER_QUERY_KEY = ["currentUser"] as const;

function extractStatusCode(error: unknown): number | null {
  if (!error || typeof error !== "object") {
    return null;
  }

  const rootStatus = (error as any).status;
  if (typeof rootStatus === "number") {
    return rootStatus;
  }

  const responseStatus = (error as any).response?.status;
  if (typeof responseStatus === "number") {
    return responseStatus;
  }

  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const { data: currentUser, isLoading, isError, error } = useGetCurrentUser({
    query: {
      queryKey: CURRENT_USER_QUERY_KEY,
      retry: false,
      staleTime: 0,
      refetchOnMount: "always",
      refetchOnWindowFocus: true,
    },
  });

  const logoutMutation = useLogoutUser();
  const statusCode = extractStatusCode(error);
  const isAuthError = isError && (statusCode === 401 || statusCode === 403);

  useEffect(() => {
    if (isAuthError) {
      setUser(null);
      return;
    }

    if (currentUser && typeof currentUser === "object" && "id" in currentUser) {
      sessionStorage.removeItem("ishu_logged_out");
      setUser(currentUser as User);
      return;
    }

    // Block the auto-login loop if explicitly logged out
    const isLoggedOut = sessionStorage.getItem("ishu_logged_out") === "true";
    if (isLoggedOut) {
      setUser(null);
      return;
    }

    // Do not clear user for transient server/network errors. Only clear
    // when we confirmed no authenticated user state from the API.
    if (!isLoading && !isError) {
      setUser(null);
    }
  }, [currentUser, isLoading, isError, isAuthError]);

  const login = (newUser: User) => {
    sessionStorage.removeItem("ishu_logged_out");
    setUser(newUser);
    queryClient.setQueryData(CURRENT_USER_QUERY_KEY, newUser);
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync(undefined);
    } catch (e: unknown) {
      console.warn("API logout failed, but clearing local state regardless to break auto-login loop.", e);
    }

    // Force React Query to drop the session unconditionally
    await queryClient.cancelQueries({ queryKey: CURRENT_USER_QUERY_KEY });
    queryClient.setQueryData(CURRENT_USER_QUERY_KEY, null);
    queryClient.removeQueries({ queryKey: CURRENT_USER_QUERY_KEY });
    queryClient.resetQueries({ queryKey: CURRENT_USER_QUERY_KEY });
    queryClient.clear();
    
    // Set blocker flag in sessionStorage
    sessionStorage.setItem("ishu_logged_out", "true");

    setUser(null);
    setLocation("/");
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
