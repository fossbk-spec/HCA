# HCA Prisma Schema v2.0

## Vision
Production-ready schema supporting:
- Knowledge Graph Lite
- Future Neo4j synchronization
- GraphRAG
- Learning Paths
- Citations
- Revisions
- User Accounts
- Bookmarks
- Reading Lists
- Media Assets
- Timeline Explorer
- Interactive Maps

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
  LOCATION
  INSTITUTION
}

enum ContentStatus {
  DRAFT
  REVIEWED
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
  periodStart   Int?
  periodEnd     Int?
  status        ContentStatus @default(DRAFT)
  confidence    Int? @default(80)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  tags          EntityTag[]
  media         Media[]
  citations     Citation[]

  @@index([type])
  @@index([slug])
}

model Relationship {
  id               String @id @default(cuid())
  sourceEntityId   String
  targetEntityId   String
  relationshipType String
  weight           Float?
  createdAt        DateTime @default(now())

  @@index([sourceEntityId])
  @@index([targetEntityId])
  @@index([relationshipType])
}

model Citation {
  id          String @id @default(cuid())
  entityId    String
  sourceId    String
  note        String?
  entity      Entity @relation(fields:[entityId], references:[id])
  source      Source @relation(fields:[sourceId], references:[id])
}

model Source {
  id          String @id @default(cuid())
  title       String
  authors     String?
  publisher   String?
  year        Int?
  url         String?
  doi         String?
  evidenceLevel String?

  citations Citation[]
}

model Tag {
  id          String @id @default(cuid())
  name        String @unique
  category    String?

  entities EntityTag[]
}

model EntityTag {
  entityId String
  tagId    String

  entity Entity @relation(fields:[entityId], references:[id])
  tag    Tag @relation(fields:[tagId], references:[id])

  @@id([entityId, tagId])
}

model Media {
  id          String @id @default(cuid())
  entityId    String
  type        String
  url         String
  caption     String?

  entity Entity @relation(fields:[entityId], references:[id])
}

model Timeline {
  id          String @id @default(cuid())
  title       String
  description String?
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
  region      String?
}

model LearningPath {
  id          String @id @default(cuid())
  title       String
  description String?

  lessons LearningPathItem[]
}

model LearningPathItem {
  id             String @id @default(cuid())
  learningPathId String
  entityId       String
  position       Int
}

model User {
  id            String @id @default(cuid())
  email         String @unique
  name          String?
  createdAt     DateTime @default(now())

  bookmarks     Bookmark[]
  readingLists  ReadingList[]
}

model Bookmark {
  id          String @id @default(cuid())
  userId      String
  entityId    String
  createdAt   DateTime @default(now())
}

model ReadingList {
  id          String @id @default(cuid())
  userId      String
  title       String
  description String?
}

model RevisionHistory {
  id          String @id @default(cuid())
  entityId    String
  editor      String?
  version     String
  notes       String?
  createdAt   DateTime @default(now())
}
```

## Migration Order
1. Entity
2. Relationship
3. Source
4. Citation
5. Tag
6. EntityTag
7. Media
8. Timeline
9. Location
10. LearningPath
11. User
12. RevisionHistory

## Production Targets
- 100 Civilizations
- 1,000 Historical Figures
- 10,000 Events
- 500 Books
- 500 Ideas
- 1,000 Innovations
- Neo4j sync ready
- GraphRAG ready
