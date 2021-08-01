import { Grid } from "@chakra-ui/react";
import { FC } from "react";
import { Pokemon } from "../../pokemon/pokemon.types";
import { isNotNil } from "../../types/nullable.guards";
import { OpenedCard } from "../game.types";
import { CardSmartComponent } from "../card-smart/card-smart.component";
import { CounterSmartComponent } from "../counter-smart/counter-smart.component";
import styles from "./board.module.css";

export type BoardComponentProps = {
  readonly pokemons: readonly Pokemon[];
  readonly openedCards: readonly OpenedCard[];
  readonly addCard: (card: OpenedCard) => void;
};

export const BoardComponent: FC<BoardComponentProps> = ({
  pokemons,
  openedCards,
  addCard,
}) => {
  return (
    <div className={styles.container}>
      <Grid
        templateColumns={`repeat(3,1fr)`}
        gap={"10px"}
        templateRows={`repeat(3,1fr)`}
        height={"800px"}
        width={"800px"}
      >
        {pokemons.map((pokemon, index) => (
          <CardSmartComponent
            key={index}
            addCard={addCard}
            index={index}
            isOpened={isNotNil(
              openedCards.find((card) => card.index === index)
            )}
            pokemon={pokemon}
          />
        ))}
      </Grid>

      <CounterSmartComponent />
    </div>
  );
};
