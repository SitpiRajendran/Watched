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
##Register
Returns json data about a single user

- URL<br />
/register/:email:password<br />
  <br />
- Method:<br />
`POST`<br />
<br />
- URL Params
  <br />Required:
<br />`email=[string]`
<br />`password=[string]`
<br />
  <br />
- Data Params
    <br />None<br />
  <br />
- Success Response:<br />
  - Code: 200<br />
  Content: `{"User Created"}`<br />
    <br />
- Error Response:<br />
  - Code: 409<br />
    Content: `{"User already registered"}`<br />
    <br />OR<br />
    <br />
- Error Response:<br />
    - Code: 500<br />
      Content: `{"Error during registration"}`<br />
  
---

##Login
Returns json data about a single user

- URL<br />
  /login/:email:password<br />
  <br />
- Method:<br />
  `POST`<br />
  <br />
- URL Params
  <br />Required:
  <br />`email=[string]`
  <br />`password=[string]`
  <br />
  <br />
- Data Params
  <br />None<br />
  <br />
- Success Response:<br />
    - Code: 200<br />
      Content: `{Access Token of user}`<br />
      <br />
- Error Response:<br />
    - Code: 400<br />
      Content: `{"No user found with this email"}`<br />
      <br />OR<br />
      <br />
- Error Response:<br />
    - Code: 400<br />
      Content: `{"password incorrect"}`<br />
      <br />OR<br />
      <br />
- Error Response:<br />
    - Code: 501<br />
      Content: `{"error during logging"}`<br />

---

##Check


- URL<br />
  /login/:accessToken:movieID<br />
  <br />
- Method:<br />
  `POST`<br />
  <br />
- URL Params
  <br />Required:
  <br />`accessToken=[string]`
  <br />`movieID=[string]`
  <br />
  <br />
- Data Params
  <br />None<br />
  <br />
- Success Response:<br />
    - Code: 200<br />
      Content: `{Boolean}`<br />
      <br />
- Error Response:<br />
    - Code: 400<br />
      Content: `{"No user found with this email"}`<br />

---

##Add


- URL<br />
  /login/:accessToken:movieID<br />
  <br />
- Method:<br />
  `POST`<br />
  <br />
- URL Params
  <br />Required:
  <br />`accessToken=[string]`
  <br />`movieID=[string]`
  <br />
  <br />
- Data Params
  <br />None<br />
  <br />
- Success Response:<br />
    - Code: 200<br />
      Content: `{"Movie Added"}`<br />
      <br />
- Error Response:<br />
    - Code: 400<br />
      Content: `{"No user found with this email"}`<br />

---

##Delete


- URL<br />
  /login/:accessToken:movieID<br />
  <br />
- Method:<br />
  `POST`<br />
  <br />
- URL Params
  <br />Required:
  <br />`accessToken=[string]`
  <br />`movieID=[string]`
  <br />
  <br />
- Data Params
  <br />None<br />
  <br />
- Success Response:<br />
    - Code: 200<br />
      Content: `{"Movie Deleted"}`<br />
      <br />
- Error Response:<br />
    - Code: 400<br />
      Content: `{"No user found with this email"}`<br />

---

##Search


- URL<br />
  /login/:accessToken:query<br />
  <br />
- Method:<br />
  `POST`<br />
  <br />
- URL Params
  <br />Required:
  <br />`accessToken=[string]`
  <br />`movieID=[string]`
  <br />
  <br />
- Data Params
  <br />None<br />
  <br />
- Success Response:<br />
    - Code: 200<br />
      Content: `{"TBD"}`<br />
      <br />
- Error Response:<br />
    - Code: 403<br />
      Content: `{"TBD"}`<br />

---

##Details


- URL<br />
  /login/:accessToken:query<br />
  <br />
- Method:<br />
  `POST`<br />
  <br />
- URL Params
  <br />Required:
  <br />`accessToken=[string]`
  <br />`movieID=[string]`
  <br />
  <br />
- Data Params
  <br />None<br />
  <br />
- Success Response:<br />
    - Code: 200<br />
      Content: `{"TBD"}`<br />
      <br />
- Error Response:<br />
    - Code: 403<br />
      Content: `{"TBD"}`<br />
    
---
## Tech Stack

- NodeJS : Backend / Frontend
- [Bulma:](https://bulma.io/) Frontend
- [IMDB API](https://www.themoviedb.org/): Movie Lookup services
- [MongoDB:](https://www.mongodb.com/) Database

---
## Authors

- [@immaroot](https://www.github.com/immaroot)
- [@SeedrikMTL-dev](https://www.github.com/SeedrikMTL-dev)
- [@SitpiRajendran](https://www.github.com/SitpiRajendran)
