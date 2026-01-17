"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  LogOut,
  Menu,
  X,
  Home,
  Settings,
  Bell,
  ChevronDown,
  MapPin,
  Shield,
  UserCog,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getCurrentUser, logout } from "@/lib/storage"
import type { User } from "@/lib/types"
import { ChangePasswordModal } from "./change-password-modal"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)

    // Redirect if accessing wrong dashboard
    if (currentUser.role === "general_secretary" && pathname.includes("/dashboard/state")) {
      router.push("/dashboard/general")
    } else if (currentUser.role === "state_secretary" && pathname.includes("/dashboard/general")) {
      router.push("/dashboard/state")
    }
  }, [router, pathname])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const navItems =
    user?.role === "general_secretary"
      ? [
          { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/general" },
          { icon: Users, label: "All Players", href: "/dashboard/general/players" },
          { icon: MapPin, label: "State Wise", href: "/dashboard/general/states" },
          { icon: UserCog, label: "Secretaries", href: "/dashboard/general/secretaries" },
        ]
      : [
          { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/state" },
          { icon: Users, label: "State Players", href: "/dashboard/state/players" },
        ]

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Top Navigation */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar">
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">T10TBCAI</span>
              </div>
              <span className="font-bold hidden sm:block">Admin Panel</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-primary-foreground/10">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs opacity-80 capitalize">{user.role.replace("_", " ")}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  {user.state && <p className="text-xs text-primary mt-1">{user.state}</p>}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="cursor-pointer">
                    <Home className="h-4 w-4 mr-2" />
                    Back to Website
                  </Link>
                </DropdownMenuItem>
                <ChangePasswordModal
                  trigger={
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Settings className="h-4 w-4 mr-2" />
                      Change Password
                    </DropdownMenuItem>
                  }
                />
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-200 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } pt-16 lg:pt-0`}
        >
          <div className="p-4">
            <div className="mb-6 p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-semibold text-sm">
                  {user.role === "general_secretary" ? "General Secretary" : "State Secretary"}
                </span>
              </div>
              {user.state && <p className="text-sm text-muted-foreground">{user.state}</p>}
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  )
}
