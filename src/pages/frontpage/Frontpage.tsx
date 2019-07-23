import React from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "../../assets/Veileder.svg";
import { Normaltekst, Sidetittel, Undertittel } from "nav-frontend-typografi";
import { lenker } from "./FrontpageLenker";
import Lenkepanel from "nav-frontend-lenkepanel";

const Frontpage = () => (
  <div className="frontpage">
    <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
      Hei! Vi vil gjerne høre om opplevelsen din!
    </Veilederpanel>
    <header className="frontpage__introduksjon">
      <div className="frontpage__sidetittel">
        <Sidetittel>Tilbakemeldinger til NAV</Sidetittel>
      </div>
    </header>
    <div className="frontpage__content">
      {lenker.map((lenke, key) => (
        <Lenkepanel href={lenke.lenke} tittelProps="sidetittel" border>
          <div className="lenke__container" key={key}>
            <div className="lenke__tittel">
              <Undertittel>{lenke.tittel}</Undertittel>
            </div>
            <div className="lenke__beskrivelse">
              <Normaltekst>{lenke.beskrivelse}</Normaltekst>
            </div>
          </div>
        </Lenkepanel>
      ))}
    </div>
  </div>
);

export default Frontpage;
