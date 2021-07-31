import { playerSlice } from "./player.reducer";
import { Player } from "./player.types";

describe("counter reducer", () => {
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

  it("should handle increment", () => {
    const actual = playerSlice.reducer(
      initialState,
      playerSlice.actions.addMove()
    );
    expect(actual.moves).toEqual(1);
  });

  it("should handle increment", () => {
    const actual = playerSlice.reducer(
      initialState,
      playerSlice.actions.setSelectedPokemon("charizard")
    );
    expect(actual.selectedPokemon).toEqual("charizard");
  });

  it("should handle increment", () => {
    const actual = playerSlice.reducer(
      initialState,
      playerSlice.actions.addPokemonName("charizard")
    );
    expect(actual.foundPokemonNames).toEqual(["charizard"]);
  });
});
