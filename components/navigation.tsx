"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navigationItems = [
  { href: "/", label: "Beranda" },
  { href: "/results", label: "Cek Hasil" },
  { href: "/compare", label: "Bandingkan" },
  { href: "/about", label: "Tentang" },
  { href: "/faq", label: "FAQ" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-40">
        <div className="container-responsive">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-xl font-bold">deNOVA</div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <LanguageSelector />
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <LanguageSelector />
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Floating Mobile Menu */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 md:hidden">
            <div className="bg-background border rounded-lg shadow-2xl p-6 min-w-[280px] max-w-[90vw]">
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-base font-medium transition-colors hover:text-primary text-center py-2 ${pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
