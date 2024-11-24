import React, { useState } from "react";
import axios from "axios";

const CleanerView = () => {
  const [content, setContent] = useState("Welcome! Click a button to see content here.");
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const [error, setError] = useState(false);

  const [cleaner, setCleaner] = useState({
    id: "",
    bankAccount: "",
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const cleaner = 1; //change later
      await axios.put(`http://localhost:8800/cleanerView68`, cleaner);
      setContent("Cleaner updated successfully!");
    } catch (err) {
      console.error(err);
      setError(true);
      setContent("Something went wrong while updating the cleaner.");
    }
  };

  const handleCheckJobBoard = () => {
    setContent("This is the Job Board. Here you can see available jobs.");
  };

  const handleOrderHistory = () => {
    setContent("Here is your order history. No orders yet!");
  };

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    try {
      const bookId = 1; // 替换为动态获取的 Book ID
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      setContent("Book updated successfully!");
    } catch (err) {
      console.error(err);
      setError(true);
      setContent("Something went wrong while updating the book.");
    }
  };

  const handleShowCleaner = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:8800/cleanerView68`);
      setCleaner(res.data[0]);
      setContent(
        <div>
          <h3>Cleaner Info</h3>
          <p>ID: {cleaner.idcleaner}</p>
          <p>Bank Account: {cleaner["Bank Account #"]}</p>
        </div>
      );
    } catch (err) {
      console.error(err);
      setError(true);
      setContent("Something went wrong while fetching the cleaner.");
    }
  }

  return (
    <div className="dashboard">
      <header className="header">
        <h2>Hello, Cleaner</h2>
        <nav className="navigation">
          <button className="nav-button" onClick={handleUpdateProfile}>
            Update Profile
          </button>
          <button className="nav-button" onClick={handleCheckJobBoard}>
            Check Job Board
          </button>
          <button className="nav-button" onClick={handleOrderHistory}>
            Order History
          </button>
            <button className="nav-button" onClick={handleShowCleaner}>
            Show Cleaner
            </button>
          <button
            className="nav-button"
            onClick={() =>
              setContent(
                <div className="form">
                  <h1>Update the Book</h1>
                  <input
                    type="text"
                    placeholder="Book title"
                    name="title"
                    onChange={handleChange}
                  />
                  <textarea
                    rows={5}
                    type="text"
                    placeholder="Book desc"
                    name="desc"
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    placeholder="Book price"
                    name="price"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Book cover"
                    name="cover"
                    onChange={handleChange}
                  />
                  <button onClick={handleUpdateBook}>Update</button>
                  {error && <p style={{ color: "red" }}>Something went wrong!</p>}
                </div>
              )
            }
          >
            Update Book
          </button>
        </nav>
      </header>
      <main className="content">
        {typeof content === "string" ? <p>{content}</p> : content}
      </main>
    </div>
  );
};

export default CleanerView;
