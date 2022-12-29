# Just A Forum

CVWO Web Application Assignment: a simple forum website

Frontend: React.js
Backend: Ruby on Rails
Database: PostgreSQL

---

## Basic Features (Requirements)

- [x] Implement a simple authentication system where users are authenticated solely by their user name (a system that is similar to when2meet.com).

- [x] Implement the ability to perform basic CRUD operations for forum threads and comments.

- [x] Implement a category/tagging system to categorise threads so that they are easier to search for.

- [x] Set up a backend

---

## Additional Features (Try my best to do)

- [x] Use TypeScript

- [x] Implement Account-Based Authentication

- [ ] Implement sorting system for comments

- [ ] Implement likes/dislikes

---

### Web Application Structure

```
root
└──>Navbar component
│   └>  Logo
│   └>  App name
│   └>  Login button
│
└──>Sidebar component
│   └>  User status (login status)
│   └>  Displays categories of posts
│
└──>Main body component
    │
    └──>Login component
    │   └>  Forum for logging in, mutually exclusive with content component
    │
    └──>Content component
        └>  This component will be initialised with post components
        └──>Post component
        │   └>  Displays title
        │   └>  Displays body
        │   └>  Displays edited status (if creation time != updated time)
        │   └>  Displays date of posting
        │   └>  Displays comments (initially set display to none, until user clicks on a post to view more. Async func to fetch data of comments)
        │
        └──>Comment component
           └>  Displays body
           └>  Displays edited status (if creation time != updated time)
           └>  Displays date of posting
```
