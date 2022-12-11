import { connection } from "../database/database.js"



export async function registerCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.customer


    try {
        await connection.query("INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
            [name, phone, cpf, birthday])

        res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }

}


export async function getCustomers(req, res) {
    const search = req.query.cpf

    try {
        if (search) {
            const listCustomers = await connection.query("SELECT * FROM customers WHERE cpf LIKE ($1)", [`${search}%`])
            res.send(listCustomers.rows)
        } else {
            const listCustomers = await connection.query("SELECT * FROM customers")
            res.send(listCustomers.rows)
        }

    } catch (error) {
        console.log(error)
    }

}

export async function getCustomersById(req,res){
    const customerId = req.params.id

    console.log(customerId)

    try{
        const customer = await connection.query("SELECT * FROM customers WHERE id=$1", [customerId])
        if(customer.rows[0]){
            res.send(customer.rows[0])
        } else{
            res.sendStatus(404)
        }    
    }catch(error){
        console.log(error)
    }

    
}

