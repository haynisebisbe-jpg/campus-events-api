# Campus Events API

A RESTful API built with **NestJS and TypeScript** for managing campus events and their sessions.

## Features

- Retrieve all campus events.
- Retrieve upcoming events.
- Retrieve an event by ID.
- Retrieve sessions belonging to an event.
- Retrieve a specific session.
- Create new events.
- Filter events by category, location, and publication status.
- Sort events by date or title.
- Paginate event results.
- Validate incoming data and return appropriate HTTP errors.

## Technologies

- NestJS
- TypeScript
- Node.js
- class-validator
- class-transformer
- REST Client (VS Code extension)

## Installation

```bash
npm install
```

## Build

```bash
npm run build
```

## Run the API

```bash
npm run start:dev
```

The API runs at `http://localhost:3000`.

All endpoints use the `/api` prefix.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/events` | Get all events |
| GET | `/api/events/upcoming` | Get upcoming events |
| GET | `/api/events/:id` | Get an event by ID |
| GET | `/api/events/:id/sessions` | Get event sessions |
| GET | `/api/events/:id/sessions/:sessionId` | Get one session |
| POST | `/api/events` | Create an event |

## Filtering, Sorting, and Pagination

Example:

```text
GET /api/events?category=technology&location=Main%20Campus&isPublished=true&sortBy=eventDate&order=asc&page=1&limit=5
```

Supported query parameters:

- `category`: Filter by event category.
- `location`: Filter by location.
- `isPublished`: Filter by publication status (`true` or `false`).
- `sortBy`: Sort by `eventDate` or `title`.
- `order`: Sort in `asc` or `desc` order.
- `page`: Select the page number.
- `limit`: Number of events per page.

## Data Storage

This project uses in-memory arrays to store events and sessions. Data is not permanently saved and resets when the application restarts.

## Validation and Error Handling

- Invalid event data returns HTTP 400 Bad Request.
- Missing events return HTTP 404 Not Found.
- Missing sessions return HTTP 404 Not Found.
- Successful GET requests return HTTP 200 OK.
- Successful event creation returns HTTP 201 Created.

## Testing

API requests are prepared in `requests.http` using the VS Code REST Client extension.

## Reflection

**1. What is the difference between path parameters and query parameters?**

Path parameters identify a specific resource, such as `/api/events/evt-101`. Query parameters provide optional information used to filter, sort, or paginate results, such as `?category=technology`.

**2. Why must `/upcoming` be defined before `/:id`?**

Because NestJS could interpret `upcoming` as an event ID if the dynamic route is matched first.

**3. Why should filtering happen before pagination?**

Filtering first ensures that pagination applies only to matching events. Otherwise, pages could contain fewer relevant results or miss matching events.

**4. If page = 3 and limit = 5, what is the offset?**

Offset = (page - 1) × limit = (3 - 1) × 5 = 10. The results start at array index 10.

**5. Why separate controllers and services?**

Controllers handle HTTP requests and responses, while services contain the application logic. This separation makes the code easier to maintain and test.

**6. What happens when an event ID does not exist?**

The API returns HTTP 404 Not Found because the requested event cannot be found.

## License

This project is for educational purposes.
## Manual API Test Results

All 13 manual API tests passed using VS Code REST Client.

| Test | Expected result | Status |
|---|---|---|
| Get all events | 200 OK | Passed |
| Get upcoming events | 200 OK | Passed |
| Get one event | 200 OK | Passed |
| Get event sessions | 200 OK | Passed |
| Get one session | 200 OK | Passed |
| Filter by category | 200 OK | Passed |
| Filter by location | 200 OK | Passed |
| Filter by publication status | 200 OK | Passed |
| Sort and paginate | 200 OK | Passed |
| Create event | 201 Created | Passed |
| Reject incomplete event | 400 Bad Request | Passed |
| Reject nonexistent event | 404 Not Found | Passed |
| Reject session under wrong event | 404 Not Found | Passed |