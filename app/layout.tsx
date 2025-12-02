// app/layout.tsx
import "./globals.css";
import LanguageProvider from "@/components/LanguageProvider";
import { ReactNode } from "react";

export const metadata = {
  title: "JobReady",
  description: "Job readiness program",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
