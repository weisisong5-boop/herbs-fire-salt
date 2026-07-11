import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const fieldNotes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/field-notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    location: z.string(),
    cover: z.string(),
  }),
});

const ingredients = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/ingredients" }),
  schema: z.object({
    title: z.string(),
    scientificName: z.string(),
    region: z.string(),
    description: z.string(),
    cover: z.string(),
  }),
});

const recipes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/recipes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    ingredients: z.array(z.string()),
    cover: z.string(),
  }),
});

export const collections = {
  "field-notes": fieldNotes,
  ingredients,
  recipes,
};
