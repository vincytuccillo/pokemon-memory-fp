import { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { RouterPath } from "../../Router";

export const useWizardSmart = () => {
  const sideEffectHistory = useHistory();

  const handlers = useMemo(
    () => ({
      startGame: () => sideEffectHistory.push(RouterPath.start),
    }),
    [sideEffectHistory]
  );

  return {
    startGame: handlers.startGame,
  };
};
