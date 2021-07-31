import { BoardComponent } from "../board/board.component";
import { useBoardSmart } from "./board-smart.hook";

export const BoardSmartComponent = () => {
  const cardsNumber = 4;

  const { pokemons, openedCards, addCard } = useBoardSmart(cardsNumber);

  return (
    <BoardComponent
      openedCards={openedCards}
      addCard={addCard}
      pokemons={pokemons}
    />
  );
};
