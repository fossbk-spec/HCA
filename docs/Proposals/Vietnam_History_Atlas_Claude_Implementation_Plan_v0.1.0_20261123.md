# Vietnam History Atlas — Claude Implementation Plan

- **Project name:** Vietnam History Atlas (VHA)
- **Vietnamese name:** Atlas Lịch sử Việt Nam
- **Suggested repository:** `fossbk-spec/vietnam-history-atlas`
- **Version:** v0.1.0
- **Date:** 2026-11-23
- **Relationship to HCA:** Independent specialist project; reviewed data may later be exported to HCA

## 1. Product vision

Build a concise, source-backed and expandable website that helps learners understand Vietnamese history through periods, polities, events, people, places, documents and themes.

Every article should answer:

1. What happened?
2. Where and in what historical context?
3. Who was involved?
4. Why does it matter?
5. Which claims or interpretations remain debated?
6. Which sources support the article?

The product must present Vietnamese history in its Southeast Asian and global context. It must not become only a chronology of dynasties, rulers and wars.

## 2. MVP scope

### Included

- Home page
- Timeline
- Period pages
- Event list and detail pages
- People list and detail pages
- Place list and detail pages
- Historical documents
- Themes
- Keyword search
- Sources and editorial status
- Responsive, accessible and SEO-friendly pages

### Excluded

- User accounts
- Contributor portal
- AI tutor
- GraphRAG
- Neo4j
- Recommendation engine
- Public editing
- Personalized learning

## 3. Initial content target

| Entity | Target |
|---|---:|
| Period | 10–12 |
| Polity | 10–15 |
| Event | 50 |
| Person | 30 |
| Place | 20 |
| Document | 15 |
| Theme | 10 |
| Total | Approximately 140–150 |

The private beta may launch with 50–70 reviewed objects. Do not wait for the full target if the smaller set meets quality requirements.

## 4. Core ontology

### Entities

```text
Period
Polity
Event
Person
Place
Document
Theme
Source
EntitySource
Relationship
```

### Initial relationship vocabulary

Use a small controlled set:

```text
PART_OF
PRECEDED
SUCCEEDED
OCCURRED_IN
PARTICIPATED_IN
LED
RULED
AUTHORED
MENTIONED_IN
LOCATED_IN
INFLUENCED
RELATED_TO
```

Every relationship lookup must use both `entityType` and `slug`. Do not assume slugs are globally unique across entity types.

### Article fields

```yaml
slug:
title:
aliases: []
summary:
historicalContext:
mainContent:
significance:
legacy:
debatedClaims: []
startYear:
endYear:
places: []
themes: []
sources: []
reviewStatus: draft
lastReviewedAt:
```

Allowed editorial states:

```text
draft
source_checked
expert_reviewed
published
```

## 5. Proposed sitemap

```text
/
/timeline
/periods
/periods/[slug]
/events
/events/[slug]
/people
/people/[slug]
/places
/places/[slug]
/documents
/documents/[slug]
/themes
/themes/[slug]
/search
/about
/editorial-policy
```

## 6. Initial learning paths

1. Vietnamese history through 30 turning points
2. Formation and defense of sovereignty
3. Reform movements in Vietnamese history
4. Science, medicine and education in Vietnam
5. Vietnam in Southeast Asian and global networks

## 7. Technical approach

### MVP stack

- Next.js and TypeScript
- Tailwind CSS
- Markdown or JSON content validated with Zod
- Static generation where possible
- Build-time search index
- GitHub Actions for validation, build and link checking
- Vercel private preview

Do not introduce PostgreSQL in the first implementation unless a tested requirement needs runtime writes. Git and pull requests are the initial editorial workflow.

### Suggested structure

```text
src/
  app/
  components/
  lib/
  search/
content/
  periods/
  polities/
  events/
  people/
  places/
  documents/
  themes/
  sources/
data/
  relationships.json
  taxonomy/
docs/
  architecture/
  editorial/
  reviews/
scripts/
  validate-content.*
  check-links.*
```

## 8. Editorial and historical requirements

- Distinguish dynasty, polity, state, nation, ethnicity and modern territory.
- Label interpretation separately from established facts.
- Prefer academic and primary sources over unsourced summaries.
- Record page, chapter, DOI, URL or archive identifier where available.
- Require at least two credible sources for important published articles.
- Include social, economic, scientific, medical, environmental and cultural history.
- Do not use AI-generated historical claims without source verification.
- Do not publish copyrighted images without clear reuse permission.

## 9. Implementation plan

### Phase 0 — Repository and standards, 2–3 days

- Create repository and baseline Next.js application.
- Add content schemas and validators.
- Add editorial policy and source model.
- Add CI for schema validation, typecheck, build and internal links.
- Create 5 representative sample objects.

### Phase 1 — Core experience, 4–6 days

- Homepage
- Timeline
- Period pages
- Event pages
- People pages
- Place pages
- Shared source display

### Phase 2 — Search and seed content, 5–8 days

- Search across all entity types
- Documents and themes
- 50–70 reviewed seed objects
- Related-content links
- Responsive and accessibility review

### Phase 3 — Private beta, 2–3 days

- SEO metadata and sitemap
- Broken-link checking
- Editorial review report
- Private preview deployment
- Export format compatible with a future HCA import

## 10. Acceptance criteria

- All content passes schema validation.
- Every entity has a stable slug and editorial state.
- Relationship identity uses type plus slug.
- All published core articles display sources.
- No navigation or related-content links return 404.
- Timeline handles BCE/CE and uncertain dates consistently.
- Search covers all MVP entities.
- Mobile, keyboard navigation and basic accessibility checks pass.
- Production build succeeds in CI.
- No secrets or copyrighted assets are committed improperly.
- A documented export command creates validated HCA-compatible JSON.

## 11. Claude execution prompt

Review this plan and the current HCA repository only for reusable architectural patterns. Create a new independent repository `fossbk-spec/vietnam-history-atlas`; do not fork or copy the entire HCA application. Implement Phase 0 first using Next.js, TypeScript, static Markdown/JSON content, Zod validation and GitHub Actions. Use the reduced ontology in this document, require `entityType + slug` for relations, include Source/EntitySource and editorial states from the beginning, and add five representative seed objects. Report the proposed structure, files changed, validation results, limitations and the PR URL. Work in small reviewable branches. Do not add PostgreSQL, AI Tutor, Neo4j, GraphRAG, public editing, merge or public deployment without explicit project-owner approval.

