"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { BookOpen, LayoutDashboard, Users } from "lucide-react";

export function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 w-full items-center justify-between px-4 lg:px-6">
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                            <BookOpen className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                            StudyBuds
                        </span>
                    </Link>

                    {/* Navigation */}
                    <SignedIn>
                        <nav className="hidden md:flex items-center gap-1">
                            <Link href="/dashboard">
                                <Button
                                    variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                                    size="sm"
                                    className="gap-2"
                                >
                                    <LayoutDashboard className="h-4 w-4" />
                                    Dashboard
                                </Button>
                            </Link>
                            <Link href="/rooms">
                                <Button
                                    variant={pathname.startsWith("/rooms") ? "secondary" : "ghost"}
                                    size="sm"
                                    className="gap-2"
                                >
                                    <Users className="h-4 w-4" />
                                    Browse Rooms
                                </Button>
                            </Link>
                        </nav>
                    </SignedIn>
                </div>

                {/* Auth */}
                <div className="flex items-center gap-4">
                    <SignedOut>
                        <Link href="/sign-in">
                            <Button variant="ghost" size="sm">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button
                                size="sm"
                                className="bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700"
                            >
                                Get Started
                            </Button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "h-9 w-9",
                                },
                            }}
                        />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}
