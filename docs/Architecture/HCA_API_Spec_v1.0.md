# HCA API Specification v1.0

Base URL: /api

## Civilizations
GET /civilizations
GET /civilizations/{slug}
POST /civilizations
PUT /civilizations/{id}

## People
GET /people
GET /people/{slug}

## Events
GET /events
GET /events/{slug}

## Ideas
GET /ideas
GET /ideas/{slug}

## Books
GET /books
GET /books/{slug}

## Search
GET /search?q=

## Graph
GET /graph/entity/{id}
GET /graph/neighbors/{id}

Response JSON
{
  "id":"egypt",
  "name":"Ancient Egypt"
}
