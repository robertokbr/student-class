# Student Class API
### This project was bootstrapped by the Nest.JS CLI and has been made with the following technologies:

### Technologies
- Nest.JS: Web Framework
- Prisma.io: ORM
- PostgreSQL: Relational DB
- Class transformer: Serializer
- Class Validator: Validator
- Swagger: Documentation builder
- Jest: Test lib
- Supertest: E2E Test lib

### Architecture
- Clean Architecture
  - domain
    - dtos
    - models
    - interfaces
    
  - infrastructure
    - filters & interceptors
    - frameworks & libs configs
    - database
    - modules controllers and repositories
    - integration tests
  - usecases
    - usecases & unit tests

### How to run
- Copy `.env`
```bash
  cp .env.example .env
```
- Run local database container
```bash
  docker-compose up -d
```
- Install deps
```bash
  yarn
```
- Run db migrations
```bash
  yarn prisma migrate dev
```
- Run server on dev mode
```bash
  yarn start:dev
```

Open http://localhost:3333/docs to see the documentation.

Run `yarn prisma studio` to take a look at the database.

### How to run tests
```bash
  # unit
  yarn test

  # e2e
  yarn test:e2e

  # integration
  yarn test:int
```

