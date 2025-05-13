import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Puzzle, BarChart3 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-primary mb-4">Dobrodošli u Serbian Savant!</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your personal AI-powered guide to mastering Serbian vocabulary. Explore interactive flashcards, engaging quizzes, and track your learning journey.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Image
              src="https://picsum.photos/seed/flashcards/600/400"
              alt="Flashcards illustration"
              width={600}
              height={400}
              className="rounded-t-lg object-cover aspect-[3/2]"
              data-ai-hint="language learning cards"
            />
            <CardTitle className="mt-4 text-2xl">AI Flashcards</CardTitle>
            <CardDescription>Learn new words with smart flashcards in Cyrillic & Latin scripts.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Dynamically generated vocabulary tailored to your proficiency. Master words with contextual examples.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/flashcards">Start Learning <BookOpen className="ml-2 h-5 w-5" /></Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
             <Image
              src="https://picsum.photos/seed/quizgame/600/400"
              alt="Quiz game illustration"
              width={600}
              height={400}
              className="rounded-t-lg object-cover aspect-[3/2]"
              data-ai-hint="quiz game interface"
            />
            <CardTitle className="mt-4 text-2xl">Translation Quizzes</CardTitle>
            <CardDescription>Test your knowledge with AI-powered distractors.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Engaging quizzes that challenge your understanding and reinforce memory through smart, similar-looking options.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/quizzes">Take a Quiz <Puzzle className="ml-2 h-5 w-5" /></Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <Image
              src="https://picsum.photos/seed/progresschart/600/400"
              alt="Progress chart illustration"
              width={600}
              height={400}
              className="rounded-t-lg object-cover aspect-[3/2]"
              data-ai-hint="progress chart graph"
            />
            <CardTitle className="mt-4 text-2xl">Track Your Progress</CardTitle>
            <CardDescription>See how far you've come and stay motivated.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Monitor your mastered words and unlocked levels. Set daily goals and watch your Serbian skills grow.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/progress">View Progress <BarChart3 className="ml-2 h-5 w-5" /></Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <section className="text-center py-10 bg-secondary rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-secondary-foreground">Ready to Become a Serbian Savant?</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Embark on your language learning adventure today!
        </p>
        <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/flashcards">
            Let's Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
