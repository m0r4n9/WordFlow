# Backend Service

A robust NestJS-based backend service for managing study sets and flashcards with authentication.

## Features

- 🔐 **Authentication System**

  - JWT-based authentication
  - Refresh token mechanism
  - User registration and login
  - Password hashing with bcrypt

- 📚 **Study Sets Management**

  - Create and manage study sets
  - Organize flashcards within sets
  - Position tracking for cards

- 🎴 **Flashcards System**

  - CRUD operations for flashcards
  - Term and definition management
  - Position ordering

- 🛡️ **Security Features**
  - Rate limiting with ThrottlerModule
  - Environment-based configuration
  - Secure cookie handling

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with TypeORM
- **Authentication**: Passport.js & JWT
- **API Documentation**: Swagger/OpenAPI
- **Validation**: class-validator & class-transformer
- **Testing**: Jest

## Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=your_database
JWT_SECRET=your_jwt_secret
```

## Installation

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build
npm run start:prod
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api
```

## Available Scripts

- `npm run build` - Build the application
- `npm run format` - Format code with Prettier
- `npm run start` - Start the application
- `npm run dev` - Start in development mode with watch
- `npm run lint` - Lint the code

## Project Structure

```
src/
├── auth/           # Authentication module
├── cards/          # Flashcards module
├── study-sets/     # Study sets module
├── users/          # Users module
├── common/         # Shared utilities
└── app.module.ts   # Main application module
```
