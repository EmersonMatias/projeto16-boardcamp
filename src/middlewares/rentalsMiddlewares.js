import { connection } from "../database/database.js"

export async function validateRentals(req,res,next){
    const {customerId, gameId, daysRented} = req.body
    let gameExist;
    const validateData = !customerId  || !gameId  || !daysRented  || daysRented <= 0 || isNaN(daysRented) || isNaN(customerId) || isNaN(gameId)

    if(validateData){
        return res.sendStatus(400)
    }

    try{
        const customerExist = await connection.query("SELECT * FROM customers WHERE id=$1",[customerId])
        gameExist = await connection.query("SELECT * FROM games WHERE id=$1",[gameId])

        if(!customerExist.rows[0] || !gameExist.rows[0]){
            return res.sendStatus(400)
        }

        if(gameExist){
            const isAvailable = (await connection.query('SELECT * FROM rentals WHERE rentals."gameId"=$1',[gameId])).rows
            let count = 0;

            isAvailable.map((rental) => {
               if( rental.returnDate === null){
                count+=1
               }
            })

            if(gameExist.rows[0].stockTotal === count){
                return res.sendStatus(400)
            }
        }
    } catch(error){
        console.log(error)
    }

    req.game = gameExist.rows[0]

   next()
}

export async function validateReturn(req,res,next){
    const rentalId = req.params.id
    let rentalExist

    if(!rentalId){
        return res.sendStatus(400)
    }

    try{
        rentalExist = await (await connection.query("SELECT * FROM rentals WHERE id=$1",[rentalId])).rows[0]

        if(!rentalExist){
            return res.sendStatus(400)
        }

        if(rentalExist.returnDate !== null){
            return res.sendStatus(400)
        }
    } catch(error){
        console.log(error)
    }

    req.rental = rentalExist

    next()
}

export async function validateDelete(req,res,next){
    const rentalId = req.params.id
 

    if(isNaN(rentalId)){
        return res.sendStatus(400)
    }

    try{
        const rental = (await connection.query("SELECT * FROM rentals WHERE id=$1", [rentalId])).rows[0]
        
        if(!rental){
            return res.sendStatus(404)
        }
        
        if(!rental.returnDate){
            return res.sendStatus(400)
        }

    } catch(error){
        console.log(error)
    }

    next()
}