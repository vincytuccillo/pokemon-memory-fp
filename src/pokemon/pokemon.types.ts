import { Nullable } from "../types";

export type GetPokemonsPayload = {
  readonly count: number;
  readonly next: string;
  readonly previous: Nullable<string>;
  readonly results: ReadonlyArray<{
    readonly name: string;
    readonly url: string;
  }>;
};

export type GetPokemons = {
  readonly count: number;
  readonly next: string;
  readonly previous: Nullable<string>;
  readonly results: ReadonlyArray<{
    readonly name: string;
    readonly url: string;
  }>;
};

export type PokemonPayload = {
  readonly id: number;
  readonly name: string;
  readonly base_experience: number;
  readonly height: number;
  readonly order: number;
  readonly weight: number;
  readonly sprites: PokemonFormSpritesPayload;
};

export type PokemonTypePayload = {
  readonly slot: number;
};

export type PokemonFormSpritesPayload = {
  readonly front_default: string;
  readonly back_default: string;
};

export type Pokemon = {
  readonly id: number;
  readonly name: string;
  readonly baseExperience: number;
  readonly height: number;
  readonly order: number;
  readonly weight: number;
  readonly sprites: PokemonFormSprites;
};

export type PokemonType = {
  readonly slot: number;
};

export type PokemonFormSprites = {
  readonly frontDefault: string;
  readonly backDefault: string;
};
