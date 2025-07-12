import { Link} from "react-router-dom"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContextObject } from "../context/AuthContext"
function Navbar(){
     const {user, setUser} = useContext(AuthContextObject)
     const navigate = useNavigate()
     function handleLogout(){
        setUser(null)
        navigate("/")
     }
    return(
        <div>
            <h2>My Library</h2>
             <Link to="/">Home</Link>
            
             {
                user ? (
                    <>
                     <Link to="/mybooks">My Books</Link>
                    <button onClick={handleLogout}>Logout</button>
                     <span>{user.email}</span>
                    </>
                ) : (
                    <>
                       <Link to="/login">Login</Link>
                       <Link to="/register">Register</Link>
                    </>
                )
             }   
            
        </div>
    )
}

export default Navbar