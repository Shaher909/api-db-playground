# API DB Playground

This repository contains a simple API and a database setup for testing and learning purposes. It includes a basic Express server

## Installation and setup

1- Start your docker with postgress database

2- Perform the migration to create the user table

-- to create some users, use curl to do a POST request:

```
curl -X POST http://localhost:3000/users \
 -H "Content-Type: application/json" \
 -d '{"username": "yourUserName", "password": "replace_with_pass"}'
```

3- Install dependencies `npm install`

4- Build the application

```
npm run build
```

5- Start the server

```
npm run start
```

## End points

`/home` - start point of the application

`/users`- get all the users

`/users/authenticate`- authenticate a user with username and password (after decrypting the password with bcrypt)
-- in order to simulate a request for authentication, use curl:

```
curl -X POST http://localhost:3000/users/authenticate \
 -H "Content-Type: application/json" \
 -d '{"username": "username", "password": "pass"}'
```

if the authenticattion is successful, you'll see the the following in the server logs: "password matched". While you'd get "no user found or password did not match" if the authentication fails.
