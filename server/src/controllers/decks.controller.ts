import { Request, Response } from "express";
import Deck from "../models/Deck";
import Card from "../models/Card";

export const getAllDecks = async (req: Request, res: Response) => {
  const decks = await Deck.find();

  res.json(decks);
};

export const getDeck = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  try {
    const targetDeck = await Deck.findById(deckId);
    res.json(targetDeck);
  } catch {
    console.log("error retrieving specific deck");
  }
};

export const createDeck = async (req: Request, res: Response) => {
  console.log(req.body);
  const newDeck = new Deck({
    title: req.body.title.trim(),
  });

  const createdDeck = await newDeck.save();
  res.json(createdDeck);
};

export const deleteDeck = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  await Card.deleteMany({ deck: deckId });
  const deletedDeck = await Deck.findByIdAndRemove(deckId);
  res.json(deletedDeck);
};
