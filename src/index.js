import express from "express"
import categoriesRouters from "./routers/categoriesRouters.js"
import gamesRouters from "./routers/gamesRouters.js"
import customersRouters from "./routers/customersRouters.js"

const app = express()

app.use(express.json())



app.use(categoriesRouters)
app.use(gamesRouters)
app.use(customersRouters)

app.listen(4001, () => {console.log("Server Running")})