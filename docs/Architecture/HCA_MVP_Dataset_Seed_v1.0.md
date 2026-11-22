# HCA MVP Dataset Seed v1.0

## Mục tiêu

Chuẩn bị bộ dữ liệu seed ban đầu cho Human Civilization Atlas (HCA) MVP.

Cấu trúc dữ liệu gồm:

- civilizations.json
- people.json
- events.json
- ideas.json
- books.json
- relationships.json

---

# Cấu trúc thư mục

```text
data/
└── seed/
    ├── civilizations.json
    ├── people.json
    ├── events.json
    ├── ideas.json
    ├── books.json
    └── relationships.json
```

---

# civilizations.json

```json
[
  {
    "slug": "mesopotamia",
    "name": "Mesopotamia",
    "region": "Middle East",
    "periodStart": -3500,
    "periodEnd": -539,
    "summary": "Often regarded as the cradle of civilization.",
    "tags": ["civilization", "ancient"]
  },
  {
    "slug": "ancient-egypt",
    "name": "Ancient Egypt",
    "region": "Africa",
    "periodStart": -3100,
    "periodEnd": -30,
    "summary": "Civilization along the Nile River.",
    "tags": ["civilization", "ancient"]
  },
  {
    "slug": "ancient-greece",
    "name": "Ancient Greece",
    "region": "Europe",
    "periodStart": -800,
    "periodEnd": -146,
    "summary": "Birthplace of philosophy and democracy."
  }
]
```

---

# people.json

```json
[
  {
    "slug": "confucius",
    "name": "Confucius",
    "birthYear": -551,
    "deathYear": -479,
    "occupations": "Philosopher",
    "civilizationSlug": "ancient-china"
  },
  {
    "slug": "buddha",
    "name": "Gautama Buddha",
    "birthYear": -563,
    "deathYear": -483,
    "occupations": "Religious Teacher",
    "civilizationSlug": "ancient-india"
  },
  {
    "slug": "aristotle",
    "name": "Aristotle",
    "birthYear": -384,
    "deathYear": -322,
    "occupations": "Philosopher",
    "civilizationSlug": "ancient-greece"
  }
]
```

---

# ideas.json

```json
[
  {
    "slug": "democracy",
    "title": "Democracy",
    "category": "Politics",
    "summary": "Government by the people."
  },
  {
    "slug": "rule-of-law",
    "title": "Rule of Law",
    "category": "Law"
  },
  {
    "slug": "scientific-method",
    "title": "Scientific Method",
    "category": "Science"
  }
]
```

---

# books.json

```json
[
  {
    "slug": "epic-of-gilgamesh",
    "title": "Epic of Gilgamesh",
    "author": "Unknown",
    "publicationYear": -2100
  },
  {
    "slug": "iliad",
    "title": "Iliad",
    "author": "Homer"
  },
  {
    "slug": "analects",
    "title": "Analects",
    "author": "Confucius"
  }
]
```

---

# events.json

```json
[
  {
    "slug": "big-bang",
    "title": "Big Bang",
    "startYear": -13800000000
  },
  {
    "slug": "agricultural-revolution",
    "title": "Agricultural Revolution",
    "startYear": -10000
  },
  {
    "slug": "industrial-revolution",
    "title": "Industrial Revolution",
    "startYear": 1760
  }
]
```

---

# relationships.json

```json
[
  {
    "sourceSlug": "aristotle",
    "sourceType": "PERSON",
    "targetSlug": "alexander",
    "targetType": "PERSON",
    "relationshipType": "TAUGHT"
  },
  {
    "sourceSlug": "ancient-greece",
    "sourceType": "CIVILIZATION",
    "targetSlug": "democracy",
    "targetType": "IDEA",
    "relationshipType": "CREATED"
  },
  {
    "sourceSlug": "confucius",
    "sourceType": "PERSON",
    "targetSlug": "analects",
    "targetType": "BOOK",
    "relationshipType": "WROTE"
  }
]
```

---

# Quy mô dữ liệu MVP

| Dataset | MVP tối thiểu | Mục tiêu tháng 1 |
|----------|----------|----------|
| Civilizations | 10 | 20 |
| People | 20 | 100 |
| Events | 20 | 200 |
| Ideas | 20 | 50 |
| Books | 20 | 50 |
| Relationships | 50 | 500 |

## Khuyến nghị

Ưu tiên hoàn thiện Seed Dataset trước khi triển khai Neo4j, GraphRAG hoặc AI Tutor.
