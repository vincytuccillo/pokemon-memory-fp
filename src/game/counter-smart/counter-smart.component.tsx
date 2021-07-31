import { CounterComponent } from "../counter/counter.component";
import { useCounterSmart } from "./counter-smart.hook";

export const CounterSmartComponent = () => {
  const { moves } = useCounterSmart();

  return <CounterComponent moves={moves} />;
};
