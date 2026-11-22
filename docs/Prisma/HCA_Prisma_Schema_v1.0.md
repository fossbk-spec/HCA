# HCA Prisma Schema v1.0

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
}

model Civilization {
  id           String   @id @default(cuid())
  slug         String   @unique
  name         String
  region       String?
  periodStart  Int?
  periodEnd    Int?
  summary      String?
  content      String?  @db.Text
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  people       Person[]
}

model Person {
  id             String   @id @default(cuid())
  slug           String   @unique
  name           String
  birthYear      Int?
  deathYear      Int?
  occupations    String?
  summary        String?
  content        String? @db.Text
  civilizationId String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  civilization Civilization? @relation(fields: [civilizationId], references: [id])
}

model Event {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  startDate   DateTime?
  endDate     DateTime?
  summary     String?
  content     String? @db.Text
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Idea {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  category    String?
  summary     String?
  content     String? @db.Text
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Book {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           String
  author          String?
  publicationYear Int?
  summary         String?
  content         String? @db.Text
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model Reference {
  id          String   @id @default(cuid())
  title       String
  url         String?
  doi         String?
  publisher   String?
  createdAt   DateTime @default(now())
}

model Relationship {
  id               String     @id @default(cuid())
  sourceId         String
  sourceType       EntityType
  targetId         String
  targetType       EntityType
  relationshipType String
  createdAt        DateTime @default(now())

  @@index([sourceId])
  @@index([targetId])
  @@index([relationshipType])
}
```

## Migration Order
1. Civilization
2. Person
3. Event
4. Idea
5. Book
6. Reference
7. Relationship

## Seed Targets
- 10 Civilizations
- 100 People
- 200 Events
- 50 Ideas
- 50 Books
