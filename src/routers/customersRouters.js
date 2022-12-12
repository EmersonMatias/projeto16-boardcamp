import { Router } from "express";
import { getCustomers, getCustomersById, registerCustomer, updateCustomer } from "../controllers/customersControllers.js";
import { validateCustomers, validateId } from "../middlewares/customersMiddlewares.js";

const router = Router()


router.post("/customers", validateCustomers, registerCustomer)

router.get("/customers", getCustomers)

router.get("/customers/:id", getCustomersById)

router.put("/customers/:id",validateId,validateCustomers, updateCustomer)



export default router