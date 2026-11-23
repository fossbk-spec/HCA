import { peoplePart1Vi } from "./people-1.ts";
import { peoplePart2Vi } from "./people-2.ts";

export const peopleVi: Record<string, { nameVi: string; occupationsVi: string; summaryVi: string; contentVi?: string }> = {
  ...peoplePart1Vi,
  ...peoplePart2Vi,
};

