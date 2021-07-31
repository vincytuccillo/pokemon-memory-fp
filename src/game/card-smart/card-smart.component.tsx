import { FC } from "react";
import { Pokemon } from "../../pokemon/pokemon.types";
import { OpenedCard } from "../board-smart/book-smart.types";
import { CardComponent } from "../card/card.component";
import { useCardSmart } from "./card-smart-hook";

export type CardSmartComponentProps = {
  readonly pokemon: Pokemon;
  readonly isOpened: boolean;
  readonly index: number;
  readonly addCard: (cards: OpenedCard) => void;
};

export const CardSmartComponent: FC<CardSmartComponentProps> = ({
  pokemon,
  addCard,
  isOpened,
  index,
}) => {
  const { foundPokemonNames } = useCardSmart();

  return (
    <CardComponent
      pokemon={pokemon}
      onClick={() => addCard({ name: pokemon.name, index })}
      isOpened={isOpened}
      foundPokemonNames={foundPokemonNames}
    />
  );
};
