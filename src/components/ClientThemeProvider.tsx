"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { ReactNode } from "react";

export default function ClientThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
