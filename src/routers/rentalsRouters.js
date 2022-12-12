import { Router } from "express";
import { getRentals, registerRental } from "../controllers/rentalsControllers.js";
import { validateRentals } from "../middlewares/rentalsMiddlewares.js";

const router = Router()


router.post("/rentals",validateRentals, registerRental)

router.get("/rentals", getRentals)

export default router