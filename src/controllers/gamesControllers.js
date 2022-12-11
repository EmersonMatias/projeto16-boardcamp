import { connection } from "../database/database.js"

export async function registerGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.game

    try {
        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
        [name, image, Number(stockTotal), Number(categoryId), Number(pricePerDay)])

        res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }
} 

export async function getGames(req,res){
    const search = req.query.name

    try{

    if(search){
        const listGames = await connection.query(`SELECT games.*, categories.name as "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id WHERE LOWER(games.name) LIKE LOWER(($1))`,
        [`${search}%`])
        return res.send(listGames.rows)
     } else{
        const listGames = await connection.query('SELECT games.*, categories.name as "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id')
        return res.send(listGames.rows)
     }
      
    } catch(error){
        console.log(error)
    }
 
}