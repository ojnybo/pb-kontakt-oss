import { urls } from "../../../Config";
import React from "react";
import { Normaltekst, Systemtittel, Undertekst } from "nav-frontend-typografi";
import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";

const className = "korona-varsel";

export type KoronaVirusVarselInnhold = {
  tittel: JSX.Element,
  ingress: JSX.Element,
  datoTid: string,
  href: string,
};

type Props = {
  innhold?: KoronaVirusVarselInnhold
};

const defaultInnhold: KoronaVirusVarselInnhold = {
  tittel: <>{"Koronavirus"}</>,
  ingress: <>{"Her finner du oppdatert informasjon fra NAV om sykmeldinger, omsorgspenger, permitteringer og behov for akuttolk."}</>,
  datoTid: "13.03.2020, kl. 11.46",
  href: urls.faq.koronavirus,
};

export const KoronaVirusVarsel = ({ innhold = defaultInnhold }: Props) => (
  <LenkepanelBase className={className} href={innhold.href} border={true}>
    <div className={`${className}__ikon-kol`}>
      <div className={`${className}__pulse`}/>
      <div className={`${className}__sirkel`}/>
    </div>
    <div className={`${className}__tekst-kol`}>
      <Systemtittel className={`lenkepanel__heading`}>
        {innhold.tittel}
      </Systemtittel>
      <Normaltekst className={`${className}__ingress`}>
        {innhold.ingress}
      </Normaltekst>
      <Undertekst className={`${className}__dato-tid`}>
        {`Oppdatert: ${innhold.datoTid}`}
      </Undertekst>
    </div>
  </LenkepanelBase>
);
