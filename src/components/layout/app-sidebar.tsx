"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Puzzle,
  BarChart3,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SerbianSavantLogo from "@/components/serbian-savant-logo";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const navItems = [
  { href: "/", icon: LayoutDashboard },
  { href: "/flashcards", icon: BookOpen },
  { href: "/quizzes", icon: Puzzle },
  { href: "/progress", icon: BarChart3 },
  { href: "/profile", icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = translations[language];

  const getNavLabel = (href: string) => {
    switch (href) {
      case "/":
        return t.navDashboard;
      case "/flashcards":
        return t.navFlashcards;
      case "/quizzes":
        return t.navQuizzes;
      case "/progress":
        return t.navProgress;
      case "/profile":
        return t.navProfile;
      default:
        return "";
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <SerbianSavantLogo className="h-8 w-auto text-sidebar-foreground" />
          </Link>
          <div className="md:hidden">
             <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={getNavLabel(item.href)}
                >
                  <a>
                    <item.icon />
                    <span>{getNavLabel(item.href)}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
