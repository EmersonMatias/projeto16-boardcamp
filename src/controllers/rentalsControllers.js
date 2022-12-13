import dayjs from "dayjs"
import { connection } from "../database/database.js"
import customParseFormat from "dayjs/plugin/customParseFormat.js"

dayjs.extend(customParseFormat)


export async function registerRental(req, res) {
    const { customerId, gameId, daysRented } = req.body
    const date = dayjs()
    const originalPrice = req.game.pricePerDay * daysRented
    console.log(originalPrice)
   

    try {
        await connection.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)',
            [customerId, gameId, date, daysRented, null, originalPrice, null])

        res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }
}


export async function getRentals(req, res) {
    const customerId = req.query.customerId
    const gameId = req.query.gameId


    try {

        if (customerId) {
            const listRentals = await connection.query(`
            SELECT rentals.*, customers.name AS "customerName",  games.name AS "gameName",games."categoryId" AS "categoryGameId", categories.name AS "categoryGameName"
                FROM rentals 
                JOIN customers ON rentals."customerId"=customers.id 
                JOIN games ON rentals."gameId"=games.id 
                JOIN categories ON games."categoryId"=categories.id
                WHERE rentals."customerId"=$1`,
                [customerId]
            )

            res.send(listRentals.rows)
        } else if (gameId) {
            const listRentals = await connection.query(`
            SELECT rentals.*, customers.name AS "customerName",  games.name AS "gameName",games."categoryId" AS "categoryGameId", categories.name AS "categoryGameName"
                FROM rentals 
                JOIN customers ON rentals."customerId"=customers.id 
                JOIN games ON rentals."gameId"=games.id 
                JOIN categories ON games."categoryId"=categories.id
                WHERE rentals."gameId"=$1`,
                [gameId]
            )

            res.send(listRentals.rows)
        }
        else {
            const listRentals = await connection.query(`
            SELECT rentals.*, customers.name AS "customerName",  games.name AS "gameName",games."categoryId" AS "categoryGameId", categories.name AS "categoryGameName"
                FROM rentals 
                JOIN customers ON rentals."customerId"=customers.id 
                JOIN games ON rentals."gameId"=games.id 
                JOIN categories ON games."categoryId"=categories.id`
            )

            return res.send(listRentals.rows)
        }

    } catch (error) {
        console.log(error)
    }
}

export async function finishRental(req,res){
    const rentalId = req.params.id
    const rental = req.rental
    const now = dayjs()
    let fee = 0;
    const borrowedDays = now.diff(rental.rentDate, 'days')

    if(borrowedDays > rental.daysRented){
        fee = (borrowedDays- rental.daysRented)*(rental.originalPrice/rental.daysRented)
    }

    try{
        await connection.query('UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3',[now, fee, rentalId])
        res.sendStatus(200)
    } catch(error){
        console.log(error)
    }

 
    console.log(fee)
   console.log( borrowedDays-rental.daysRented)
    
}


export async function deleteRental(req,res){
    const rentalId = req.params.id

    try{
        await connection.query("DELETE FROM rentals WHERE id=$1",[rentalId])
        res.sendStatus(200)
    } catch(error){
        console.log(error)
    }
}