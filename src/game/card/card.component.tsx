import { Box, Image } from "@chakra-ui/react";
import { FC } from "react";
import { Pokemon } from "../../pokemon/pokemon.types";
import styles from "./card.module.css";

export type CardComponentProps = {
  readonly pokemon: Pokemon;
  readonly foundPokemonNames: readonly string[];
  readonly isOpened: boolean;
  readonly onClick: (name: string) => void;
};

export const CardComponent: FC<CardComponentProps> = ({
  pokemon,
  isOpened,
  foundPokemonNames,
  onClick,
}) => {
  const isOpen = foundPokemonNames.includes(pokemon.name) || isOpened;
  return (
    <div
      className={`${styles.content} ${isOpen ? styles.noPointerEvents : ""}`}
      onClick={() => onClick(pokemon.name)}
    >
      <div className={`${styles.back} ${isOpen ? styles.backAnimation : ""}`}>
        <Box
          width={"200px"}
          height={"200px"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          className={styles.boxContainer}
        >
          <Image src={pokemon.sprites.frontDefault} />
        </Box>
      </div>

      <div className={`${styles.front} ${isOpen ? styles.frontAnimation : ""}`}>
        <Box
          width={"200px"}
          height={"200px"}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        ></Box>
      </div>
    </div>
  );
};
