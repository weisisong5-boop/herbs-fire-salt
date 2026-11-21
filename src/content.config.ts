import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { recipeCategories } from "./lib/recipe-categories";

const archiveFields = {
  title: z.string(),
  description: z.string(),
  cover: z.string(),
  order: z.number().int().optional(),
  draft: z.boolean().default(false),
};

const seasons = z.array(z.enum(["spring", "summer", "autumn", "winter"])).min(1);

const fieldNotes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/field-notes" }),
  schema: z.object({
    ...archiveFields,
    date: z.date().optional(),
  }),
});

const ingredients = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/ingredients" }),
  schema: z.object({
    ...archiveFields,
    englishTitle: z.string().optional(),
    seasons,
  }),
});

const recipes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/recipes" }),
  schema: z.object({
    ...archiveFields,
    englishTitle: z.string().optional(),
    seasons,
    category: z.enum(recipeCategories),
    inspiration: z.string().min(1),
    inspirationSummary: z.string().min(1),
  }),
});

export const collections = {
  "field-notes": fieldNotes,
  ingredients,
  recipes,
};
