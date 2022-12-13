import { Router } from "express";
import { deleteRental, finishRental, getRentals, registerRental } from "../controllers/rentalsControllers.js";
import { validateDelete, validateRentals, validateReturn } from "../middlewares/rentalsMiddlewares.js";

const router = Router()

router.post("/rentals",validateRentals, registerRental)

router.get("/rentals", getRentals)

router.post("/rentals/:id/return", validateReturn, finishRental)

router.delete("/rentals/:id", validateDelete, deleteRental)

export default router