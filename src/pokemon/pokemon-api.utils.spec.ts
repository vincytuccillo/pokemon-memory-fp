import { decodePokemon, decodePokemonList } from "./pokemon-api.utils";
import { GetPokemonsPayload, PokemonPayload } from "./pokemon.types";

describe("decodePokemonList ", () => {
  it("should return error when the payload is wrong ", () => {
    const payload = "wrongPayload";

    const res = decodePokemonList({ data: payload });

    return expect(res).toEqual({
      isError: true,
      message: "Adapter Pokemon List Error",
      status: 200,
      type: "AdapterError",
    });
  });

  it("should return error when the api return error", () => {
    const res = decodePokemonList({
      error: {
        status: "CUSTOM_ERROR",
        error: "error",
      },
    });

    return expect(res).toEqual({
      isError: true,
      message: "Api Error",
      status: 500,
      type: "ApiError",
    });
  });

  it("should return value if correct", () => {
    const payload: GetPokemonsPayload = {
      count: 0,
      next: "next",
      previous: null,
      results: [{ name: "name", url: "url" }],
    };

    const res = decodePokemonList({ data: payload });

    return expect(res).toEqual([{ name: "name", url: "url" }]);
  });
});

describe("decodePokemon ", () => {
  it("should return error when the payload is wrong ", () => {
    const payload = "wrongPayload";

    const res = decodePokemon({ data: payload });

    return expect(res).toEqual({
      isError: true,
      message: "Adapter Pokemon Error",
      status: 200,
      type: "AdapterError",
    });
  });

  it("should return error when the api return error", () => {
    const res = decodePokemon({
      error: {
        status: "CUSTOM_ERROR",
        error: "error",
      },
    });

    return expect(res).toEqual({
      isError: true,
      message: "Api Error",
      status: 500,
      type: "ApiError",
    });
  });

  it("should return value if correct", () => {
    const payload: PokemonPayload = {
      id: 1,
      name: "string",
      base_experience: 0,
      height: 0,
      order: 0,
      weight: 0,
      sprites: {
        front_default: "string",
        back_default: "string",
      },
    };

    const res = decodePokemon({ data: payload });

    return expect(res).toEqual({
      baseExperience: 0,
      height: 0,
      id: 1,
      name: "string",
      order: 0,
      sprites: { backDefault: "string", frontDefault: "string" },
      weight: 0,
    });
  });
});
