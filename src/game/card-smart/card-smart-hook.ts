import { selectFoundPokemonNames } from "../../player/player.reducer";
import { useAppSelector } from "../../redux";

export const useCardSmart = () => {
  const foundPokemonNames = useAppSelector(selectFoundPokemonNames);

  return {
    foundPokemonNames,
  };
};
