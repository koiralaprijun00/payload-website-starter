# Payload Website Template (MongoDB Edition)

This is the official [Payload Website Template](https://github.com/payloadcms/payload/blob/main/templates/website), now configured for MongoDB. Use it to power websites, blogs, or portfolios from small to enterprise. This repo includes a fully-working backend, enterprise-grade admin panel, and a beautifully designed, production-ready website.

You can deploy to Vercel, using MongoDB Atlas and Vercel Blob Storage with one click.

---

## Quick Start - Local Setup (MongoDB)

1. **Clone the repo**
2. `cd my-project && cp .env.example .env` to copy the example environment variables.
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
4. **Set up MongoDB:**
   - For local development, [install MongoDB Community Edition](https://www.mongodb.com/docs/manual/installation/) and start it:
     ```bash
     mongod
     # or, on macOS with Homebrew:
     brew services start mongodb-community
     ```
   - For cloud, [create a free MongoDB Atlas cluster](https://www.mongodb.com/atlas/database) and get your connection string.
5. **Configure your .env:**
   - For local:
     ```
     MONGODB_URI=mongodb://localhost:27017/payload
     ```
   - For Atlas:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
     ```
6. Start the dev server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
7. Open `http://localhost:3000` to view the app.

---

## Production/Deployment

- Deploy to Vercel and set your `MONGODB_URI` environment variable in the Vercel dashboard (use your Atlas URI for production).
- No SQL migrations are needed for MongoDB. Payload manages the schema automatically based on your config and collections.

---

## What Changed from the Original Template?
- **Database:** Uses MongoDB (local or Atlas) instead of Postgres/Neon.
- **No SQL migrations:** You do not need to run or manage SQL migrations. Payload will handle schema changes automatically.
- **No Docker or docker-compose:** This project does not require Docker for local development unless you want to run MongoDB in a container (not included by default).
- **.env:** Use `MONGODB_URI` instead of `POSTGRES_URL`.

---

## Services

- **MongoDB** (local or Atlas)
- **Vercel Blob Storage** (for media uploads)

---

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
