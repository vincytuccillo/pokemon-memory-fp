import { isNotEmpty } from "../../array";
import { Pokemon } from "../../pokemon/pokemon.types";
import { OpenedCard } from "../game.types";

export const areThreeOpenedCard = (openedCards: readonly OpenedCard[]) =>
  openedCards.length === 3;

export const areTwoOpenedCard = (openedCards: readonly OpenedCard[]) =>
  openedCards.length === 2;

export const isOneOpenedCard = (openedCards: readonly OpenedCard[]) =>
  openedCards.length === 1;

export const isEndGame = (
  foundPokemonNames: readonly string[],
  allPokemons: readonly Pokemon[]
) =>
  isNotEmpty(foundPokemonNames) &&
  allPokemons.every((value) =>
    foundPokemonNames.some((name) => name === value.name)
  );
