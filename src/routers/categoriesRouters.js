import { Router } from "express";
import { getCategories, registerCategory } from "../controllers/categoriesControllers.js";
import {connection} from "../database/database.js"
import { validateCategory } from "../middlewares/categoriesMiddlewares.js";

const router = Router()



router.get("/categories", getCategories)


router.post("/categories", validateCategory, registerCategory)

export default router

