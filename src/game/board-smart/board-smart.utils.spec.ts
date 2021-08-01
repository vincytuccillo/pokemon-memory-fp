import { isEndGame } from "./board.smart.utils";

describe("isEndGame ", () => {
  const allPokemons = [
    {
      id: 1,
      name: "pokemon1",
      baseExperience: 0,
      height: 0,
      order: 0,
      weight: 0,
      sprites: {
        frontDefault: "",
        backDefault: "string",
      },
    },
    {
      id: 2,
      name: "pokemon2",
      baseExperience: 0,
      height: 0,
      order: 0,
      weight: 0,
      sprites: {
        frontDefault: "",
        backDefault: "string",
      },
    },
  ];

  it("should return true if all the pokemons are found", () => {
    const foundPokemonNames = ["pokemon1", "pokemon2"];

    return expect(isEndGame(foundPokemonNames, allPokemons)).toBe(true);
  });

  it("should return false if all the pokemons are found", () => {
    const foundPokemonNames = ["pokemon1"];

    return expect(isEndGame(foundPokemonNames, allPokemons)).toBe(false);
  });
});
