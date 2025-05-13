import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button"; // Added for potential use in header
import { PanelLeft } from "lucide-react"; // Added for mobile trigger

export const metadata: Metadata = {
  title: "Serbian Savant",
  description: "Learn Serbian vocabulary with AI-powered flashcards and quizzes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <div className="flex min-h-screen">
            <AppSidebar />
            <SidebarInset className="flex-1 flex flex-col">
              <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4 md:hidden">
                {/* Mobile sidebar trigger */}
                <SidebarTrigger asChild> 
                  <Button size="icon" variant="outline">
                    <PanelLeft />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SidebarTrigger>
                <h1 className="text-xl font-semibold">Serbian Savant</h1>
              </header>
              <main className="flex-1 p-4 md:p-6">
                {children}
              </main>
            </SidebarInset>
          </div>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
