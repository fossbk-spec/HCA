export const epochs = [
  { id: "big-bang", label: "Big Bang", rangeLabel: "About 13.8 billion years ago", description: "The origin and early development of the universe, the backdrop to everything that follows.", startYear: null, endYear: null },
  { id: "origin-of-life", label: "Origin of Life", rangeLabel: "About 3.8 billion years ago", description: "The emergence of life on Earth, shown here as context rather than as dated entries.", startYear: null, endYear: null },
  { id: "human-evolution", label: "Human Evolution", rangeLabel: "Before 10,000 BCE", description: "This phase covers the long development of humans and human societies before agriculture became widespread.", startYear: Number.NEGATIVE_INFINITY, endYear: -10000 },
  { id: "agriculture", label: "Agriculture", rangeLabel: "10,000–3,500 BCE", description: "This phase follows the spread of farming and the social changes associated with settled communities.", startYear: -10000, endYear: -3500 },
  { id: "ancient-civilizations", label: "Ancient Civilizations", rangeLabel: "3,500–500 BCE", description: "This phase introduces early urban societies, states, writing traditions, and regional civilizations.", startYear: -3500, endYear: -500 },
  { id: "classical-era", label: "Classical Era", rangeLabel: "500 BCE–1760 CE", description: "This phase spans classical antiquity through the medieval and early modern world, c. 500 BCE to 1760.", startYear: -500, endYear: 1760 },
  { id: "industrial-revolution", label: "Industrial Revolution", rangeLabel: "1760–1970 CE", description: "This phase covers industrialization and the transformation of production, transport, and urban life.", startYear: 1760, endYear: 1970 },
  { id: "information-age", label: "Information Age", rangeLabel: "1970–2010 CE", description: "This phase highlights the growing importance of computing, communications, and digital information.", startYear: 1970, endYear: 2010 },
  { id: "ai-age", label: "AI Age", rangeLabel: "2010 CE onward", description: "This phase describes the growing role of artificial intelligence and related computational systems.", startYear: 2010, endYear: Number.POSITIVE_INFINITY },
] as const;

export type Epoch = (typeof epochs)[number];

export function isStaticEpoch(epoch: Epoch): boolean {
  return epoch.startYear === null && epoch.endYear === null;
}

// These boundaries are editorial and approximate, intended to organize exploration rather than state exact historical divisions.
type NumericEpoch = Extract<Epoch, { startYear: number; endYear: number }>;
const numericEpochs = epochs.filter((epoch): epoch is NumericEpoch => epoch.startYear !== null && epoch.endYear !== null);

export function epochOf(year: number): Epoch {
  if (!Number.isFinite(year)) return numericEpochs[0];
  return numericEpochs.find((epoch) => year >= epoch.startYear && year < epoch.endYear) ?? numericEpochs[0];
}
