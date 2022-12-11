import { Router } from "express";
import { getGames, registerGame } from "../controllers/gamesControllers.js";
import { validateGame } from "../middlewares/gamesMiddlewares.js";

const router = Router();


router.post("/games", validateGame, registerGame)
router.get("/games", getGames)


export default router