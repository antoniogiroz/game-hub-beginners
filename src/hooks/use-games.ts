import { useData } from "./use-data";
import { Genre } from "./use-genres";
import { Platform } from "./use-platforms";

export interface Game {
  id: string;
  name: string;
  background_image: string;
  parent_platforms: [{ platform: Platform }];
  metacritic: number;
  rating_top: number;
}

export interface GameFilter {
  searchText?: string;
  genre?: Genre;
  platform?: Platform;
  sortOrder?: string;
}

export function useGames(filter: GameFilter = {}) {
  return useData<Game>(
    "/games",
    {
      params: {
        genres: filter.genre?.id,
        platforms: filter.platform?.id,
        ordering: filter.sortOrder,
        search: filter.searchText,
      },
    },
    [filter]
  );
}
