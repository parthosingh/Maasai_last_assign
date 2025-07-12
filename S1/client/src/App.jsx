import{Routes,Route} from "react-router-dom"
import './App.css'
import Navbar from './components/Navbar'
import Home from "./pages/Home"
import Login from "./pages/Login"
import MyBooks from "./pages/MyBooks"
import Register from "./pages/Register"
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/mybooks" element={<MyBooks />} />
      </Routes>
    </>
  )
}

export default App
