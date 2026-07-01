# HY-351 Project

This project is developed as a monorepo for the CS351 course assignment, by **[Maria Alatsaki](https://github.com/Alatsakimaria)** and **[Marsel Senka](https://github.com/marselosenka)**. It combines a frontend, backend, and database setup in a single repository to meet the required course objectives and demonstrate a working full-stack application prototype. It is intended as a learning-oriented implementation rather than a final, production-ready product.

---

## Overview

The project is split into three main parts:

- `frontend`: the user-facing Next.js application
- `backend`: the NestJS API and database seeding logic
- `docker-compose.yml`: local orchestration for MySQL, the backend, the frontend, and phpMyAdmin

---

## Project Structure

```text
HY-351-PROJECT/
??? backend/           # NestJS API and seed scripts
??? frontend/          # Next.js frontend app
??? mysql_data/        # Local MySQL persistence data
??? docker-compose.yml # Docker services configuration
??? README.md          # Project documentation
```

---

## Requirements

Before running the project locally, make sure you have:

- Docker Desktop with Docker Compose
- Node.js and npm (useful for running backend scripts directly)
- A modern web browser

---

## Run with Docker

From the project root, start all services with:

```bash
docker compose up --build
```

This will bring up:

- the frontend at `http://localhost:3000`
- the backend at `http://localhost:5000`
- phpMyAdmin at `http://localhost:8080`

---

## Seed Toy Data

After MySQL is up and the backend container is running, seed the database with example data:

```bash
cd backend
npm run seed
```

If you are running everything through Docker, you can also execute the seed command from inside the backend container:

```bash
docker compose exec backend npm run seed
```

This helps populate the local database with sample records for development and testing.

---

## Environment Configuration

If you want to override the default configuration values, create a `.env` file based on `.env.example`.

### Main variables

- `API_BASE_URL` for server-side frontend requests
- `NEXT_PUBLIC_API_BASE_URL` for browser-side frontend requests
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` for backend database configuration

---

## Notes

- The application is intended for local development and demonstration.
- Docker Compose handles the database and service wiring so you can start the whole stack quickly.
- The seed script is useful for initializing the database with sample data before using the app.
