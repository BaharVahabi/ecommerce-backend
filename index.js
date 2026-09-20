import express from "express"
import { userRouter } from "./routes/users/index.js"
const app = express()
const port =3000
app.use(express.json())

app.use("/users", userRouter)
app.listen(port,()=>{console.log("app started")})