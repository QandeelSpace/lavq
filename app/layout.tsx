// app/layout.jsx
import "./globals.css";
import LanguageProvider from "@/components/LanguageProvider";

export const metadata = {
  title: "JobReady",
  description: "Job readiness program",
};

export default function RootLayout({ children }) {
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
