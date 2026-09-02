import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "FlowBoard",
  description: "The intuitive way to manage your work and team.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
