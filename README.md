## Luxor Full-stack Applications Challenge: Bidding System

### Introduction
This project is a simple bidding system built using Next.js, Prisma, PostgreSQL, Redux Toolkit, styled-components, and JWT authentication. It allows users to view collections, place bids, and manage collections and bids.

### Prerequisites
Ensure you have the following installed:

- Node.js (v18 or higher recommended)
- PostgreSQL
- Git

### Project Structure
Here is a brief overview of the file and folder structure of the project:

```
bid-system
├── package.json
├── prisma
│   ├── migrations
│   │   └── ...
│   └── schema.prisma
├── public
│   └── ...
├── README.md
├── src
│   ├── components
│   │   └── ...
│   ├── layout
│   │   └── ...
│   ├── libs
│   │   └── ...
│   ├── pages
│   │   └── ...
│   ├── store
│   │   └── ...
│   ├── styles
│   │   └── ...
│   ├── types
│   │   └── ...
│   └── utils
│       └── ...
└── tsconfig.json
```

### Setup Instructions
To run the project, follow these steps:
1. Run `npm install` to install dependencies.
2. Run `npm prisma migrate dev` to apply migrations.
3. Run `npx prisma db pull` to pull the database schema.

### API Endpoints
- **/api/bid**: Create, update, delete, and get bids.
- **/api/collection**: Create, update, delete, and get collections.
- **/api/user**: Login endpoint by email and password with JWT token.

### Features
- **Home Page**: Displays all collections.
- **Login Page**: Allows users to sign in.
- **Product Detail Page**: Shows specific product details and bids list.

### Judging Criteria
- **Code Quality**: Well-structured and commented code.
- **UX**: User-friendly interface.
- **Performance**: Efficient rendering of components and API calls.
- **Authentication**: Optional, but a bonus if implemented.

### Monitoring and Scalability
- **Monitoring**: Implement logging and use tools like Sentry or ELK stack for monitoring application health.
- **Scalability**: Use horizontal scaling with load balancers and cache frequently accessed data.

### Trade-offs
- **Time Constraints**: Due to time limitations, some features may not be fully optimized.
- **Resource Allocation**: With more time and resources, I would focus on enhancing authentication and adding more robust error handling.

### Repository
The project repository can be found on GitHub at [https://github.com/Donducci/bidsystem](#).