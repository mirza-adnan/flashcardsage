import { TDeck } from "../types";

const baseUrl: string = "http://localhost:5000";

const getAll = async (): Promise<TDeck[]> => {
  const response = await fetch(`${baseUrl}/decks`);
  return response.json();
};

const create = async (title: string): Promise<TDeck> => {
  const response = await fetch(`${baseUrl}/decks`, {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const deleteDeck = async (id: string): Promise<TDeck> => {
  const response = await fetch(`${baseUrl}/decks/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export default { getAll, create, deleteDeck };
