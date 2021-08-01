import { Redirect, Route, Switch } from "react-router-dom";
import {
  BoardSmartComponent,
  WinComponent,
  WizardSmartComponent,
} from "./game";
import { isNotNil } from "./types/nullable.guards";

type LocationState = {
  readonly isWinner?: boolean;
};

export enum RouterPath {
  start = "/start",
  win = "/win",
}

export const AppRouter = () => {
  return (
    <Switch>
      <Route path={RouterPath.start} exact component={BoardSmartComponent} />
      <Route
        path={RouterPath.win}
        exact
        render={({ location }) => {
          const state = location.state as LocationState;

          if (isNotNil(state?.isWinner) && state.isWinner) {
            return <WinComponent />;
          }

          return <Redirect to="/" />;
        }}
      />
      <Route component={WizardSmartComponent} />
    </Switch>
  );
};
