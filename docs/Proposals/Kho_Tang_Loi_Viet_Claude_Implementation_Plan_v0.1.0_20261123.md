# Kho tàng Lời Việt — Claude Implementation Plan

- **Project name:** Kho tàng Lời Việt
- **English working name:** Vietnamese Folk Wisdom Dictionary
- **Suggested repository:** `fossbk-spec/kho-tang-loi-viet`
- **Version:** v0.1.0
- **Date:** 2026-11-23
- **Initial focus:** Vietnamese ca dao and tục ngữ

## 1. Product vision

Build a searchable, source-backed and culturally sensitive dictionary of Vietnamese ca dao and tục ngữ. Each entry should explain meaning, usage, variants, regional context, vocabulary and sources rather than merely reproduce a sentence.

The MVP is not a general Vietnamese dictionary. Thành ngữ, riddles, folk songs and lullabies may be added later through explicit scope extensions.

## 2. Content definitions

- **Tục ngữ:** A relatively complete folk statement conveying experience, judgment or practical knowledge.
- **Ca dao:** Folk verse, usually rhythmic and lyrical, transmitted in oral or collected traditions.
- **Thành ngữ:** A relatively fixed expression that usually does not form a complete judgment. Excluded from MVP unless needed for cross-reference.

Classification can be uncertain. Support `classificationNote` and do not force disputed entries into an unqualified category.

## 3. MVP scope

### Included

- Browse Ca dao
- Browse Tục ngữ
- Entry detail pages
- Accent-insensitive and partial-phrase search
- Theme filters
- Region filters
- Variants
- Literal and interpreted meanings
- Usage context
- Old-word glossary
- Related and contrasting entries
- Sources and editorial status
- Random or “one entry a day” view

### Excluded

- General-purpose Vietnamese definitions
- Automatic AI-generated folk sayings
- Open public editing
- User accounts
- Social features
- AI tutor or chatbot
- Audio archive in the first MVP
- PostgreSQL unless runtime editorial workflows are later required

## 4. Initial content target

| Content | Target |
|---|---:|
| Tục ngữ | 300 |
| Ca dao | 200 |
| Themes | 20–30 |
| Old or culturally specific terms | 100 |
| Bibliographic sources | 10–20 |

Private beta may launch with 200 carefully reviewed entries. Quality, provenance and variant handling are more important than reaching 500 quickly.

## 5. Data model

### Entities

```text
Entry
Variant
Theme
Region
GlossaryTerm
Source
EntrySource
EntryRelation
```

### Entry schema

```yaml
slug:
text:
normalizedText:
entryType: TUC_NGU
classificationNote:
literalMeaning:
interpretedMeaning:
usageContext:
culturalContext:
variants: []
themes: []
regions: []
keywords: []
glossaryTerms: []
relatedEntries: []
contrastingEntries: []
sources: []
reviewStatus: draft
lastReviewedAt:
```

### Entry types

```text
CA_DAO
TUC_NGU
DISPUTED
```

### Editorial states

```text
draft
source_checked
linguistic_reviewed
published
```

### Entry relations

Use a small controlled vocabulary:

```text
VARIANT_OF
SIMILAR_TO
CONTRASTS_WITH
EXPLAINS
USES_TERM
ASSOCIATED_WITH_REGION
ASSOCIATED_WITH_THEME
```

## 6. Proposed sitemap

```text
/
/tra-cuu
/muc-tu/[slug]
/ca-dao
/tuc-ngu
/chu-de
/chu-de/[slug]
/vung-mien
/vung-mien/[slug]
/tu-co
/tu-co/[slug]
/ngau-nhien
/gioi-thieu
/phuong-phap-bien-tap
/nguon-tu-lieu
```

## 7. Search requirements

Search is the primary product feature and must support:

- Vietnamese text with and without diacritics.
- Exact phrase and partial phrase.
- Normalized punctuation and whitespace.
- Variant forms.
- Theme, region and entry-type filters.
- Highlighted matching phrases.
- Stable URLs for results and entries.

Normalization must not overwrite the original text. Preserve the sourced spelling and store normalized forms separately for retrieval.

## 8. Technical approach

### MVP stack

- Next.js and TypeScript
- Tailwind CSS
- Markdown or JSON content validated with Zod
- Static site generation
- Build-time search index
- GitHub Actions validation and build
- Vercel private preview

### Suggested structure

