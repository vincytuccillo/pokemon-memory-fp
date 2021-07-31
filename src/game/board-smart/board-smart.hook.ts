/* eslint-disable functional/no-conditional-statement */
import { flow, pipe } from "fp-ts/lib/function";
import { fromNullable, getOrElse, map } from "fp-ts/lib/Option";
import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { match } from "ts-pattern";
import { duplicateElements } from "../../array/duplicate-elements";
import { shuffleElements } from "../../array/shuffle-elements";
import { playerSlice, selectPlayer } from "../../player/player.reducer";
import { useGetPokemonsQuery } from "../../pokemon/pokemon.reducer";
import { Pokemon } from "../../pokemon/pokemon.types";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { RouterPath } from "../../Router";
import { isNotNil } from "../../types/nullable.guards";
import { OpenedCard } from "./book-smart.types";
import {
  areThreeOpenedCard,
  areTwoOpenedCard,
  isEndGame,
  isOneOpenedCard,
} from "./book-smart.utils";

export const useBoardSmart = (numberOfCards: number) => {
  const { data, isLoading } = useGetPokemonsQuery(numberOfCards.toString());

  const sideEffectHistory = useHistory();

  const { foundPokemonNames } = useAppSelector(selectPlayer);

  const [openedCards, sideEffectSetCardsOpened] = useState<
    readonly OpenedCard[]
  >([]);

  const pokemons = useMemo(
    () =>
      pipe(
        data,
        fromNullable,
        map(
          flow(
            shuffleElements,
            (pokemons) => pokemons.slice(0, numberOfCards),
            duplicateElements
          )
        ),
        getOrElse(() => [] as readonly Pokemon[])
      ),
    [data, numberOfCards]
  );

  const sideEffectDispatch = useAppDispatch();

  // eslint-disable-next-line functional/no-expression-statement
  useEffect(
    () =>
      match(openedCards)
        .when(areThreeOpenedCard, (cards) => {
          sideEffectSetCardsOpened([cards[2]]);
        })
        .when(areTwoOpenedCard, (cards) => {
          const firstPokemon = cards[0];
          const secondPokemon = cards[1];

          if (
            isNotNil(firstPokemon) &&
            isNotNil(secondPokemon) &&
            firstPokemon.name === secondPokemon.name
          ) {
            sideEffectSetCardsOpened([]);
            sideEffectDispatch(
              playerSlice.actions.addPokemonName(firstPokemon.name)
            );
            sideEffectDispatch(playerSlice.actions.addMove());
            sideEffectDispatch(playerSlice.actions.setSelectedPokemon(null));

            if (
              isEndGame([...foundPokemonNames, firstPokemon.name], pokemons)
            ) {
              sideEffectHistory.push(RouterPath.win);
            }
          } else {
            sideEffectDispatch(playerSlice.actions.addMove());
            sideEffectDispatch(playerSlice.actions.setSelectedPokemon(null));
          }
        })
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
