import React from "react";
import { FormattedMessage } from "react-intl";
import IkonPanel from "components/ikonpanel/IkonPanel";
import ikon from "assets/forside-ringoss-ikon.svg";
import { urls } from "Config";
import { logEvent } from "utils/logger";
import RouterLenke from "components/routerlenke/RouterLenkeMedChevron";
import { KanalVisning } from "../KanalVisning";
import { Kanal } from "../../../types/kanaler";

const RingOss = () => {
  const tittel = <FormattedMessage id={"kontaktoss.ringoss.tittel"}/>;

  const onClick = () => {
    logEvent({event: "ring-oss"});
  };

  return (
    <IkonPanel ikon={ikon} tittel={tittel} className="ringoss">
      <KanalVisning kanal={Kanal.RingOss}>
        <RouterLenke
          isExternal={true}
          href={urls.ringOss}
          onClick={onClick}
          className={"lenke__avstand-over"}
        >
          <FormattedMessage id={"kontaktoss.ringoss.knapp"}/>
        </RouterLenke>
      </KanalVisning>
    </IkonPanel>
  );
};

export default RingOss;
