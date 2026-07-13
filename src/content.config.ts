import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const archiveFields = {
  title: z.string(),
  description: z.string(),
  cover: z.string(),
  order: z.number().int().optional(),
  draft: z.boolean().default(false),
};

const fieldNotes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/field-notes" }),
  schema: z.object({
    ...archiveFields,
    date: z.date(),
    location: z.string(),
  }),
});

const ingredients = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/ingredients" }),
  schema: z.object({
    ...archiveFields,
    englishTitle: z.string().optional(),
  }),
});

const recipes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/recipes" }),
  schema: z.object({
    ...archiveFields,
    englishTitle: z.string().optional(),
  }),
});

export const collections = {
  "field-notes": fieldNotes,
  ingredients,
  recipes,
};
