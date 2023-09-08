import { Router } from "express";
import {
  getAllCards,
  createCard,
  deleteCard,
} from "../controllers/card.controller";

const cardsRouter = Router();

cardsRouter.get("/:deckId/cards", getAllCards);

cardsRouter.post("/:deckId/cards", createCard);

cardsRouter.delete("/:deckId/cards/:cardId", deleteCard);

export default cardsRouter;
