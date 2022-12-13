import { connection } from "../database/database.js"

export async function validateGame(req, res, next) {
    const { name, image, stockTotal,categoryId, pricePerDay } = req.body

    if (!name || !categoryId || !image || !stockTotal || !pricePerDay) {
        return res.sendStatus(400)
    }
 
    if (stockTotal <= 0 || pricePerDay <= 0) {
        return res.sendStatus(400)
    }
 
    try {
        const categoryExist = (await connection.query("SELECT * FROM categories WHERE id=($1)",
        [categoryId])).rows[0]?.id

        if(!categoryExist){
            return res.sendStatus(400)
        }

        const gameExist = (await connection.query("SELECT (name) FROM games WHERE name=($1)", [name])).rows[0]
        
        if(gameExist){
            return res.sendStatus(409)
        }
          
    } catch (error) {
        console.log(error)
    }
  
    req.game = req.body

    next()

}