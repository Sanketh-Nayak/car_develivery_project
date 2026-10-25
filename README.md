# Car Dealership Inventory System

A full-stack web application for managing car inventory, user authentication, vehicle search, and vehicle purchases. Administrators can add, update, and delete vehicles, while registered users can browse available cars and purchase them when stock is available.

## Features

### User Features

- User registration and login
- Secure JWT-based authentication
- Browse available vehicles
- Search and filter vehicles
- View vehicle details, prices, and stock quantities
- Purchase vehicles when stock is greater than zero
- Prevent purchases when a vehicle is out of stock

### Admin Features

- Add new vehicles
- Update vehicle information
- Delete vehicles
- Manage vehicle inventory and stock quantities

## Technology Stack

**Frontend**

- HTML5
- CSS3
- React
- TypeScript
- Tailwind CSS
- Vite

**Backend**

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt
- Zod validation

## Project Structure

```text
car_dealership_inventory/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── .env.example
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── validation/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   └── seed.ts
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Prerequisites

Install the following before running the application:

- Node.js and npm
- MongoDB installed locally or a MongoDB Atlas connection
- Git

## Installation and Setup

### 1. Download the project

Extract the frontend and backend ZIP files into separate folders.

### 2. Configure the backend

Open a terminal in the backend directory:

```bash
cd car-dealership-backend
npm install
```

Copy `.env.example` to `.env`.

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Configure the environment variables in `.env`:

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/car_dealership
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
```

Ensure MongoDB is running before starting the backend.

### 3. Seed the database

From the backend directory, run:

```bash
npm run seed
```

If npm reports `Missing script: "seed"`, confirm that you are in the backend directory and that its `package.json` contains a `seed` script. The seed file must also exist at `src/seed.ts`.

### 4. Start the backend

```bash
npm run dev
```

The backend should run at:

```text
http://localhost:4000
```

Check the health endpoint:

```text
http://localhost:4000/api/health
```

### 5. Configure the frontend

Open a separate terminal in the frontend directory:

```bash
npm install
```

Copy `.env.example` to `.env` and configure:

```env
VITE_API_URL=http://localhost:4000/api
```

Start the frontend:

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

## API Endpoints

Base URL: `http://localhost:4000/api`

| Method | Endpoint                 | Description         | Access        |
| ------ | ------------------------ | ------------------- | ------------- |
| POST   | `/auth/register`         | Register a user     | Public        |
| POST   | `/auth/login`            | Log in              | Public        |
| GET    | `/auth/me`               | Get current user    | Authenticated |
| GET    | `/vehicles`              | List vehicles       | Public        |
| GET    | `/vehicles/:id`          | Get vehicle details | Public        |
| POST   | `/vehicles`              | Add a vehicle       | Admin         |
| PUT    | `/vehicles/:id`          | Update a vehicle    | Admin         |
| DELETE | `/vehicles/:id`          | Delete a vehicle    | Admin         |
| POST   | `/vehicles/:id/purchase` | Purchase a vehicle  | Authenticated |
| GET    | `/health`                | Check API status    | Public        |

Protected endpoints require a valid JWT access token. Admin endpoints also require the authenticated user to have the admin role.

## Testing

Run backend tests from the backend directory:

```bash
npm test
```

Build the backend:

```bash
npm run build
```

Run these commands only after installing the backend dependencies and verifying the scripts in `package.json`.

## Security

- Passwords are hashed before storage.
- JWT tokens authenticate protected requests.
- Admin authorization is enforced on inventory management endpoints.
- User registration must not allow users to assign themselves the admin role.
- Purchase operations should update stock atomically to prevent overselling.

For development, promote an administrator through a trusted database operation or a dedicated, secured administrative setup process.

## Troubleshooting

**Error: `Missing script: "seed"`**

Run `npm run` to list available scripts. Make sure you are in the backend folder, not the frontend or a parent directory.

**Error: MongoDB connection failed**

Verify that MongoDB is running and that `MONGODB_URI` is correct.

**Error: Frontend cannot connect to backend**

Check that the backend is running on port `4000` and that the frontend's `VITE_API_URL` is correct.

**Error: Unauthorized or forbidden**

Log in again and check that the token is included in protected requests. Admin operations require an account with the admin role.

## Future Enhancements

- Vehicle image uploads
- Pagination and advanced filtering
- Purchase history and order management
- Payment gateway integration
- Automated integration tests
- Deployment to a cloud platform

## License

This project is intended for educational and development purposes. Add a license if you plan to distribute it publicly.
