import React from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "../../assets/Veileder.svg";
import { Sidetittel } from "nav-frontend-typografi";
import { lenker } from "./FrontpageLenker";

const Frontpage = () => (
  <div className="frontpage">
    <header className="frontpage__header">
      <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
        Hei! Vi vil gjerne høre om opplevelsen din!
      </Veilederpanel>
    </header>
    <div className="frontpage__content">
      {lenker.map(lenke => (
        <>
          <Sidetittel>{lenke.tittel}</Sidetittel>
          <div className="frontpage__lenke">{lenke.beskrivelse}</div>
        </>
      ))}
    </div>
  </div>
);

export default Frontpage;
