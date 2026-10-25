# AutoVault Backend

Node.js + Express + TypeScript + MongoDB backend compatible with the AutoVault React frontend.

## Requirements
- Node.js LTS
- MongoDB running locally, or a MongoDB connection URI

## Setup
1. Extract this folder.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and set a strong `JWT_SECRET`.
4. Ensure MongoDB is running.
5. Seed sample cars: `npm run seed`.
6. Start API: `npm run dev`.
7. API base URL: `http://localhost:4000/api`; health check: `http://localhost:4000/api/health`.

## First admin account
Registration always creates a normal user. To create an admin, register a user, then use a trusted database administration tool to set that user's `role` to `admin`. Do not expose a public endpoint for promoting roles.

## API endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (JWT required)
- `GET /api/vehicles` (public)
- `GET /api/vehicles/:id` (public)
- `POST /api/vehicles` (admin)
- `PUT /api/vehicles/:id` (admin)
- `DELETE /api/vehicles/:id` (admin)
- `POST /api/vehicles/:id/purchase` (JWT required)

The purchase route atomically decrements quantity only if stock is greater than zero. This is a learning starter; add rate limiting, monitoring, stronger session controls, and production deployment hardening before public deployment.
