# HCA Ontology Specification 1.0

## Purpose
Ontology chính thức cho Human Civilization Atlas (HCA), làm nền tảng cho Neo4j, GraphRAG, API và quản trị tri thức.

## Top-Level Domains
1. Universe
2. Earth
3. Life
4. Humanity
5. Civilization
6. Ideas
7. Institutions
8. Technology
9. Knowledge
10. Future

---

## Core Entity Classes

### Civilization
Thuộc tính:
- id
- name
- period_start
- period_end
- region
- description
- legacy

### Person
- id
- name
- birth_year
- death_year
- occupations
- biography

### Event
- id
- title
- start_date
- end_date
- significance

### Idea
- id
- title
- category
- description
- impact

### Innovation
- id
- name
- domain
- invention_date

### Book
- id
- title
- author
- publication_year

### Epic
- id
- title
- civilization
- themes

### Religion
### Institution
### Location
### Language
### ScientificTheory
### Artifact

---

## Relationship Vocabulary

### Human Relations
- INFLUENCED
- TAUGHT
- COLLABORATED_WITH

### Historical Relations
- PARTICIPATED_IN
- WITNESSED
- RULED

### Knowledge Relations
- WROTE
- CREATED
- DISCOVERED
- INVENTED
- DEVELOPED

### Structural Relations
- PART_OF
- BELONGS_TO
- LOCATED_IN

### Temporal Relations
- PRECEDED_BY
- SUCCEEDED_BY

---

## Graph Examples

(Aristotle)-[:TAUGHT]->(Alexander)

(Aristotle)-[:INFLUENCED]->(Western Philosophy)

(Ancient Greece)-[:CREATED]->(Democracy)

(Paper)-[:DEVELOPED_IN]->(Ancient China)

---

## Canonical Tags

Regions:
- Europe
- East Asia
- South Asia
- Southeast Asia
- Middle East
- Africa
- Americas
- Oceania

Periods:
- Prehistory
- Ancient
- Classical
- Medieval
- Early Modern
- Modern
- Contemporary

---

## Graph Scale Targets

Year 1
- 10,000 nodes
- 100,000 edges

Year 3
- 100,000 nodes
- 1,000,000 edges

Year 5
- 1,000,000+ nodes
- 10,000,000+ edges

---

## AI Readiness

Ontology must support:
- RAG
- GraphRAG
- Recommendation
- Learning Paths
- Citation-aware Answering
- Knowledge Discovery

END OF HCA ONTOLOGY SPECIFICATION 1.0
