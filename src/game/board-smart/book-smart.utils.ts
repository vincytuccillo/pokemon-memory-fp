import { Pokemon } from "../../pokemon/pokemon.types";
import { OpenedCard } from "./book-smart.types";

export const areThreeOpenedCard = (openedCards: readonly OpenedCard[]) =>
  openedCards.length === 3;

export const areTwoOpenedCard = (openedCards: readonly OpenedCard[]) =>
  openedCards.length === 2;

export const isOneOpenedCard = (openedCards: readonly OpenedCard[]) =>
  openedCards.length === 1;

export const isEndGame = (
  foundPokemonName: readonly string[],
  allPokemons: readonly Pokemon[]
) =>
  foundPokemonName.length > 0 &&
  allPokemons.every((value) =>
    foundPokemonName.some((name) => name === value.name)
  );
