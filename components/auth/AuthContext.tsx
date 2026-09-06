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
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem("user");

    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    setIsLoading(false);
  }, []);

  const login = (user: User) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setCurrentUser(null);
    router.push("/login")
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
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