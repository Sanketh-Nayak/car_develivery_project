# AutoVault Car Dealership Frontend

React + TypeScript + Vite + Tailwind CSS SPA.

## Run
1. Install Node.js LTS.
2. Run `npm install` in this directory.
3. Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend URL.
4. Run `npm run dev` and open http://localhost:5173.

## Expected API
- POST `/auth/register` -> `{ token, user }`
- POST `/auth/login` -> `{ token, user }`
- GET `/vehicles` -> array, `{ vehicles: [] }`, or `{ data: [] }`
- POST `/vehicles` (admin)
- PUT `/vehicles/:id` (admin)
- DELETE `/vehicles/:id` (admin)
- POST `/vehicles/:id/purchase`

Vehicle fields: `_id` or `id`, `make`, `model`, `year`, `price`, `quantity`, optional `imageUrl`, optional `description`.

The backend must enforce authentication, admin permissions, validation, and stock availability. Purchase should update stock atomically. This demo stores JWT in localStorage; consider secure HttpOnly cookies for production.
