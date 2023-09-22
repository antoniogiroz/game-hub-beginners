import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Game {
  id: string;
  name: string;
  background_image: string;
}

interface GamesResponse {
  count: number;
  results: Game[];
}

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<GamesResponse>("/games", { signal: controller.signal })
      .then((response) => setGames(response.data.results))
      .catch((error) => {
        if (error instanceof CanceledError) return;

        setError(error.message);
      });

    return () => controller.abort();
  }, []);

  return { games, error };
}