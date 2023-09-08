import { Router } from "express";
import {
  getAllDecks,
  getDeck,
  createDeck,
  deleteDeck,
} from "../controllers/decks.controller";

const decksRouter = Router();

decksRouter.get("/", getAllDecks);

decksRouter.get("/:deckId", getDeck);

decksRouter.post("/", createDeck);

decksRouter.delete("/:deckId", deleteDeck);

export default decksRouter;
