import React, { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { TDeck } from "./types";
import deckService from "./services/decks";

function App() {
  const [title, setTitle] = useState<string>("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // const handleLinkBubbling = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   console.log(e.target.tagName !== e.currentTarget.tagName);
  //   if (e.target.tagName !== e.currentTarget.tagName) return false;
  //   return true;
  // };

  const handleDeckSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await deckService.create(title);
      setTitle("");
      setDecks(decks.concat(data));
    } catch {
      console.log("Error creating deck");
    }
  };

  const handleDeleteDeck = (id: string) => {
    return async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation(); // Prevent the click event from propagating to the Link
      try {
        await deckService.deleteDeck(id);
        setDecks(decks.filter((deck) => deck._id !== id));
      } catch {
        console.log("Error deleting deck");
      }
      e.stopPropagation();
    };
  };

  const fetchDecks = async () => {
    setDecks(await deckService.getAll());
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  return (
    <div>
      <form
        onSubmit={handleDeckSubmit}
        className="deck-form"
      >
        <label htmlFor="title-input">Title:</label>
        <input
          type="text"
          name="title"
          id="title-input"
          onChange={handleTitleChange}
          value={title}
        />
        <button>Create Deck</button>
      </form>
      <ul className="decks">
        {decks.map((deck) => (
          <li
            key={deck._id}
            className="deck"
          >
            <button
              className="close-btn"
              onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
            >
              +
            </button>
            <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
