import { useState,createContext,useContext} from "react"

 const AuthContextObject = createContext()

function AuthProvider({children}){
 const [user, setUser] = useState("")


 return(
    <>
    <AuthContextObject.Provider value={{user,setUser}}>
        <div>
            {children}
        </div>
    </AuthContextObject.Provider>
    </>
 )
}
export default AuthProvider

export { AuthContextObject }