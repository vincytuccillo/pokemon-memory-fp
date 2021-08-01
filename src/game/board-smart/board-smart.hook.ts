import { flow, pipe } from "fp-ts/lib/function";
import { fromNullable, getOrElse, map } from "fp-ts/lib/Option";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { match } from "ts-pattern";
import { shuffleElements, duplicateElements } from "../../array";
import {
  selectFoundPokemonNames,
  playerSlice,
} from "../../player/player.reducer";
import { useGetPokemonsQuery, Pokemon } from "../../pokemon";
import { useAppSelector, useAppDispatch } from "../../redux";
import { RouterPath } from "../../Router";
import { isNotNil } from "../../types/nullable.guards";
import { OpenedCard } from "../game.types";
import {
  isEndGame,
  areThreeOpenedCard,
  areTwoOpenedCard,
  isOneOpenedCard,
} from "./board.smart.utils";

export const useBoardSmart = (numberCards: number) => {
  const { data, isLoading } = useGetPokemonsQuery(numberCards.toString());

  const sideEffectHistory = useHistory();

  const foundPokemonNames = useAppSelector(selectFoundPokemonNames);

  const [openedCards, sideEffectSetCardsOpened] = useState<
    readonly OpenedCard[]
  >([]);

  const pokemons = useMemo(
    () =>
      pipe(
        data,
        fromNullable,
        map(flow(shuffleElements, duplicateElements)),
        getOrElse(() => [] as readonly Pokemon[])
      ),
    [data]
  );

  const sideEffectDispatch = useAppDispatch();

  const handleTwoOpenedCard = useCallback(
    (cards: readonly OpenedCard[]) => {
      const firstPokemon = cards[0];
      const secondPokemon = cards[1];

      sideEffectDispatch(playerSlice.actions.addMove());
      sideEffectDispatch(playerSlice.actions.setSelectedPokemon(null));

      if (
        isNotNil(firstPokemon) &&
        isNotNil(secondPokemon) &&
        firstPokemon.name === secondPokemon.name
      ) {
        sideEffectSetCardsOpened([]);
        sideEffectDispatch(
          playerSlice.actions.addPokemonName(firstPokemon.name)
        );

        if (isEndGame([...foundPokemonNames, firstPokemon.name], pokemons)) {
          sideEffectDispatch(playerSlice.actions.reset());
          return sideEffectHistory.push(RouterPath.win, { isWinner: true });
        }
      }
    },
    [foundPokemonNames, pokemons, sideEffectDispatch, sideEffectHistory]
  );

  // eslint-disable-next-line functional/no-expression-statement
  useEffect(
    () =>
      match(openedCards)
        .when(areThreeOpenedCard, (cards) => {
          sideEffectSetCardsOpened([cards[2]]);
        })
        .when(areTwoOpenedCard, handleTwoOpenedCard)
        .when(isOneOpenedCard, (card) => {
          const firstPokemon = card[0];
          sideEffectDispatch(
            playerSlice.actions.setSelectedPokemon(firstPokemon.name)
          );
        })
        .otherwise(() => {
          sideEffectDispatch(playerSlice.actions.setSelectedPokemon(null));
        }),
    [
      openedCards,
      sideEffectHistory,
      pokemons,
      foundPokemonNames,
      sideEffectDispatch,
      handleTwoOpenedCard,
    ]
  );

  const handlers = useMemo(
    () => ({
      addCard: (card: OpenedCard) =>
        sideEffectSetCardsOpened([...openedCards, card]),
    }),
    [openedCards]
  );

  return {
    pokemons,
    isLoading,
    openedCards,
    addCard: handlers.addCard,
  };
};
