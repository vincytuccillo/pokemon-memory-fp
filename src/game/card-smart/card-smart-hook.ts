import { selectPlayer } from "../../player/player.reducer";
import { useAppSelector } from "../../redux/store";

export const useCardSmart = () => {
  const { foundPokemonNames } = useAppSelector(selectPlayer);

  return {
    foundPokemonNames,
  };
};
