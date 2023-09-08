import { TCard } from "../types";

const baseUrl: string = "http://localhost:5000/decks";

const getAll = async (deckId: string): Promise<TCard[]> => {
  const response = await fetch(`${baseUrl}/${deckId}/cards`);
  return response.json();
};

const create = async (text: string, deckId: string): Promise<TCard> => {
  const response = await fetch(`${baseUrl}/${deckId}/cards`, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const deleteCard = async (cardId: string, deckId: string): Promise<TCard> => {
  const response = await fetch(`${baseUrl}/${deckId}/cards/${cardId}`, {
    method: "DELETE",
  });
  return response.json();
};

export default { getAll, create, deleteCard };
