"use client"; // This directive makes the component a Client Component

import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/books`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("An error occurred while fetching the books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBooks();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-7xl mx-auto mb-10">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
