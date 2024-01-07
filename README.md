# Notes App Backend

This is a TypeScript Express backend for a notes application, providing various API routes for user authentication and managing notes.

## Table of Contents

- [Getting Started](#getting-started)
- [Authentication Routes](#authentication-routes)
- [Notes Routes](#notes-routes)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)

## Getting Started

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up your environment variables by creating a `.env` file. (Refer to `.env.example` for required variables)
4. Run the server using `npm start`.

## Authentication Routes

- `/api/auth/signup`: Allows users to create a new account.
- `/api/auth/login`: Allows users to log in and receive an authentication token.

## Notes Routes

- `/api/notes`: 
  - `GET`: Fetches all notes.
  - `POST`: Creates a new note.

- `/api/notes/:id`: 
  - `GET`: Fetches a specific note by its ID.
  - `PUT`: Updates a specific note by its ID.
  - `DELETE`: Deletes a specific note by its ID.

- `/api/search`: 
  - `GET`: Searches for notes based on specified parameters.

- `/api/notes/:id/share`: 
  - `POST`: Shares a note with specified users.

## Usage

1. Ensure the server is running.
2. Use an API testing tool like Postman or curl to send requests to the defined endpoints.

## API Endpoints

- `/api/auth/signup`
  - Method: `POST`
  - Request body: `{ name: string, username: string, password: string }`
  - Response: `{ message: string, token: string }`

- `/api/auth/login`
  - Method: `POST`
  - Request body: `{ username: string, password: string }`
  - Response: `{ message: string, token: string }`

- `/api/notes`
  - Method: `GET`
  - Response: `[ { note1 }, { note2 }, ... ]`

- `/api/notes`
  - Method: `POST`
  - Request body: `{ title: string, body: string }`
  - Response: `{ message: string, note: { createdNote } }`

- `/api/notes/:id`
  - Method: `GET`
  - Response: `{ note }`

- `/api/notes/:id`
  - Method: `PATCH`
  - Request body: `{ title?: string, content?: string }`
  - Response: `{ message: string, updatedNote }`

- `/api/notes/:id`
  - Method: `DELETE`
  - Response: `{ message: string }`

- `/api/notes/search`
  - Method: `GET`
  - Query parameters: `searchTerm: string`
  - Response: `[ { matchedNote1 }, { matchedNote2 }, ... ]`

- `/api/notes/:id/share`
  - Method: `POST`
  - Request body: `{ username: string }`
  - Response: `{ message: string, sharedNote }`

## Dependencies

- Node.js
- Express.js
- TypeScript
- MongoDB (or any preferred database)
- Other dependencies specified in `package.json`
