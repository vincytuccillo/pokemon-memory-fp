import { playerSlice } from "../player/player.reducer";
import { pokemonApi } from "../pokemon/pokemon.reducer";

export const rootReducer = {
  pokemonsApi: pokemonApi.reducer,
  player: playerSlice.reducer,
};
