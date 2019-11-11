import React from "react";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import { Undertittel } from "nav-frontend-typografi";
import { urls } from "../../../Config";

import ikon from "assets/forside-skrivtiloss-ikon.svg";
import ChevronLenke from "../../../components/chevronlenke/ChevronLenke";

const SkrivTilOss = () => {
  const tittel = <FormattedMessage id={"kontaktoss.skrivtiloss.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <>
        <div>
          <FormattedHTMLMessage id={"kontaktoss.skrivtiloss.beskrivelse"} />
        </div>
        <ChevronLenke
          href={urls.skrivTilOss.forside}
          className={"frontpage__lenke"}
        >
          <FormattedMessage id={"kontaktoss.skrivtiloss.knapp"} />
        </ChevronLenke>

        <div className={"frontpage__aktivitetsplan"}>
          <Undertittel>
            <FormattedMessage id={"kontaktoss.aktivitetsplan.tittel"} />
          </Undertittel>
        </div>
        <div className={"ikonpanel__innhold-body"}>
          <FormattedHTMLMessage id={"kontaktoss.aktivitetsplan.beskrivelse"} />
          <ChevronLenke
            href={urls.aktivitetsplan}
            className={"frontpage__lenke"}
            isExternal={true}
          >
            <FormattedMessage id={"kontaktoss.aktivitetsplan.knapp"} />
          </ChevronLenke>
        </div>
      </>
    </IkonPanel>
  );
};

export default SkrivTilOss;
