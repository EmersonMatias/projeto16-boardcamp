import { connection } from "../database/database.js"

export async function validateGame(req, res, next) {
    const { name, image, stockTotal,categoryId, pricePerDay } = req.body

    if (!name || !categoryId || !image || !stockTotal || !pricePerDay) {
        return res.status(400).send("Campos vazios")
    }
 
    if (stockTotal <= 0 || pricePerDay <= 0) {
        return res.status(400).send("Preço e estoque devem ser maiores que zero")
    }
 
    try {
        const categoryExist = (await connection.query("SELECT * FROM categories WHERE id=($1)",
        [categoryId])).rows[0]?.id

        if(!categoryExist){
            return res.status(400).send("Categoria não existe")
        }

        const gameExist = (await connection.query("SELECT (name) FROM games WHERE name=($1)", [name])).rows[0]
        
        if(gameExist){
            return res.status(409).send("Jogo já cadastrado")
        }
          
    } catch (error) {
        console.log(error)
    }
  
    req.game = req.body

    next()

}