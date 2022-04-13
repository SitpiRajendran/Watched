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
## Connected Users
Clients can make calls as connected users, thye will require to register before utilizing certain functionalities.

## Errors
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
# Watched Service API
## Register
Returns success message.

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

## Login
Returns success message.

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

## Check
Returns Boolean depending on if the movie was watched.

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

## Add
Returns success message.

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

## Delete
Returns success message.

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

## Search
Returns JSON data about the searched movies.

- URL<br />
  /login/:accessToken:query<br />
  <br />
- Method:<br />
  `POST`<br />
  <br />
- URL Params
  <br />Required:
  <br />`accessToken=[string]`
  <br />`query=[string]`
  <br />
  <br />
- Data Params
  <br />None<br />
  <br />
- Success Response:<br />
    - Code: 200<br />
      Content: `{"{\
      page: x,
      results: [
      {
      id: xxxx,
      backdrop_path: '/xxxxxxx.jpg',
      genre_ids: [Array],
      vote_count: xxxxx,
      original_language: 'xx',
      original_title: 'xxxxx',
      poster_path: '/xxxxx.jpg',
      title: 'xxxx',
      video: false,
      vote_average: 8.2,
      adult: false,
      overview: 'xxxx',
      release_date: '2021-12-15',
      popularity: 6120.418,
      media_type: 'movie'
      },
      "}`<br />
      <br />
- Error Response:<br />
    - Code: 403<br />
      Content: `{"403 Forbidden"}`<br />

---

## Follow
Returns JSON data about the searched movies.

- URL<br />
  /login/:accessToken:email<br />
  <br />
- Method:<br />
  `POST`<br />
  <br />
- URL Params
  <br />Required:
  <br />`accessToken=[string]`
  <br />`email=[string]`
  <br />
  <br />
- Data Params
  <br />None<br />
  <br />
- Success Response:<br />
    - Code: 200<br />
      Content: `{"Email Added to following"}`<br />
      <br />
- Error Response:<br />
    - Code: 403<br />
      Content: `{"403 Forbidden"}`<br />

---

## Details
Returns JSON data about the movie.

- URL<br />
  /login/:accessToken:query<br />
  <br />
- Method:<br />
  `POST`<br />
  <br />
- URL Params
  <br />Required:
  <br />`accessToken=[string]`
  <br />`query=[string]`
  <br />
  <br />
- Data Params
  <br />None<br />
  <br />
- Success Response:<br />
    - Code: 200<br />
      Content: `{"{
      page: x,
      results: [
      {
      id: xxxx,
      backdrop_path: '/xxxxxxx.jpg',
      genre_ids: [Array],
      vote_count: xxxxx,
      original_language: 'xx',
      original_title: 'xxxxx',
      poster_path: '/xxxxx.jpg',
      title: 'xxxx',
      video: false,
      vote_average: 8.2,
      adult: false,
      overview: 'xxxx',
      release_date: '2021-12-15',
      popularity: 6120.418,
      media_type: 'movie'
      },
      "}`<br />
      <br />
- Error Response:<br />
    - Code: 403<br />
      Content: `{"403 Forbidden"}`<br />
    
---

## Popular
Returns JSON data about the popular movies.

- URL<br />
  /login/:accessToken:query<br />
  <br />
- Method:<br />
  `POST`<br />
  <br />
- URL Params
  <br />Required:
  <br />`accessToken=[string]`
  <br />`query=[string]`
  <br />
  <br />
- Data Params
  <br />None<br />
  <br />
- Success Response:<br />
    - Code: 200<br />
      Content: `{"{
      page: x,
      results: [
      {
      id: xxxx,
      backdrop_path: '/xxxxxxx.jpg',
      genre_ids: [Array],
      vote_count: xxxxx,
      original_language: 'xx',
      original_title: 'xxxxx',
      poster_path: '/xxxxx.jpg',
      title: 'xxxx',
      video: false,
      vote_average: 8.2,
      adult: false,
      overview: 'xxxx',
      release_date: '2021-12-15',
      popularity: 6120.418,
      media_type: 'movie'
      },
      "}`<br />
      <br />
- Error Response:<br />
    - Code: 403<br />
      Content: `{"403 Forbidden"}`<br />

---

## Trending
Returns JSON data about the trending movies.

- URL<br />
  /login/:accessToken:query<br />
  <br />
- Method:<br />
  `POST`<br />
  <br />
- URL Params
  <br />Required:
  <br />`accessToken=[string]`
  <br />`query=[string]`
  <br />
  <br />
- Data Params
  <br />None<br />
  <br />
- Success Response:<br />
    - Code: 200<br />
      Content: `{"{
      page: x,
      results: [
      {
      id: xxxx,
      backdrop_path: '/xxxxxxx.jpg',
      genre_ids: [Array],
      vote_count: xxxxx,
      original_language: 'xx',
      original_title: 'xxxxx',
      poster_path: '/xxxxx.jpg',
      title: 'xxxx',
      video: false,
      vote_average: 8.2,
      adult: false,
      overview: 'xxxx',
      release_date: '2021-12-15',
      popularity: 6120.418,
      media_type: 'movie'
      },
      "}`<br />
      <br />
- Error Response:<br />
    - Code: 403<br />
      Content: `{"403 Forbidden"}`<br />

## Userlist
Returns JSON data about the User movies.

- URL<br />
  /userList/:accessToken:query<br />
  <br />
- Method:<br />
  `POST`<br />
  <br />
- URL Params
  <br />Required:
  <br />`accessToken=[string]`
  <br />`query=[string]`
  <br />
  <br />
- Data Params
  <br />None<br />
  <br />
- Success Response:<br />
    - Code: 200<br />
      Content: `{"{
      page: x,
      results: [
      {
      id: xxxx,
      backdrop_path: '/xxxxxxx.jpg',
      genre_ids: [Array],
      vote_count: xxxxx,
      original_language: 'xx',
      original_title: 'xxxxx',
      poster_path: '/xxxxx.jpg',
      title: 'xxxx',
      video: false,
      vote_average: 8.2,
      adult: false,
      overview: 'xxxx',
      release_date: '2021-12-15',
      popularity: 6120.418,
      media_type: 'movie'
      },
      "}`<br />
      <br />
- Error Response:<br />
    - Code: 403<br />
      Content: `{"403 Forbidden"}`<br />
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
