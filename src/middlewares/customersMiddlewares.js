import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
import { connection } from "../database/database.js"
import { customersSchema } from "../models/customersSchemas.js"

dayjs.extend(customParseFormat)

export async function validateCustomers(req,res,next){
    const{name, phone, cpf, birthday}= req.body

    const verifyDate = dayjs(birthday, "DD-MM-YYYY", true).isValid()

    const verifyCpf = isNaN(cpf) || isNaN(phone)

    if(!verifyDate || verifyCpf){
        return res.sendStatus(400)
    }

    const {error} = customersSchema.validate(req.body,{ abortEarly: false })

    if(error){
        return res.send(error.message)
    }

    try{
        const cpfExist = await connection.query("SELECT * FROM customers WHERE cpf=$1", [cpf])
        console.log(cpfExist.rows)
        if(cpfExist?.rows[0]?.cpf){
            return res.sendStatus(409)
        }
    } catch(error){
        console.log(error)
    }

    req.customer = req.body

    next()
}
