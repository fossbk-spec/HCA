export const epochs = [
  { id: "prehistory", label: "Prehistory", startYear: Number.NEGATIVE_INFINITY, endYear: -3500 },
  { id: "ancient", label: "Ancient", startYear: -3500, endYear: 500 },
  { id: "medieval", label: "Medieval", startYear: 500, endYear: 1500 },
  { id: "early-modern", label: "Early Modern", startYear: 1500, endYear: 1800 },
  { id: "modern", label: "Modern", startYear: 1800, endYear: Number.POSITIVE_INFINITY },
] as const;

export type Epoch = (typeof epochs)[number];

export function epochOf(year: number): Epoch {
  return epochs.find((epoch) => year >= epoch.startYear && year < epoch.endYear) ?? epochs[0];
}
