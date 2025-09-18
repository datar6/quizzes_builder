## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm
- Docker and Docker Compose

### Database Setup (Using Docker)

1.  **Start the PostgreSQL database:** From the project root directory, run:
    ```bash
    docker-compose up -d
    ```

2.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

3.  **Install backend dependencies:**
    ```bash
    npm install
    ```

4.  **Set up the database schema:**
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```

5.  **Start the backend development server:**
    ```bash
    npm run dev
    ```
    The API server will run on `http://localhost:5000`

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will run on `http://localhost:3000`

### Environment Variables

Backend uses `.env` file for configuration:
- `DATABASE_URL="postgresql://quizuser:quizpassword@localhost:5432/quizdb"` - PostgreSQL connection string
- `PORT=5000` - Server port (optional)

