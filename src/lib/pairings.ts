import { getCollection } from "astro:content";

export async function getPairings() {
  const recipes = (await getCollection("recipes")).filter((entry) => !entry.data.draft);
  const notes = (await getCollection("field-notes")).filter((entry) => !entry.data.draft);
  const noteById = new Map(notes.map((entry) => [entry.id, entry]));
  const recipeByNote = new Map<string, (typeof recipes)[number]>();
  for (const recipe of recipes) {
    const id = recipe.data.inspiration;
    if (!noteById.has(id)) throw new Error(`Recipe "${recipe.id}" references missing or draft inspiration "${id}".`);
    if (recipeByNote.has(id)) throw new Error(`Inspiration "${id}" is linked to multiple recipes.`);
    recipeByNote.set(id, recipe);
  }
  for (const note of notes) {
    if (!recipeByNote.has(note.id)) throw new Error(`Inspiration "${note.id}" has no published recipe.`);
  }
  return { recipes, notes, noteById, recipeByNote };
}
