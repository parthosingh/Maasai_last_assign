import { useContext, useState } from "react"
import { AuthContextObject } from "../context/AuthContext"
import {useNavigate} from "react-router-dom"

function Register(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const {user, setUser} = useContext(AuthContextObject)
    const navigate = useNavigate();
    function handleSubmit(e){
        e.preventDefault()
        if(password === confirmPassword){
            alert("Successful")
            setUser({email})
            navigate("/mybooks")
        } else{
            alert("not successful")
        }
    }
    return(
        <div>
           <form onSubmit={handleSubmit}>
           <p>Context User: {JSON.stringify(user)}</p>
             <input type="email" placeholder="Email" value={email} onChange={(e)=> {setEmail(e.target.value)}} required/>
             <input type="password" placeholder="Password" value={password} onChange={(e)=> {setPassword(e.target.value)}} required/>
              <input type="ConfirmPassword" placeholder="ConfirmPassword" value={confirmPassword} onChange={(e)=> {setConfirmPassword(e.target.value)}} required/>
             <button type="submit">Submit</button>
           </form>
        </div>
    )
}

export default Register