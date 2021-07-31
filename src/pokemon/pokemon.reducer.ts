import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import {
  fromOption,
  getOrElseW as getOrElseEW,
  map as mapE,
  matchW as matchEW,
} from "fp-ts/lib/Either";
import { flow, identity, pipe } from "fp-ts/lib/function";
import { fromNullable, map } from "fp-ts/lib/Option";
import { match } from "ts-pattern";
import { isError } from "../error";
import { createAdapterError } from "../error/adapter-error.factory";
import { createApiError } from "../error/api-error.factory";
import {
  decodeGetPokemonsPayload,
  decodePokemonPayload,
} from "./pokemon.adapter";
import { Pokemon } from "./pokemon.types";

export const getListPokemonFromApi = async ({
  getPokemonList,
}: {
  readonly getPokemonList: () => Promise<
    QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
  >;
}) => {
  const pokemonList = await getPokemonList();

  return pipe(
    pokemonList,
    fromNullable,
    map(({ data }) => data),
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
};

export const getPokemonFromApi = async (
  pokemonName: string,
  getPokemon: (
    name: string
  ) => Promise<
    QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
  >
) => {
  const pokemon = await getPokemon(pokemonName);

  return pipe(
    pokemon,
    fromNullable,
    map(({ data }) => data),
    fromOption(() => ({
      ...createApiError(
        "Api Error",
        typeof pokemon.error?.status === "number" ? pokemon.error?.status : 500
      ),
    })),
    mapE(
      flow(
        decodePokemonPayload,
        getOrElseEW(() => ({
          error: createAdapterError("Adapter Pokemon Error"),
        }))
      )
    ),
    matchEW(identity, identity)
  );
};

export const pokemonApi = createApi({
  reducerPath: "pokemonsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_POKEMON_API }),
  endpoints: (builder) => ({
    getPokemons: builder.query<readonly Pokemon[], string>({
      queryFn: async (arg, _, __, baseQuery) => {
        const pokemonListRes = await getListPokemonFromApi({
          getPokemonList: async () => await baseQuery(`pokemon?${arg}`),
        });

        return await match(pokemonListRes)
          .when(isError, (error) => ({
            error: {
              status: error.status,
              data: error,
            },
          }))
          .when(
            (listRes) => Array.isArray(listRes),
            async (
              array: ReadonlyArray<{
                readonly name: string;
                readonly url: string;
              }>
            ) => {
              const pokemons = await Promise.all(
                array.map(async ({ name }) => {
                  return await getPokemonFromApi(
                    name,
                    async () => await baseQuery(`pokemon/${name}`)
                  );
                })
              );

              // this should be improved
              const error = pokemons.find(isError);

              return isError(error)
                ? {
                    error: {
                      status: error.status,
                      data: error,
                    },
                  }
                : {
                    data: pokemons as readonly Pokemon[],
                  };
            }
          )
          .otherwise(() => {
            const adapterError = createAdapterError("Error with adapter");

            return {
              error: {
                status: 200,
                data: adapterError,
              },
            };
          });
      },
    }),
  }),
});

export const { useGetPokemonsQuery } = pokemonApi;
