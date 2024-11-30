import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Login from './login';

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ name: '', picture: '' });
  const [editingBookId, setEditingBookId] = useState(null);
  const [updatedBook, setUpdatedBook] = useState({ name: '', picture: '' });

  useEffect(() => {
    fetchBooks();
  }, []);

  // GET Request to fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/books');
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // POST Request to add a new book
  const addBook = async () => {
    try {
      await axios.post('http://localhost:8080/books', newBook);
      setNewBook({ name: '', picture: '' });
      fetchBooks();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // PUT Request to update a book by ID
  const updateBook = async (id) => {
    try {
      await axios.put(`http://localhost:8080/books/${id}`, updatedBook);
      setEditingBookId(null);
      setUpdatedBook({ name: '', picture: '' });
      fetchBooks();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // DELETE Request to delete a book by ID
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  const [pop,setPop] = useState(false);
  const popUpLogin = ()=>{
      setPop(!pop)
  }
  // Enter edit mode and populate input fields with current values
  const handleEdit = (book) => {
    setEditingBookId(book.id);
    setUpdatedBook({ name: book.name, picture: book.picture });
  };

  // Render each book card
  const renderBookCard = (book) => {
    const isEditing = editingBookId === book.id;

    return (
      <div className='book-card' key={book.id}>
        <div className='book-content'>
          {isEditing ? (
            <>
              <input
                type="text"
                value={updatedBook.name}
                onChange={(e) => setUpdatedBook({ ...updatedBook, name: e.target.value })}
              />
              <input
                type="text"
                value={updatedBook.picture}
                onChange={(e) => setUpdatedBook({ ...updatedBook, picture: e.target.value })}
              />
            </>
          ) : (
            <>
              <img src={book.picture} alt={book.name} />
              <p>{book.name}</p>
            </>
          )}
        </div>
        <div className='book-actions'>
          {isEditing ? (
            <button onClick={() => updateBook(book.id)}>Done</button>
          ) : (
            <button onClick={() => handleEdit(book)}>Edit</button>
          )}
          <button onClick={() => deleteBook(book.id)}>Delete</button>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      {
        pop?<Login popupbtn={popUpLogin} />:<div></div>
      }
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <img src="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg" alt="Welcome to Book Store" className="welcome-image" />
        <div className="welcome-text">
          <h2>Welcome to Book Store</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
          <button className="welcome-button" onClick={popUpLogin}>Login</button>
        </div>
      </div>

      {/* Content Section with Add Book Form and Book Grid */}
      <div className="content-section">
        {/* Add New Book Form */}
        <div className="add-book-form">
          <h2>Add New Book</h2>
          <input
            type="text"
            placeholder="Name"
            value={newBook.name}
            onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image Link"
            value={newBook.picture}
            onChange={(e) => setNewBook({ ...newBook, picture: e.target.value })}
          />
          <button onClick={addBook}>Add Book</button>
        </div>

        {/* Display Book List in Grid */}
        <div className="book-grid">
          {books.map(renderBookCard)}
        </div>
      </div>


     <div className='contact-form'>
       <h1>Form section</h1>
     </div>

      <div class="footer-container">
        <p>&copy; 2024 Book Zone. All Rights Reserved.</p>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>

    </div>
  );
}

export default App;
