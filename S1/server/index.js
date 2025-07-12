const express = require("express")
const {connectDB} = require("./dbConfig.js")
const {userRouter} = require("./routes/user.routes.js")
const cors = require("cors")
const app = express()
app.use(express.json())

app.use(cors())
app.use("/users",userRouter)
app.listen(8080, ()=> {
    connectDB()
    console.log("Server is running at http://localhost:8080")
})