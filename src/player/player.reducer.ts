import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pipe } from "fp-ts/lib/function";
import { RootState } from "../redux/store";
import { Nullable } from "../types";
import { Player } from "./player.types";

const initialState: Player = {
  moves: 0,
  selectedPokemon: null,
  foundPokemonNames: [],
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    addMove(state) {
      return {
        ...state,
        moves: state.moves + 1,
      };
    },
    setSelectedPokemon(state, action: PayloadAction<Nullable<string>>) {
      return {
        ...state,
        selectedPokemon: action.payload,
      };
    },
    addPokemonName(state, foundPokemonName: PayloadAction<string>) {
      return {
        ...state,
        foundPokemonNames: [
          ...state.foundPokemonNames,
          foundPokemonName.payload,
        ],
      };
    },
    reset() {
      return initialState;
    },
  },
});

export const selectPlayer = (state: RootState) => state.player;
export const selectMoves = (state: RootState) =>
  pipe(state, selectPlayer, ({ moves }) => moves);

export const selectSelectedPokemon = (state: RootState) =>
  pipe(state, selectPlayer, ({ selectedPokemon }) => selectedPokemon);

export const selectFoundPokemonNames = (state: RootState) =>
  pipe(state, selectPlayer, ({ foundPokemonNames }) => foundPokemonNames);
