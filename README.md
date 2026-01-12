# SK+ Hotel Website

A luxurious hotel website built with React, TypeScript, Node.js, Express, and MongoDB.

## Project Structure

- `client/` - React frontend application (Vite + TypeScript + Tailwind CSS)
- `server/` - Node.js backend application (Express + TypeScript + MongoDB/Mongoose)
- `shared/` - Shared types and utilities between client and server

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies for both client and server:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
3. Copy `.env.example` to `.env` and configure your environment variables
4. Start MongoDB (if running locally)

### Development

#### Client (Frontend)
```bash
cd client
npm run dev
```
The client will run on http://localhost:5173

#### Server (Backend)
```bash
cd server
npm run dev
```
The server will run on http://localhost:5000

## Technology Stack

### Frontend
- React 18+
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

## License

Private project - SK+ Hotel
