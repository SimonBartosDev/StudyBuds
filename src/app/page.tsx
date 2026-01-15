import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import {
  BookOpen,
  Users,
  FileText,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Share2,
  Brain,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5" />
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-400 mb-8">
              <Sparkles className="h-4 w-4" />
              <span>Social learning reimagined</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Learn together.
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Succeed together.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Join course-specific rooms, share your notes and study materials,
              and build a repository of crowd-sourced knowledge with your
              university peers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SignedOut>
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-violet-500/25"
                  >
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-violet-500/25"
                  >
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="text-violet-600">ace your courses</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              StudyBuds brings together students from the same courses to
              share knowledge and learn collaboratively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 hover:border-violet-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Course Rooms</h3>
                <p className="text-muted-foreground">
                  Join dedicated rooms for your specific courses. Find your
                  classmates and start collaborating instantly.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 hover:border-violet-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 mb-6">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Share Materials</h3>
                <p className="text-muted-foreground">
                  Upload and share notes, slides, summaries, and study guides.
                  Build a collective resource library.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 hover:border-violet-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 mb-6">
                  <Share2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Crowd-sourced Learning
                </h3>
                <p className="text-muted-foreground">
                  Everyone contributes, everyone benefits. Access diverse
                  perspectives on the same material.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 hover:border-violet-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 mb-6">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  University Focused
                </h3>
                <p className="text-muted-foreground">
                  Designed specifically for university students. Find rooms for
                  any course at any university.
                </p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 hover:border-violet-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 mb-6">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Stay Organized</h3>
                <p className="text-muted-foreground">
                  All your course materials in one place. Never lose track of
                  important notes again.
                </p>
              </div>
            </div>

            {/* Feature 6 - Coming Soon */}
            <div className="group relative overflow-hidden rounded-2xl border border-dashed border-border/50 bg-muted/30 p-8">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground mb-6">
                  <Brain className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold">AI Study Assistant</h3>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600">
                    Coming Soon
                  </span>
                </div>
                <p className="text-muted-foreground">
                  AI-powered summaries, flashcards, and study guides based on
                  your shared materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-purple-600 p-12 md:p-16 text-center text-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to boost your grades?
              </h2>
              <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                Join thousands of students already learning together on
                StudyBuds. It's free to get started!
              </p>
              <SignedOut>
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="gap-2 bg-white text-violet-600 hover:bg-white/90"
                  >
                    Start Learning Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="gap-2 bg-white text-violet-600 hover:bg-white/90"
                  >
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="font-semibold">StudyBuds</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 StudyBuds. Built for students, by students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
