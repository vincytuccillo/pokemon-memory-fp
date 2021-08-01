import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  fromOption,
  getOrElseW as getOrElseEW,
  map as mapE,
  matchW as matchEW,
} from "fp-ts/lib/Either";
import { flow, identity, pipe } from "fp-ts/lib/function";
import { chainNullableK, fromNullable } from "fp-ts/lib/Option";
import { createAdapterError } from "../error/adapter-error.factory";
import { createApiError } from "../error/api-error.factory";
import {
  decodeGetPokemonsPayload,
  decodePokemonPayload,
} from "./pokemon.adapter";

export const decodePokemonList = (
  pokemonList: QueryReturnValue<
    unknown,
    FetchBaseQueryError,
    FetchBaseQueryMeta
  >
) =>
  pipe(
    pokemonList,
    fromNullable,
    chainNullableK(({ data }) => data),
    fromOption(() => ({
      ...createApiError(
        "Api Error",
        typeof pokemonList.error?.status === "number"
          ? pokemonList.error?.status
          : 500
      ),
    })),
    mapE(
      flow(
        decodeGetPokemonsPayload,
        mapE(({ results }) => results),
        getOrElseEW(() => createAdapterError("Adapter Pokemon List Error"))
      )
    ),
    matchEW(identity, identity)
  );

export const decodePokemon = (
  pokemon: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
) =>
  pipe(
    pokemon,
    fromNullable,
    chainNullableK(({ data }) => data),
    fromOption(() => ({
      ...createApiError(
        "Api Error",
        typeof pokemon.error?.status === "number" ? pokemon.error?.status : 500
      ),
    })),
    mapE(
      flow(
        decodePokemonPayload,
        getOrElseEW(() => createAdapterError("Adapter Pokemon Error"))
      )
    ),
    matchEW(identity, identity)
  );
