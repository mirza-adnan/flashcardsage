import { Request, Response } from "express";
import Card from "../models/Card";

export const getAllCards = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const cards = await Card.find({ deck: deckId }).populate("deck");

  res.json(cards);
};

export const createCard = async (req: Request, res: Response) => {
  const deck = req.params.deckId;
  const newCard = new Card({
    text: req.body.text.trim(),
    deck,
  });

  const createdCard = await newCard.save();
  res.json(createdCard);
};

export const deleteCard = async (req: Request, res: Response) => {
  const cardId = req.params.cardId;
  const deletedCard = await Card.findByIdAndRemove(cardId);
  res.json(deletedCard);
};
