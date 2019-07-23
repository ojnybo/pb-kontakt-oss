import React from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "../../assets/Veileder.svg";
import { TextareaControlled } from "nav-frontend-skjema";
import { Hovedknapp } from "nav-frontend-knapper";

const Melding = () => {
  const onSubmit = () => {
    console.log("Submitting");
  };

  return (
    <>
      <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
        Unngå å nevne sensitive personopplysninger, som for eksempel
        opplysninger om helseforhold eller diagnoser. Skriv gjerne kort.
      </Veilederpanel>
      <div className="ros-til-nav__felt">
        <TextareaControlled defaultValue={""} label={"Melding til NAV"} />
      </div>
      <div className="ros-til-nav__knapp">
        <Hovedknapp onClick={onSubmit}>Send</Hovedknapp>
      </div>
    </>
  );
};
export default Melding;
