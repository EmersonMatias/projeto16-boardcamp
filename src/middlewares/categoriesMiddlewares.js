import {connection} from "../database/database.js"

export async function validateCategory(req,res,next){
    const categoryName = req.body.name

    if (!categoryName){
        return res.status(400).send("Campo Vazio")
    }

    try{
        const categoryExist = await connection.query("SELECT * FROM categories WHERE name = $1",
        [categoryName])

        if(categoryExist.rows[0]?.name){
            return res.status(409).send("Categoria já existe.")
        }

    } catch(error){
        console.log(error)
    }
  

    req.categoryName = categoryName
    next()

}