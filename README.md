# Watched API Documentation
Watched, is the best movie library service on the market.
Access IMDb's metadata for every movie as well as adding your own movie masterpieces.

The Watched API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

A project for Concordia University's SOEN487, Assignment 3

---
## Functionalities

- Basic Account creation
- Search for any movie
- Create and delete movies
- Follow other users and see what's new with them
##Connected Users
Clients can make calls as connected users, thye will require to register before utilizing certain functionalities.

##Errors
Conventional HTTP response codes are used to indicate the success or failure of an API request.

---
## Installation and Run Locally

1 - Clone the repository
```bash
  git clone git@github.com:immaroot/SOEN487-A3.git
  cd SOEN487-A3
```

2 - Install all dependencies with npm on each folders

```bash
  cd front-end
  npm install
```

```bash
  cd back-end
  npm install
``` 
3 - Launch the back-end server

```bash
  cd back-end
  node index.js
```

4 - Launch the front-end server

```bash
  cd front-end
  node index.js
```
---
#Watched Service API
##Authentication Endpoints

###POST /register/:email:password
Parameters: 
- email (required)
- password (required)

###POST /login/:email:password
Parameter: 
- email (required)
- password (required)

---
##Movie Endpoints

###POST /add/:movieID
Parameter: 
- movieID (required)
 
###POST /delete/:movieID
Parameter: 
- movieID (required)

###POST /search/:query
Parameter: 
- TODO

---
## Tech Stack

- NodeJS : Backend / Frontend
- [Bulma:](https://bulma.io/) Frontend
- [IMDB API](): Movie Lookup services
- [MongoDB:](https://www.mongodb.com/) Database

---
## Authors

- [@immaroot](https://www.github.com/immaroot)
- [@SeedrikMTL-dev](https://www.github.com/SeedrikMTL-dev)
- [@SitpiRajendran](https://www.github.com/SitpiRajendran)
