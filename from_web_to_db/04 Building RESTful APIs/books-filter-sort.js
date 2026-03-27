// Query Params vs Route Params:
// Query Params are optional and used for filtering/sorting → req.query (e.g. /api/books?year=2008)
// Route Params are part of the resource path → req.params (e.g. /users/123)

// Example: Express API demonstrating filtering and sorting using query parameters

import express from "express";

const app = express();

let books = [
  { id: 1, title: "Harry Potter", author: "Rowling", year: 2001 },
  { id: 2, title: "The Hobbit", author: "Tolkien", year: 1937 },
  { id: 3, title: "Clean Code", author: "Martin", year: 2008 },
  { id: 4, title: "Harry Potter 2", author: "Rowling", year: 2003 },
];

app.get("/api/books", (req, res) => {
  let result = [...books];

  const { author, year, sortBy } = req.query;

  if (author) {
    result = result.filter((book) => book.author === author);
  }

  if (year) {
    result = result.filter((book) => book.year === Number(year));
  }

  if (sortBy === "title") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortBy === "year") {
    result.sort((a, b) => a.year - b.year);
  }

  res.status(200).json({ books: result });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Example frontend requests:
// GET http://localhost:3000/api/books
// GET http://localhost:3000/api/books?year=2008
// GET http://localhost:3000/api/books?sortBy=title
// GET http://localhost:3000/api/books?author=Rowling&sortBy=title
