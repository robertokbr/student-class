# Student Class API
### Thi project was bootstrapped by the Nest.JS CLI and has been made with the following technologies:

### Technologies
- Nest.JS: Web Framework
- Prisma.io: ORM
- PostgreSQL: Relational DB
- Class transformer: Serializer
- Class Validator: Validator
- Swagger: Documentation builder
- Jest: Test lib

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
-
