import { Route, Switch } from "react-router-dom";
import { BoardSmartComponent } from "./game";
import { WinComponent } from "./game/win/win.component";
import { WizardSmartComponent } from "./game/wizard-smart/wizard-smart.component";

export enum RouterPath {
  start = "/start",
  win = "/win",
}

export const AppRouter = () => {
  return (
    <Switch>
      <Route path={RouterPath.start} exact component={BoardSmartComponent} />
      <Route path={RouterPath.win} exact component={WinComponent} />
      <Route component={WizardSmartComponent} />
    </Switch>
  );
};
