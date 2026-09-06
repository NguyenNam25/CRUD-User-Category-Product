"use client"

import productApi from "@/api/Routes/productApi";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import categoryApi from "@/api/Routes/categoryApi";
import { useAuth } from "@/components/auth/AuthContext";
import NavigationBar from "@/components/Components/NavigationBar";

export default function AppContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
}