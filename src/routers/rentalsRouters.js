import { Router } from "express";
import { finishRental, getRentals, registerRental } from "../controllers/rentalsControllers.js";
import { validateRentals, validateReturn } from "../middlewares/rentalsMiddlewares.js";

const router = Router()


router.post("/rentals",validateRentals, registerRental)

router.get("/rentals", getRentals)

router.post("/rentals/:id/return", validateReturn, finishRental)

export default router