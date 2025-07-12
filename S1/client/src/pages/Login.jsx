import { useState,useContext } from "react"
import { AuthContextObject } from "../context/AuthContext"
import {useNavigate} from "react-router-dom"
function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {user, setUser} = useContext(AuthContextObject)
    const navigate = useNavigate()
    function handleSubmit(e){
        e.preventDefault()
        if(email === "test@example.com" && password ==="12345"){
            setUser({email})
            navigate("/mybooks")
        } else{
            alert("Invalid credentials!")
        }
    }
    return(
        <div>
           <form onSubmit={handleSubmit}>
           <p>Context User: {JSON.stringify(user)}</p>
             <input type="email" placeholder="Email" value={email} onChange={(e)=> {setEmail(e.target.value)}} required/>
             <input type="password" placeholder="Password" value={password} onChange={(e)=> {setPassword(e.target.value)}} required/>
             <button type="submit">Submit</button>
           </form>
        </div>
    )
}

export default Login