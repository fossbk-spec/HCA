# HCA ERD v1.0

## Main Tables

### civilizations
id (PK)
name
slug
period_start
period_end
region
summary
content

### people
id (PK)
name
slug
birth_year
death_year
summary
content

### events
id (PK)
title
slug
start_date
end_date
summary
content

### ideas
id (PK)
title
slug
category
summary
content

### books
id (PK)
title
slug
author
publication_year
summary
content

### references
id (PK)
title
url
doi
publisher

### relationships
id (PK)
source_id
source_type
target_id
target_type
relationship_type

## Key Relationships
Civilization -> Person
Person -> Event
Person -> Idea
Idea -> Book
Civilization -> Innovation
