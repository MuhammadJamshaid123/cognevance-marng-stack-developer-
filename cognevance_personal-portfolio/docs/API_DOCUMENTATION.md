# API Documentation - Personal Portfolio

Base URL: `http://localhost:5001/api`

## Health Check

### GET /health

Returns API status.

**Response (200):**
```json
{
  "success": true,
  "message": "Portfolio API is running"
}
```

---

## Contact

### POST /contact

Submit a contact form message.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project."
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I would like to discuss a project.",
    "createdAt": "2026-06-07T..."
  }
}
```

### GET /contact

Retrieve all contact submissions (for admin use).

**Response (200):**
```json
{
  "success": true,
  "data": [...]
}
```
