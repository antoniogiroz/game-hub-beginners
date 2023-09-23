import {
  Button,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import { Genre, useGenres } from "../hooks/use-genres";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  selectedGenre?: Genre;
  onSelect?: (genre: Genre) => void;
}

export function GenreList({ selectedGenre, onSelect }: Props) {
  const { data, isLoading, error } = useGenres();

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <List>
      {isLoading && <li>Loading...</li>}

      {data.map((genre) => (
        <ListItem key={genre.id} paddingY="5px">
          <HStack>
            <Image
              boxSize="32px"
              borderRadius={8}
              src={getCroppedImageUrl(genre.image_background)}
            />
            <Button
              fontWeight={selectedGenre?.id === genre.id ? "bold" : "normal"}
              fontSize="lg"
              variant="link"
              onClick={() => onSelect && onSelect(genre)}
            >
              {genre.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
}
