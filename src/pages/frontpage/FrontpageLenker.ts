export interface Lenke {
  tittel: string;
  beskrivelse: string;
  lenke: string;
  lenkeTekst: string;
}

export const lenker: Lenke[] = [
  {
    tittel: "Klage eller anke på vedtak",
    beskrivelse:
      "Har du fått helt eller delvis avslag på søknaden din, kan du klage på avslaget. Får du ikke medhold i klagen din i NAV, kan du med noen unntak anke til Trygderetten. ",
    lenke: "/klage-anke",
    lenkeTekst: "Send klage eller anke på vedtak"
  },
  {
    tittel: "Tilbakemelding på service",
    beskrivelse:
      "Har du blitt møtt på en dårlig måte? Eller hatt en annen negativ opplevelse i møte med NAV?",
    lenke: "/service-klage",
    lenkeTekst: "Send tilbakemelding på service"
  },
  {
    tittel: "Ros til NAV",
    beskrivelse:
      "Har du en god opplevelse? Vil du rose en medarbeider, eller er det noe annet positivt du vil dele med NAV?",
    lenke: "/ros",
    lenkeTekst: "Gi ros til nav"
  },
  {
    tittel: "Feil og mangler på nav.no",
    beskrivelse:
      "Har du oppdaget en feil på nav.no? Kanskje en teknisk feil, feil informasjon eller for lav grad av universell utforming? Da vil vi gjerne høre fra deg. ",
    lenke: "/feil-og-mangler",
    lenkeTekst: "Meld fra om feil og mangler"
  }
];
