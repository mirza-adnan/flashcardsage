import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { TCard } from "../types";
import cardService from "../services/cards";

function Deck() {
  const { deckId } = useParams() || "there";
  const [text, setText] = useState<string>("");
  const [cards, setCards] = useState<TCard[]>([]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleCardSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await cardService.create(text, deckId as string);
      setText("");
      setCards(cards.concat(data));
    } catch {
      console.log("Error creating deck");
    }
  };

  const handleDeleteCard = (cardId: string) => {
    return async () => {
      try {
        await cardService.deleteCard(cardId, deckId as string);
        setCards(cards.filter((card) => card._id !== cardId));
      } catch {
        console.log("Error deleting deck");
      }
    };
  };

  const fetchCards = async () => {
    setCards(await cardService.getAll(deckId as string));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div>
      <form
        onSubmit={handleCardSubmit}
        className="deck-form"
      >
        <label htmlFor="title-input">Text:</label>
        <input
          type="text"
          name="title"
          id="title-input"
          onChange={handleTextChange}
          value={text}
        />
        <button>Create Card</button>
      </form>
      <ul className="decks">
        {cards.map((card) => (
          <li
            key={card._id}
            className="deck"
          >
            <button
              className="close-btn"
              onClick={handleDeleteCard(card._id)}
            >
              +
            </button>
            <Link to={`/decks/${card._id}`}>{card.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Deck;