```text
src/
  app/
  components/
  lib/
  search/
content/
  entries/
  themes/
  regions/
  glossary/
  sources/
data/
  relations.json
docs/
  architecture/
  editorial/
  reviews/
scripts/
  validate-content.*
  normalize-search.*
  check-links.*
```

## 9. Editorial, cultural and copyright requirements

- Never invent an entry or variant using AI.
- Preserve documented variants rather than treating them as spelling errors.
- Record the exact source, edition, page and collector/editor where available.
- Distinguish traditional material from modern literary quotations and recent slogans.
- A traditional saying may be public-domain while a modern compilation, annotation, translation or selection remains protected.
- Do not copy modern annotations verbatim. Write original explanations supported by citations.
- Explain discriminatory or outdated ideas in historical context; do not silently normalize or endorse them.
- Mark uncertain attribution, regional origin and classification explicitly.
- Allow multiple interpretations when sources disagree.

## 10. Representative content template

```yaml
slug: co-cong-mai-sat-co-ngay-nen-kim
text: "Có công mài sắt, có ngày nên kim"
normalizedText: "co cong mai sat co ngay nen kim"
entryType: TUC_NGU
literalMeaning: "Mài sắt trong thời gian dài có thể tạo thành kim."
interpretedMeaning: "Sự kiên trì và nỗ lực lâu dài có thể tạo ra kết quả."
usageContext: "Dùng để động viên người đang học tập hoặc theo đuổi công việc khó."
themes:
  - kien-tri
  - lao-dong
regions:
  - toan-quoc
variants: []
sources: []
reviewStatus: draft
```

This is only a schema example. Claude must not publish the entry until an appropriate bibliographic source is added and checked.

## 11. Implementation plan

### Phase 0 — Repository and content standards, 2–3 days

- Create the independent repository.
- Add schemas, normalization utilities and validators.
- Add editorial and copyright policy.
- Add CI for schema validation, duplicate detection, links and build.
- Add 10 sourced representative entries covering both types and variants.

### Phase 1 — Core dictionary, 4–6 days

- Homepage
- Search interface
- Entry detail page
- Ca dao and Tục ngữ browse pages
- Theme and region filters
- Source and variant display

### Phase 2 — Glossary and seed collection, 5–8 days

- Old-word glossary
- Related and contrasting entries
- Random entry view
- Expand to 200 reviewed entries
- Accessibility and mobile review

### Phase 3 — Private beta, 2–3 days

- SEO metadata and sitemap
- Search-quality test set
- Broken-link checking
- Editorial review report
- Private preview deployment
- Define a future export format for selected HCA cultural entities

## 12. Validation requirements

The validation script must fail on:

- Duplicate slugs.
- Empty or invalid entry types.
- Relations pointing to missing entries.
- Published entries without sources.
- Unknown theme or region identifiers.
- Circular `VARIANT_OF` chains.
- Normalized search text missing or inconsistent.
- Source references without bibliographic identifiers.

It should warn on:

- Entries with only one source.
- Missing usage context.
- Missing classification notes for `DISPUTED` entries.
- Very similar texts that may be duplicates or variants.

## 13. Acceptance criteria

- Search works with and without Vietnamese diacritics.
- Exact and partial phrase search pass a documented test set.
- Original and normalized text are stored separately.
- Every published entry has at least one traceable source.
- Variants, related entries and region/theme links resolve correctly.
- No navigation or internal links return 404.
- Mobile and keyboard navigation work.
- Production build and data validation pass in CI.
- No AI-invented entries or improperly copied annotations are included.
- Editorial and copyright policies are visible on the website.

## 14. Claude execution prompt

Review this plan and create a new independent repository `fossbk-spec/kho-tang-loi-viet`. Implement Phase 0 first with Next.js, TypeScript, static Markdown/JSON content, Zod validation, Vietnamese search normalization and GitHub Actions. Do not copy the full HCA ontology or database architecture. Add the data model, editorial and copyright policies, validators, and 10 sourced representative entries covering ca dao, tục ngữ and at least one documented variant. Do not invent entries or explanations, and do not publish an entry without a traceable source. Report the proposed architecture, files changed, tests and validation results, limitations and PR URL. Work in small reviewable branches. Do not add PostgreSQL, user accounts, AI Tutor, GraphRAG, public editing, merge or public deployment without explicit project-owner approval.

