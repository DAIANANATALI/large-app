# NestJS Template

A modern, production-ready NestJS template with authentication, authorization, and Google OAuth integration.

## 🚀 Features

- **Authentication System**
  - JWT-based authentication with custom token management
  - User registration and login
  - Google OAuth integration
  - Account linking/unlinking functionality

- **Authorization & Security**
  - Role-based access control (USER, ADMIN)
  - Route guards for authentication and authorization
  - Password hashing with Argon2

- **Database**
  - PostgreSQL with Prisma ORM
  - User and Token models
  - Database migrations and schema management

- **Code Quality**
  - TypeScript with strict configuration
  - ESLint with Perfectionist plugin for code organization
  - Prettier for consistent formatting
  - Pre-configured Jest testing setup

- **Developer Experience**
  - Hot reload in development
  - Path aliases for clean imports (`~/`)
  - Comprehensive error handling
  - CORS enabled
  - Global validation pipes

## 📦 Tech Stack

- **Framework:** NestJS 11.x
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Custom JWT + Google OAuth
- **Validation:** class-validator, class-transformer
- **Testing:** Jest
- **Code Quality:** ESLint, Prettier, TypeScript

## 🏗️ Project Structure

```
src/
├── app/                    # Application module and configuration
├── common/                 # Shared utilities
│   ├── decorators/        # Custom decorators (@CurrentUser, @Roles)
│   └── guards/            # Route guards (AuthGuard, RolesGuard)
├── database/              # Database configuration and Prisma service
├── modules/               # Feature modules
│   ├── auth/             # Authentication (login, register)
│   ├── auth-google/      # Google OAuth integration
│   ├── tokens/           # Token management
│   └── users/            # User management
└── types/                # TypeScript type definitions

prisma/
└── schema.prisma         # Database schema
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- pnpm (recommended) or npm

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd nest-template
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Configure the following variables in `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
PORT=8080
```

4. Set up the database

```bash
# Generate Prisma client
pnpm run db:generate

# Push schema to database
pnpm run db:push
```

5. Start the development server

```bash
pnpm run dev
```

The API will be available at `http://localhost:8080`

## 📡 API Endpoints

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/google` - Google OAuth login
- `POST /auth/google/link` - Link Google account (requires auth)
- `POST /auth/google/unlink` - Unlink Google account (requires auth)

### Users

- `GET /users` - Get all users (ADMIN only)
- `GET /users/me` - Get current user profile
- `GET /users/:id` - Get user by ID (ADMIN only)
- `PATCH /users/:id` - Update user (ADMIN only)
- `DELETE /users/:id` - Delete user (ADMIN only)

### Tokens

- `GET /tokens` - Get user tokens (requires auth)
- `DELETE /tokens/:id` - Delete specific token (requires auth)

## 🔐 Authentication Flow

1. **Registration:** `POST /auth/register` with user details
2. **Login:** `POST /auth/login` with credentials
3. **Authorization:** Include `Authorization: Bearer <token>` header in requests
4. **Google OAuth:** Use `POST /auth/google` with authorization code

## 🛡️ Authorization

The template includes a role-based authorization system:

- `@Roles('USER')` - Requires USER role
- `@Roles('ADMIN')` - Requires ADMIN role
- `@UseGuards(AuthGuard)` - Requires authentication
- `@UseGuards(AuthGuard, RolesGuard)` - Requires authentication and specific role

## 🧪 Development Scripts

```bash
# Development
pnpm run dev              # Start with hot reload
pnpm run start            # Start normally
pnpm run start:prod       # Start in production mode

# Building
pnpm run build            # Build for production

# Testing
pnpm run test             # Run unit tests
pnpm run test:watch       # Run tests in watch mode
pnpm run test:e2e         # Run e2e tests
pnpm run test:cov         # Run tests with coverage

# Database
pnpm run db:generate      # Generate Prisma client
pnpm run db:push          # Push schema to database

# Code Quality
pnpm run lint             # Run ESLint
pnpm run format           # Format code with Prettier
```

## 🔧 Configuration

### Database Schema

The project uses Prisma with PostgreSQL. Key models:

- **User:** Contains user information, roles, and Google integration
- **Token:** JWT tokens with expiration for authentication
- **Role:** Enum with USER and ADMIN values

### Environment Variables

| Variable               | Description                  | Required |
| ---------------------- | ---------------------------- | -------- |
| `DATABASE_URL`         | PostgreSQL connection string | Yes      |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID       | Yes      |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret   | Yes      |
| `PORT`                 | Server port (default: 8080)  | No       |

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License.
