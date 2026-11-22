# HUMAN CIVILIZATION ATLAS
# MASTER BLUEPRINT v4.0

Version: 4.0
Status: Ontology & Data Architecture Specification
Purpose: Canonical Data, Knowledge Graph, Metadata and Interoperability Framework

---
# 1. PURPOSE

Blueprint v4.0 định nghĩa nền tảng dữ liệu cho toàn bộ dự án Human Civilization Atlas (HCA).

Mục tiêu:
- Thống nhất mô hình dữ liệu.
- Chuẩn hóa ontology.
- Thiết kế Knowledge Graph.
- Thiết kế PostgreSQL và Neo4j.
- Chuẩn hóa nguồn và trích dẫn.
- Hỗ trợ AI / RAG / GraphRAG.

---
# 2. REFERENCE ARCHITECTURE

Presentation Layer
- Website
- Mobile
- API
- AI Tutor

Application Layer
- Search
- Timeline Engine
- Recommendation Engine
- Learning Engine

Knowledge Layer
- PostgreSQL
- Neo4j
- Vector Database

Source Layer
- Britannica
- Oxford
- Cambridge
- UNESCO
- JSTOR
- Wikidata
- OpenAlex

---
# 3. CORE ONTOLOGY

Primary Entity Types

01 Civilization
02 Person
03 Event
04 Idea
05 Innovation
06 Book
07 Epic
08 Religion
09 Institution
10 Location
11 Artifact
12 ScientificTheory
13 Technology
14 Empire
15 Language
16 EducationalResource

---
# 4. ENTITY DEFINITIONS

## Civilization
Fields
- id
- slug
- name
- native_name
- start_year
- end_year
- region
- summary
- legacy

## Person
Fields
- id
- name
- birth_year
- death_year
- nationality
- occupations
- biography

## Event
Fields
- id
- title
- start_date
- end_date
- location
- significance

## Idea
Fields
- id
- title
- definition
- origin
- evolution
- impact

---
# 5. RELATIONSHIP ONTOLOGY

Core Relationships

- CREATED
- DISCOVERED
- INVENTED
- WROTE
- FOUNDED
- DEVELOPED
- BELONGS_TO
- PRACTICED_IN
- INFLUENCED
- INSPIRED
- PARTICIPATED_IN
- OCCURRED_IN
- RELATED_TO
- SUCCEEDED_BY
- PRECEDED_BY

Example

Aristotle
  WROTE
Politics

Politics
  INFLUENCED
Western Political Thought

---
# 6. KNOWLEDGE GRAPH MODEL

Node Categories

People
Civilizations
Events
Ideas
Technologies
Books
Religions
Locations
Institutions

Target Graph Scale

Year 1
10,000 nodes

Year 3
100,000 nodes

Year 5
1,000,000 nodes

---
# 7. KNOWLEDGE OBJECT STANDARD

Every knowledge object contains:

Metadata
Content
References
Relationships
Media
Version History

Required Fields

id
slug
name
type
summary
description
citations
tags
related_entities
created_at
updated_at

---
# 8. METADATA DICTIONARY

Global Standards

Title
Alternative Title
Author
Period
Date
Location
Language
Keywords
Abstract
References
Media Resources
Confidence Level

---
# 9. CITATION FRAMEWORK

Citation Standards

APA 7
Chicago
MLA

Preferred Internal Storage

Reference
├─ Title
├─ Authors
├─ Year
├─ Publisher
├─ URL
└─ DOI

Evidence Levels

A Peer-reviewed
B Academic Press
C Reference Work
D Educational Resource
E Community Source

---
# 10. PROVENANCE FRAMEWORK

Every fact stores:

Source
Source Date
Verification Level
Reviewer
Revision Number

Fact Traceability Required = TRUE

---
# 11. POSTGRESQL DATA MODEL

Core Tables

civilizations
people
events
ideas
innovations
books
epics
religions
institutions
locations
artifacts
references
media

Bridge Tables

person_event
person_idea
book_idea
civilization_innovation
idea_innovation

---
# 12. NEO4J GRAPH MODEL

Nodes

(:Person)
(:Civilization)
(:Idea)
(:Innovation)
(:Book)
(:Event)
(:Religion)
(:Location)

Relationships

[:INFLUENCED]
[:CREATED]
[:WROTE]
[:PARTICIPATED_IN]
[:CONNECTED_TO]

---
# 13. VECTOR SEARCH MODEL

Embeddings

Article Embedding
Paragraph Embedding
Entity Embedding

Use Cases

Semantic Search
Question Answering
Recommendations
GraphRAG

---
# 14. GRAPHRAG ARCHITECTURE

User Question
→ Entity Detection
→ Knowledge Graph Lookup
→ Evidence Retrieval
→ Context Assembly
→ LLM Response
→ Citation Generation

---
# 15. API ARCHITECTURE

Public API

/api/civilizations
/api/people
/api/books
/api/events
/api/ideas

Graph API

/api/graph/entity
/api/graph/neighbors
/api/graph/path

---
# 16. CONTENT VERSIONING

Version Levels

Draft
Reviewed
Verified
Published
Archived

Every update logged.

---
# 17. LEARNING OBJECT MODEL

Learning Object Types

Lesson
Topic
Timeline
Map
Case Study
Reading List
Quiz

Difficulty

Level 1
Level 2
Level 3
Level 4

---
# 18. DATASET MASTER SCHEMA

Dataset 01 Civilizations
Target: 100

Dataset 02 Historical Figures
Target: 1,000

Dataset 03 Great Ideas
Target: 500

Dataset 04 Books
Target: 500

Dataset 05 Innovations
Target: 1,000

Dataset 06 Events
Target: 10,000

---
# 19. INTEROPERABILITY

External Standards

Wikidata
Dublin Core
Schema.org
OpenAlex
CrossRef
ORCID
GeoNames
Library of Congress

---
# 20. DATA QUALITY FRAMEWORK

Dimensions

Accuracy
Completeness
Consistency
Timeliness
Traceability
Accessibility

Quality Score

0-100

Minimum Publication Score = 80

---
# 21. SECURITY & GOVERNANCE

Roles

Reader
Contributor
Editor
Reviewer
Administrator

Approval Workflow Required.

---
# 22. AI READINESS FRAMEWORK

RAG Ready
GraphRAG Ready
Agent Ready
Multimodal Ready

---
# 23. DELIVERABLES FOR V5

Next Blueprint:

- Information Architecture
- Sitemap
- UX Design
- UI Design System
- Search Experience
- Timeline Experience
- Map Experience
- Contributor Experience

---
END OF MASTER BLUEPRINT v4.0
