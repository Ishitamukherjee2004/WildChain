"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Moon, Sun, Wallet } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/components/auth-provider"
import { useWallet } from "@/components/wallet-provider"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { isAuthenticated, userRole, signOut } = useAuth()
  const { isConnected, account, connectWallet, disconnectWallet } = useWallet()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Report", href: "/report" },
    { name: "Map", href: "/map" },
    // { name: "Adopt", href: "/adopt" },
    // { name: "Stories", href: "/stories" },
    ...(isAuthenticated && userRole === "admin" ? [{ name: "Dashboard", href: "/dashboard" }] : []),
    ...(isAuthenticated && userRole === "user" ? [{ name: "Profile", href: "/profile" }] : []),
    { name: "About", href: "/about" },
  ]

  const handleWalletAction = () => {
    if (isConnected) {
      disconnectWallet()
    } else {
      connectWallet()
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <div className="text-2xl font-bold text-glow bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            WildChain
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-all duration-200 hover:text-primary hover:text-glow hover:scale-105 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="border-glow hover:bg-primary/10 transition-all duration-200"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Button
            onClick={handleWalletAction}
            variant="outline"
            size="sm"
            className="border-glow bg-transparent hover:bg-primary/10 transition-all duration-200 min-w-[120px]"
          >
            <Wallet className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{isConnected ? `${account?.slice(0, 6)}...` : "Connect"}</span>
          </Button>

          {isAuthenticated ? (
            <Button
              onClick={signOut}
              variant="outline"
              size="sm"
              className="hover:bg-destructive/10 transition-all duration-200 bg-transparent"
            >
              Sign Out
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="hover:bg-primary/10 transition-all duration-200 bg-transparent"
              >
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="glow hover:scale-105 transition-all duration-200">
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-all duration-200">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[350px] bg-background/95 backdrop-blur border-l border-border/40"
          >
            <div className="flex flex-col space-y-6 mt-8">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-lg font-medium transition-all duration-200 hover:text-primary hover:text-glow hover:translate-x-2 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="border-t border-border/40 pt-6 space-y-4">
                <Button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  variant="outline"
                  className="w-full justify-start hover:bg-primary/10 transition-all duration-200"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4 mr-3" /> : <Moon className="h-4 w-4 mr-3" />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </Button>

                <Button
                  onClick={handleWalletAction}
                  variant="outline"
                  className="w-full justify-start bg-transparent hover:bg-primary/10 transition-all duration-200"
                >
                  <Wallet className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="truncate">
                    {isConnected ? `${account?.slice(0, 8)}...${account?.slice(-6)}` : "Connect Wallet"}
                  </span>
                </Button>

                {isAuthenticated ? (
                  <Button
                    onClick={signOut}
                    variant="outline"
                    className="w-full bg-transparent hover:bg-destructive/10 transition-all duration-200"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full bg-transparent hover:bg-primary/10 transition-all duration-200"
                    >
                      <Link href="/auth/signin">Sign In</Link>
                    </Button>
                    <Button asChild className="w-full glow hover:scale-105 transition-all duration-200">
                      <Link href="/auth/signup">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
