import { Router } from "express";
import { getCustomers, getCustomersById, registerCustomer } from "../controllers/customersControllers.js";
import { validateCustomers } from "../middlewares/customersMiddlewares.js";

const router = Router()


router.post("/customers", validateCustomers, registerCustomer)

router.get("/customers", getCustomers)

router.get("/customers/:id", getCustomersById)



export default router