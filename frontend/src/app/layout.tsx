import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FlowBoard",
  description: "The intuitive way to manage your work and team. A fully functional kanban board with real-time collaboration.",
  openGraph: {
    title: "FlowBoard | Mini Kanban Board",
    description: "Organize tasks, collaborate in real-time, and streamline your workflow with our powerful yet beautifully simple kanban boards.",
    url: "https://flowboard-app.com", // Replace with real URL
    siteName: "FlowBoard",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowBoard | Mini Kanban Board",
    description: "Organize tasks, collaborate in real-time, and streamline your workflow.",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans")} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
