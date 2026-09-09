"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { User } from "@/types/user";
import { useRouter } from "next/navigation";

type AuthContextType = {
  currentUser: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("accessToken");

    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    if (token) {
      setAccessToken(token);
    }
    
    setIsLoading(false);
  }, []);

  const login = (user: User, token: string) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("accessToken", token);

    setCurrentUser(user);
    setAccessToken(token);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken");

    setCurrentUser(null);
    setAccessToken(null);

    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        accessToken,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}