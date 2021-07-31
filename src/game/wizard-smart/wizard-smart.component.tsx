import { WizardComponent } from "../wizard/wizard.component";
import { useWizardSmart } from "./wizard-smart.hooks";

export const WizardSmartComponent = () => {
  const { startGame } = useWizardSmart();

  return <WizardComponent onClick={startGame} />;
};
