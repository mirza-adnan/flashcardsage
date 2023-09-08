import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
  title: {
    type: String,
    minLenght: 1,
    required: true,
  },
});

export default mongoose.model("Deck", deckSchema);
