import express from "express"
import { userRouter } from "./routes/users/index.js"
import { categoryRouter } from "./routes/categories/index.js"
import { authRouter } from "./routes/auth/index.js"
import { productRouter } from "./routes/products/index.js"
import { favoriteRouter } from "./routes/favorites/index.js"
const app = express()
const port =3000
app.use(express.json())

app.use("/files",express.static("uploads"))

app.use("/users", userRouter)
app.use("/auth", authRouter)
app.use("/categories", categoryRouter)
app.use("/products", productRouter)
app.use("/favorites", favoriteRouter)
app.listen(port,()=>{console.log("app started")})