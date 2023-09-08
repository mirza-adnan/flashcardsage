import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  text: {
    type: String,
    minLength: 1,
    required: true,
  },
  deck: {
    type: mongoose.Schema.ObjectId,
    ref: "Deck",
    required: true,
  },
});

export default mongoose.model("Card", cardSchema);
