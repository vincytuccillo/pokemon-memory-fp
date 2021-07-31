import { useMemo } from "react";
import { useHistory } from "react-router-dom";

export const useWizardSmart = () => {
  const sideEffectHistory = useHistory();

  const handlers = useMemo(
    () => ({
      startGame: () => sideEffectHistory.push("/start"),
    }),
    [sideEffectHistory]
  );

  return {
    startGame: handlers.startGame,
  };
};
