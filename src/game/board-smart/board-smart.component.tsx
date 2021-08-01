import { BoardComponent } from "../board/board.component";
import { useBoardSmart } from "./board-smart.hook";

export const BoardSmartComponent = () => {
  const numberCards = 4;

  const { pokemons, openedCards, addCard } = useBoardSmart(numberCards);

  return (
    <BoardComponent
      openedCards={openedCards}
      addCard={addCard}
      pokemons={pokemons}
    />
  );
};
