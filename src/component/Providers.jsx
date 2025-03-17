"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";
export function Providers({ children }) {
  return (
    <HeroUIProvider>
      <ToastContainer position="top-right" className="z-50" draggable/>
      {children}
    </HeroUIProvider>
  );
}
