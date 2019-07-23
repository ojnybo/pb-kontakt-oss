import React, { useState } from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "../../assets/Veileder.svg";
import {
  Input,
  RadioPanelGruppe,
  TextareaControlled
} from "nav-frontend-skjema";
import { Hovedknapp } from "nav-frontend-knapper";
import { Link } from "react-router-dom";

const Opplysninger = () => {
  const [rosTilHvem, settRosTilHvem] = useState();

  const onRosTilHvemClick = (
    event: React.SyntheticEvent<EventTarget>,
    value: string
  ) => settRosTilHvem(value);

  return (
    <>
      <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
        Takk for at du vil dele din opplevelse med oss! Vi sørger for at rosen
        kommer fram til riktig person. Unngå å nevne sensitive
        personopplysninger, som for eksempel opplysninger om helseforhold eller
        diagnoser.
      </Veilederpanel>
      <div className="ros-til-nav__felt">
        <Input label={"Navn"} />
      </div>
      <div className="ros-til-nav__felt">
        <Input label={"Telefonnummer"} />
      </div>
      <RadioPanelGruppe
        radios={[
          { label: "NAV Kontaktsenter", value: "nav-kontaktsenter" },
          { label: "NAVs digitale løsninger", value: "nav-digitale-losninger" },
          { label: "NAV-kontor", value: "nav-kontor" }
        ]}
        checked={rosTilHvem}
        name={"ros-til-hvem"}
        legend={"Hvem vil du gi ros til?"}
        onChange={onRosTilHvemClick}
      />
      <div className="ros-til-nav__felt">
        <TextareaControlled defaultValue={""} label={"Melding til NAV"} />
      </div>
      <div className="ros-til-nav__knapp">
        <Link to={"/person/tilbakemeldinger/ros-til-nav/melding"}>
          <Hovedknapp>Neste</Hovedknapp>
        </Link>
      </div>
    </>
  );
};
export default Opplysninger;
