# HCA Prisma Schema v3.0 Production

## Production Objectives

Schema designed for:
- 100,000+ entities
- GraphRAG
- Neo4j synchronization
- Multi-language content
- Learning Management
- Editorial workflow
- Citation graph
- Version history
- User accounts & RBAC
- Analytics
- AI Tutor

## Core Domains

### Knowledge Layer
- Entity
- EntityType
- Relationship
- Source
- Citation
- Media
- Tag

### Content Layer
- Article
- Translation
- Revision
- ContentWorkflow

### Learning Layer
- LearningPath
- Course
- Lesson
- Quiz
- Progress

### User Layer
- User
- Role
- Permission
- Team

### AI Layer
- Embedding
- RetrievalCache
- PromptTemplate
- AIConversation

### Geography Layer
- Location
- HistoricalRegion
- MapGeometry

### Timeline Layer
- Timeline
- TimelineItem
- HistoricalPeriod

### Analytics Layer
- EventLog
- SearchLog
- RecommendationLog

---

```prisma
generator client {
 provider = "prisma-client-js"
}

datasource db {
 provider = "postgresql"
 url      = env("DATABASE_URL")
}

enum EntityType {
 CIVILIZATION
 PERSON
 EVENT
 IDEA
 BOOK
 EPIC
 RELIGION
 INNOVATION
 INSTITUTION
 LOCATION
 THEORY
 ARTIFACT
}

enum WorkflowStatus {
 DRAFT
 REVIEW
 VERIFIED
 PUBLISHED
 ARCHIVED
}

model Entity {
 id            String @id @default(cuid())
 type          EntityType
 slug          String @unique
 title         String
 summary       String?
 content       String? @db.Text
 canonicalLang String @default("en")
 confidence    Int @default(80)
 status        WorkflowStatus @default(DRAFT)
 periodStart   Int?
 periodEnd     Int?
 createdAt     DateTime @default(now())
 updatedAt     DateTime @updatedAt

 translations  Translation[]
 citations     Citation[]
 media         Media[]
 revisions     Revision[]
 tags          EntityTag[]

 @@index([type])
 @@index([status])
}

model Relationship {
 id               String @id @default(cuid())
 sourceEntityId   String
 targetEntityId   String
 relationshipType String
 weight           Float?
 provenance       String?
 createdAt        DateTime @default(now())

 @@index([sourceEntityId])
 @@index([targetEntityId])
 @@index([relationshipType])
}

model Translation {
 id        String @id @default(cuid())
 entityId  String
 language  String
 title     String
 summary   String?
 content   String? @db.Text
}

model Revision {
 id         String @id @default(cuid())
 entityId   String
 version    String
 editorId   String?
 notes      String?
 createdAt  DateTime @default(now())
}

model Source {
 id            String @id @default(cuid())
 title         String
 authors       String?
 year          Int?
 publisher     String?
 url           String?
 doi           String?
 evidenceLevel String?
}

model Citation {
 id        String @id @default(cuid())
 entityId  String
 sourceId  String
 note      String?
 entity    Entity @relation(fields:[entityId], references:[id])
 source    Source @relation(fields:[sourceId], references:[id])
}

model Tag {
 id       String @id @default(cuid())
 name     String @unique
 category String?
}

model EntityTag {
 entityId String
 tagId    String

 @@id([entityId, tagId])
}

model Media {
 id          String @id @default(cuid())
 entityId    String
 mediaType   String
 url         String
 caption     String?
 attribution String?
}

model User {
 id          String @id @default(cuid())
 email       String @unique
 name        String?
 roleId      String?
 createdAt   DateTime @default(now())
}

model Role {
 id          String @id @default(cuid())
 name        String @unique
}

model LearningPath {
 id          String @id @default(cuid())
 title       String
 description String?
}

model Lesson {
 id          String @id @default(cuid())
 title       String
 entityId    String?
}

model Progress {
 id          String @id @default(cuid())
 userId      String
 lessonId    String
 completed   Boolean @default(false)
}

model Timeline {
 id          String @id @default(cuid())
 title       String
}

model TimelineItem {
 id          String @id @default(cuid())
 timelineId  String
 entityId    String
 sortOrder   Int
}

model Location {
 id          String @id @default(cuid())
 name        String
 latitude    Float
 longitude   Float
}

model Embedding {
 id          String @id @default(cuid())
 entityId    String
 vectorRef   String
 provider    String
}

model AIConversation {
 id          String @id @default(cuid())
 userId      String?
 title       String?
 createdAt   DateTime @default(now())
}

model EventLog {
 id          String @id @default(cuid())
 userId      String?
 eventType   String
 createdAt   DateTime @default(now())
}
```

## Recommended Extensions
- pgvector
- PostgreSQL full text search
- Redis cache
- Neo4j graph sync service
- OpenAlex ingestion
- Crossref ingestion
- Wikidata reconciliation

## Scale Target
- 100 Civilizations
- 1,000 Books
- 10,000 Events
- 100,000 Knowledge Objects
- 1,000,000 Relationships

END
