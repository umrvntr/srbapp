'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PROFICIENCY_LEVELS, type ProficiencyLevel } from "@/types";
import { Wand2 } from "lucide-react";

const formSchema = z.object({
  proficiencyLevel: z.enum(PROFICIENCY_LEVELS, {
    required_error: "Please select a proficiency level.",
  }),
  wordCount: z.coerce.number().min(1, "Minimum 1 word").max(20, "Maximum 20 words"),
});

type WordGeneratorFormValues = z.infer<typeof formSchema>;

interface WordGeneratorFormProps {
  onSubmit: (values: WordGeneratorFormValues) => Promise<void>;
  isLoading: boolean;
}

export function WordGeneratorForm({ onSubmit, isLoading }: WordGeneratorFormProps) {
  const form = useForm<WordGeneratorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      proficiencyLevel: "beginner",
      wordCount: 5,
    },
  });

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-primary" />
          Generate New Words
        </CardTitle>
        <CardDescription>Let AI craft new vocabulary for you to learn.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="proficiencyLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proficiency Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select proficiency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROFICIENCY_LEVELS.map((level) => (
                        <SelectItem key={level} value={level} className="capitalize">
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wordCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Words</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? "Generating..." : "Generate Words"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
