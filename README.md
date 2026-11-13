# Campus Events API

A RESTful API built with **NestJS and TypeScript** for managing campus events and their sessions.

## Features

- Retrieve all campus events.
- Retrieve upcoming events.
- Retrieve an event by ID.
- Retrieve sessions belonging to an event.
- Retrieve a specific session belonging to an event.
- Create new campus events.
- Filter events by category, location, and publication status.
- Sort events by date or title.
- Paginate event results.
- Validate incoming data and return appropriate HTTP errors.
- Verify that a session belongs to the requested event.

## Technologies

- NestJS
- TypeScript
- Node.js
- class-validator
- class-transformer
- REST Client (VS Code extension)

## Installation

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/haynisebisbe-jpg/campus-events-api.git
cd campus-events-api
```

Install dependencies:

```bash
npm install
```

## Build

To compile the application:

```bash
npm run build
```

## Run the API

Start the development server:

```bash
npm run start:dev
```

The API runs at:

`http://localhost:3000`

All API endpoints use the global `/api` prefix.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/events` | Get all events |
| GET | `/api/events/upcoming` | Get upcoming events |
| GET | `/api/events/:id` | Get an event by ID |
| GET | `/api/events/:id/sessions` | Get sessions belonging to an event |
| GET | `/api/events/:id/sessions/:sessionId` | Get one session belonging to an event |
| POST | `/api/events` | Create a new event |

## Filtering, Sorting, and Pagination

The `GET /api/events` endpoint supports the following optional query parameters:

| Parameter | Description | Example |
|---|---|---|
| `category` | Filter by event category | `?category=technology` |
| `location` | Filter by event location | `?location=Main%20Campus` |
| `isPublished` | Filter by publication status | `?isPublished=true` |
| `sortBy` | Sort by eventDate or title | `?sortBy=eventDate` |
| `order` | Ascending or descending order | `?order=asc` |
| `page` | Select the page number | `?page=2` |
| `limit` | Number of events per page | `?limit=3` |

### Example Request

```text
GET /api/events?category=technology&location=Main%20Campus&isPublished=true&sortBy=eventDate&order=asc&page=1&limit=5
```

### How Filtering, Sorting, and Pagination Work

The API processes event results in three steps:

**1. Filtering**

First, the API filters events by category, location, and publication status. Only events matching the requested conditions remain.

**2. Sorting**

Next, the filtered results are sorted by event date or title in ascending or descending order.

The API sorts a copy of the results using the spread operator, so the original seed data is not changed.

**3. Pagination**

Finally, the API returns only the events belonging to the requested page.

The pagination formula is:

```text
offset = (page - 1) × limit
start = offset
end = start + limit
items = sortedEvents.slice(start, end)
```

The API returns a consistent response containing:

- `items`: Events on the current page.
- `total`: Total number of matching events.
- `page`: Current page number.
- `limit`: Number of events per page.
- `totalPages`: Total number of available pages.

## Data Storage

This project uses in-memory arrays to store events and sessions.

A database is not required for this practical exercise. Data is not permanently saved and resets when the application restarts.

The project includes six sample events and four sample sessions. Two events each have two sessions.

## Validation and Error Handling

The API uses `class-validator`, `class-transformer`, and NestJS `ValidationPipe` to validate incoming event data.

The application returns the following HTTP status codes:

| Status Code | Meaning |
|---|---|
| 200 OK | Successful GET request |
| 201 Created | Successful event creation |
| 400 Bad Request | Invalid or incomplete event data |
| 404 Not Found | Requested event or session does not exist |

Nested session routes also verify that the requested session belongs to the selected event.

## Testing

API requests are provided in the `requests.http` file and can be executed using the REST Client extension in Visual Studio Code.

All 14 manual API tests passed.

### Manual API Test Results

| No. | Test | Expected Result | Status |
|---|---|---|---|
| 1 | Get all events | 200 OK | Passed |
| 2 | Get upcoming events | 200 OK | Passed |
| 3 | Get one event by ID | 200 OK | Passed |
| 4 | Get sessions for an event | 200 OK | Passed |
| 5 | Get one session | 200 OK | Passed |
| 6 | Filter by category | 200 OK | Passed |
| 7 | Filter by location | 200 OK | Passed |
| 8 | Filter by publication status | 200 OK | Passed |
| 9 | Sort and paginate | 200 OK | Passed |
| 10 | Create a valid event | 201 Created | Passed |
| 11 | Reject incomplete event data | 400 Bad Request | Passed |
| 12 | Request a nonexistent event | 404 Not Found | Passed |
| 13 | Request a session under the wrong event | 404 Not Found | Passed |
| 14 | Create an event with a missing title | 400 Bad Request | Passed |

## Reflection

### 1. What is the difference between a path parameter and a query parameter? Give one example of each.

A path parameter identifies a specific resource. For example, `/api/events/evt-101` uses `evt-101` as the event ID.

A query parameter provides optional information to filter, sort, or paginate results. For example, `/api/events?category=technology` filters events by category.

### 2. Why should `/upcoming` be declared before `/:id`?

Because `/upcoming` is a static route. If the dynamic `/:id` route is declared first, NestJS could interpret `upcoming` as an event ID instead of matching the intended route.

### 3. Why should filtering happen before pagination?

Filtering must happen first so that pagination applies only to matching events. Otherwise, pages could contain fewer relevant results or matching events could be missed.

### 4. If page = 3 and limit = 5, what is the offset and which array index starts the page?

The formula is:

`offset = (page - 1) × limit`

`offset = (3 - 1) × 5 = 10`

The offset is 10, and the page starts at array index 10.

### 5. Why should the controller call the service instead of containing all business logic?

The controller handles HTTP requests and receives request data. The service handles the business logic, such as finding, filtering, sorting, and creating events.

Separating these responsibilities makes the application easier to maintain, understand, and test.

### 6. What status code should be returned when an event does not exist, and why?

The API should return `404 Not Found` because the requested event does not exist in the application's data.

## License

This project was developed for educational purposes as part of the CodeOps Module 4 Day 56 practical exercise.