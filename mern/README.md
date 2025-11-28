## MERN Cart Quantity Controls

This sample shows how to add **increment (+)** and **decrement (-)** quantity buttons for cart items with a MongoDB + Express backend and a React frontend.

### Structure

```
mern/
 ├── server/        # Express + MongoDB API
 └── client/        # React (Vite) frontend
```

### Prerequisites

1. Node.js 18+
2. MongoDB instance (local or Atlas)

### Setup

1. **Backend**
   ```bash
   cd mern/server
   npm install
   cp env.example .env          # fill in MONGO_URI + PORT
   npm run dev
   ```

2. **Frontend**
   ```bash
   cd mern/client
   npm install
   npm run dev
   ```

Open `http://localhost:5173`. The React UI lists sample products; selecting **Add to cart** reveals + / − buttons backed by the Express API, so quantity changes persist across reloads.

