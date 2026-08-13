# Tournament Manager API

A REST API for managing football tournaments, teams, players, and matches. The project was developed with Node.js, Express, MongoDB, Mongoose, Google OAuth, Swagger, and Jest.

## Published Application

- API: https://cse341-tournament-manager-api.onrender.com
- Swagger Documentation: https://cse341-tournament-manager-api.onrender.com/api-docs
- GitHub Repository: https://github.com/EmiRivero2003/CSE341-tournament-manager-api

## Features

- Four MongoDB collections
- Complete CRUD operations
- Data validation on every POST and PUT route
- Error handling with appropriate HTTP status codes
- Google OAuth authentication
- Session-based route protection
- Swagger REST API documentation
- Jest unit tests for every Get and GetAll controller
- Deployment on Render

## Collections

### Tournaments

Stores tournament information such as name, season, country, dates, status, organizer, and participating teams.

### Teams

Stores team information such as name, city, country, founded year, stadium, coach, league, and website.

### Players

Stores player information such as first name, last name, date of birth, nationality, position, shirt number, team, and status.

### Matches

Stores match information such as tournament, home team, away team, date, venue, round, status, and scores.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| GET | `/auth/google` | Log in with Google |
| GET | `/auth/profile` | Get the authenticated user |
| GET | `/auth/logout` | Log out |

### Tournaments

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tournaments` | Get all tournaments |
| GET | `/tournaments/:id` | Get one tournament |
| POST | `/tournaments` | Create a tournament |
| PUT | `/tournaments/:id` | Update a tournament |
| DELETE | `/tournaments/:id` | Delete a tournament |

### Teams

| Method | Endpoint | Description |
|---|---|---|
| GET | `/teams` | Get all teams |
| GET | `/teams/:id` | Get one team |
| POST | `/teams` | Create a team |
| PUT | `/teams/:id` | Update a team |
| DELETE | `/teams/:id` | Delete a team |

### Players

| Method | Endpoint | Protected | Description |
|---|---|---|---|
| GET | `/players` | No | Get all players |
| GET | `/players/:id` | No | Get one player |
| POST | `/players` | Yes | Create a player |
| PUT | `/players/:id` | Yes | Update a player |
| DELETE | `/players/:id` | No | Delete a player |

### Matches

| Method | Endpoint | Protected | Description |
|---|---|---|---|
| GET | `/matches` | No | Get all matches |
| GET | `/matches/:id` | No | Get one match |
| POST | `/matches` | Yes | Create a match |
| PUT | `/matches/:id` | Yes | Update a match |
| DELETE | `/matches/:id` | No | Delete a match |

## Authentication

Google OAuth is used to authenticate users. After a successful login, Passport creates a session and stores it in a secure cookie.

The following routes require authentication:

- `POST /players`
- `PUT /players/:id`
- `POST /matches`
- `PUT /matches/:id`

Unauthenticated requests to these routes return:

```json
{
  "message": "Authentication required."
}
```

with HTTP status code `401`.

## Validation and Error Handling

POST and PUT routes use validation middleware before sending data to MongoDB.

The API uses the following status codes:

- `200` — Request completed successfully
- `201` — Resource created successfully
- `400` — Invalid ID or request data
- `401` — Authentication required
- `404` — Resource not found
- `500` — Internal server error

## Unit Testing

Jest unit tests cover every Get and GetAll controller:

- Get all tournaments
- Get tournament by ID
- Get all teams
- Get team by ID
- Get all players
- Get player by ID
- Get all matches
- Get match by ID

The Mongoose models are mocked, so the tests do not modify production data.

Run all tests with:

```bash
npm test
```

Expected result:

```text
Test Suites: 4 passed, 4 total
Tests:       8 passed, 8 total
```

## Technologies

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Passport
- Google OAuth 2.0
- Express Session
- Express Validator
- Swagger UI
- Jest
- Render

## Local Installation

Clone the repository:

```bash
git clone https://github.com/EmiRivero2003/CSE341-tournament-manager-api.git
```

Enter the project folder:

```bash
cd CSE341-tournament-manager-api
```

Install dependencies:

```bash
npm install
```

Create a `.env` file using `.env.example` as a reference:

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback
```

Start the application:

```bash
npm start
```

Open Swagger locally:

```text
http://localhost:8080/api-docs
```

## Security

Sensitive values are stored in environment variables. The `.env` file is excluded from GitHub through `.gitignore`.

## Author

Emiliano Rivero