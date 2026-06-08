# Database Schema - Task Management System

## Collection: users

| Field     | Type   | Required | Description              |
|-----------|--------|----------|--------------------------|
| name      | String | Yes      | User full name           |
| email     | String | Yes      | Unique email address     |
| password  | String | Yes      | bcrypt hashed password   |
| createdAt | Date   | Auto     | Registration timestamp   |
| updatedAt | Date   | Auto     | Last update timestamp    |

## Collection: tasks

| Field       | Type     | Required | Description                          |
|-------------|----------|----------|--------------------------------------|
| user        | ObjectId | Yes      | Reference to users collection        |
| title       | String   | Yes      | Task title                           |
| description | String   | No       | Task description                     |
| status      | String   | No       | pending, in-progress, completed      |
| priority    | String   | No       | low, medium, high                    |
| deadline    | Date     | No       | Task due date                        |
| createdAt   | Date     | Auto     | Creation timestamp                   |
| updatedAt   | Date     | Auto     | Last update timestamp                |

## Relationships

- One User → Many Tasks (user field references User._id)
