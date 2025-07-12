import { useState } from "react"
function MyBooks(){
    const [books, setBooks] = useState([
     {
      id: 1,
      title: "Clean Code",
      author: "Robert C. Martin",
      status: "Want to Read",
      rating: 0,
      },

     {
       id: 2,
       title: "The Pragmatic Programmer",
       author: "Andrew Hunt",
       status: "Read",
       rating: 4,
     },  
    ])

    function handleChange(id,newStatus){ 
        let newTask = books.map((book)=> {
            return book.id === id ? {...book, status:newStatus} :book
        })
        setBooks(newTask)
    }
    
    function handleRating(id,newRating){
        console.log("Dropdown changed for ID:", id, "New Rating:",newRating); 
        let newRate = books.map((book)=> {
            return book.id === id ? {...book, rating:Number(newRating)} :book
        })
        setBooks(newRate)
    }

    return(
        <div>
            <h1>MyBooks Page</h1>
            {
                books.map((book)=> {
                    return <li key={book.id}>{`ID : ${book.id} Title:${book.title} Author:${book.author} Status:${book.status} Rating:${book.rating}`} 
                       <label>Status:</label>
                     <select value={book.status} onChange={(e)=>{handleChange(book.id, e.target.value)}}>
                        <option value="Want to Read">Want to Read</option>
                        <option value="Currently Reading">Currently Reading</option>
                        <option value="Read">Read</option>
                     </select>
                     <label>Rating:</label>
                     <select value={book.rating} onChange={(e)=>{handleRating(book.id, e.target.value)}}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                     </select>
                    </li>
                
                })
            }
        </div>
    )
}

export default MyBooks