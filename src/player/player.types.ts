import { Nullable } from "../types";

export type Player = {
  readonly moves: number;
  readonly selectedPokemon: Nullable<string>;
  readonly foundPokemonNames: readonly string[];
};
