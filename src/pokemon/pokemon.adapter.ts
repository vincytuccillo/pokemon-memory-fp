import { pipe } from "fp-ts/lib/function";
import * as D from "io-ts/Decoder";
import {
  GetPokemonsPayload,
  Pokemon,
  PokemonFormSprites,
  PokemonFormSpritesPayload,
  PokemonPayload,
} from "./pokemon.types";

const adaptPokemonFormSpritesPayload = (
  pokemonFormSpritesPayload: PokemonFormSpritesPayload
): PokemonFormSprites => ({
  frontDefault: pokemonFormSpritesPayload.front_default,
  backDefault: pokemonFormSpritesPayload.back_default,
});

const adaptPokemonPayload = (pokemon: PokemonPayload): Pokemon => ({
  id: pokemon.id,
  name: pokemon.name,
  baseExperience: pokemon.base_experience,
  height: pokemon.height,
  order: pokemon.order,
  weight: pokemon.weight,
  sprites: adaptPokemonFormSpritesPayload(pokemon.sprites),
});

const pokemonFormSpritesStructPayload = pipe(
  D.struct<PokemonFormSpritesPayload>({
    front_default: D.string,
    back_default: D.string,
  })
);

const pokemonStructPayload = D.struct<PokemonPayload>({
  id: D.number,
  name: D.string,
  base_experience: D.number,
  height: D.number,
  order: D.number,
  weight: D.number,
  sprites: pokemonFormSpritesStructPayload,
});

const pokemonStruct = pipe(
  pokemonStructPayload,
  D.map<PokemonPayload, Pokemon>(adaptPokemonPayload)
);

const getPokemonsStructPayload = D.struct<GetPokemonsPayload>({
  count: D.number,
  next: D.string,
  previous: D.nullable(D.string),
  results: D.array(
    D.struct({
      name: D.string,
      url: D.string,
    })
  ),
});

export const decodePokemonPayload = pokemonStruct.decode;
export const decodeGetPokemonsPayload = getPokemonsStructPayload.decode;

export type DecodePokemon = ReturnType<typeof decodePokemonPayload>;
export type DecodeGetPokemons = ReturnType<typeof decodeGetPokemonsPayload>;
