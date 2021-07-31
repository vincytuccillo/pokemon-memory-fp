import { Button, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import styles from "./wizard.module.css";

type WizardComponentProps = {
  readonly onClick: () => void;
};

export const WizardComponent: FC<WizardComponentProps> = ({ onClick }) => {
  return (
    <>
      <Center>
        <Heading as="h3" size="lg">
          Pokemon Memory Game
        </Heading>
      </Center>
      <div className={styles.container}>
        <Flex
          flexDirection="column"
          height={"150px"}
          justifyContent={"space-between"}
        >
          <Stack spacing={4} direction="column" align="center">
            <Text fontSize="4xl">Start the game</Text>
            <Button onClick={onClick}>Start</Button>
          </Stack>
        </Flex>
      </div>
    </>
  );
};
