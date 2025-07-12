import { useState, useContext } from "react";
import { AuthContextObject } from "../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContextObject);
  const [mybooks, setMybooks] = useState([]);

  const books = [
    {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      coverImage: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt",
      coverImage: "https://via.placeholder.com/150",
    },
  ];

  function addToMyBooks(book) {
    if (user) {
      const alreadyAdded = mybooks.some((b) => b.id === book.id);
      if (alreadyAdded) {
        alert("Book already in My Books");
        return;
      }
      setMybooks([...mybooks, book]);
      alert(`${book.title} added to My Books`);
    } else {
      alert("Please login first");
    }
  }

  return (
    <div>
      <h1>Home Page</h1>

      {books.map((book) => (
        <div key={book.id}>
          <img src={book.coverImage} alt={book.title} width={150} />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <button onClick={() => addToMyBooks(book)}>Want to Read</button>
        </div>
      ))}

      <h2>My Books</h2>
      <ul>
        {mybooks.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
