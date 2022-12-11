
import { connection } from "../database/database.js"

export async function registerCategory(req, res) {
    const categoryName = req.categoryName

    try {
        await connection.query("INSERT INTO categories (name) VALUES ($1)",
        [categoryName])

        res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }
}

export async function getCategories(req,res){

        const listCategories = (await connection.query("SELECT * FROM categories")).rows
    
        res.send(listCategories)
   
}