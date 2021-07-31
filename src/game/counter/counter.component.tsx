import { FC } from "react";
import { Stack, Text } from "@chakra-ui/react";

type CounterComponentProps = {
  readonly moves: number;
};

export const CounterComponent: FC<CounterComponentProps> = ({ moves }) => {
  return (
    <Stack spacing={3}>
      <Text fontSize="3xl">Moves</Text>
      <Text fontSize="2xl">{moves}</Text>;
    </Stack>
  );
};
