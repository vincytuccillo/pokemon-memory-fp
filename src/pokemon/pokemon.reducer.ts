import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { match } from "ts-pattern";
import { isError } from "../error";
import { createAdapterError } from "../error/adapter-error.factory";
import { decodePokemon, decodePokemonList } from "./pokemon-api.utils";
import { Pokemon } from "./pokemon.types";

export const getPokemonListFromApi = async (
  getPokemonList: () => Promise<
    QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
  >
) => {
  const pokemonList = await getPokemonList();
  return decodePokemonList(pokemonList);
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
  return decodePokemon(pokemon);
};

export const pokemonApi = createApi({
  reducerPath: "pokemonsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_POKEMON_API }),
  endpoints: (builder) => ({
    getPokemons: builder.query<readonly Pokemon[], string>({
      queryFn: async (arg, _, __, baseQuery) => {
        const pokemonListRes = await getPokemonListFromApi(
          async () => await baseQuery(`pokemon?limit=${arg}`)
        );

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
