# Shortify Plus

A clean, minimal URL shortener with a modern React + Tailwind frontend and an Express + MongoDB backend.

## Features

- **URL Shortening**
  - Generate random short links
  - Optional custom alias (3–20 characters, alphanumeric + `-_`) with real-time availability check

- **User Authentication**
  - Sign in with Google OAuth

- **Link Management**
  - View your links (newest first) with pagination (5 or 10 per page)
  - Delete (or Copy) individual links

## Quick Start

1. **Clone and install dependencies**
   ```bash
   git clone 
   cd shortify-plus
   npm install
   ```

2. **Configure environment**
   Create a `.env` file with:
   ```
   MONGO_URI=
   PORT=5000
   GOOGLE_CLIENT_ID=
   BASE_URL=http://localhost:5000
   ```

3. **Run the backend**
   ```bash
   node server/server.js
   ```

4. **Run the frontend**
   ```bash
   npm start
   ```

## API Endpoints

- `POST /shorten` – create a short link
- `GET /urls/:userId` – get all of a user's links
- `DELETE /delete/:shortUrl` – delete a link
- `GET /check/:customShortUrl` – check custom alias availability
- `GET /:shortUrl` – redirect to the original URL

## Technologies

- **Backend:** Node.js, Express, Mongoose (MongoDB), ES Modules
- **Frontend:** React, Tailwind CSS, React Hooks, React OAuth Google

Enjoy shortening your URLs with Shortify Plus!
