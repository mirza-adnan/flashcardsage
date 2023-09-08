import express, { Request, Response, json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {
  getAllDecks,
  getDeck,
  createDeck,
  deleteDeck,
} from "./controllers/decks.controller";
import decksRouter from "./routes/decks.router";
import cardsRouter from "./routes/cards.router";
dotenv.config();

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

// MONGO
const MONGO_URI = process.env.MONGO_URI;

if (MONGO_URI)
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("connected to mongoose");
    })
    .catch((err: Error) => console.log(err.message));

// ROUTES
app.use("/decks", decksRouter);
app.use("/decks", cardsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
