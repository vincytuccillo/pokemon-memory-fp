import { playerSlice } from "./player.reducer";
import { Player } from "./player.types";

describe("player reducer", () => {
  const initialState: Player = {
    moves: 0,
    selectedPokemon: null,
    foundPokemonNames: [],
  };
  it("should handle initial state", () => {
    expect(playerSlice.reducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle increment moves", () => {
    const actual = playerSlice.reducer(
      initialState,
      playerSlice.actions.addMove()
    );
    expect(actual.moves).toEqual(1);
  });

  it("should set selected Pokemon", () => {
    const actual = playerSlice.reducer(
      initialState,
      playerSlice.actions.setSelectedPokemon("charizard")
    );
    expect(actual.selectedPokemon).toEqual("charizard");
  });

  it("should add Pokemon Name", () => {
    const actual = playerSlice.reducer(
      initialState,
      playerSlice.actions.addPokemonName("charizard")
    );
    expect(actual.foundPokemonNames).toEqual(["charizard"]);
  });

  it("should reset", () => {
    const actual = playerSlice.reducer(
      initialState,
      playerSlice.actions.reset()
    );
    expect(actual).toEqual(initialState);
  });
});
