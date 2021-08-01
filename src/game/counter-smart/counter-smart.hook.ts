import { selectMoves } from "../../player/player.reducer";
import { useAppSelector } from "../../redux/store";

export const useCounterSmart = () => {
  const moves = useAppSelector(selectMoves);

  return { moves };
};
