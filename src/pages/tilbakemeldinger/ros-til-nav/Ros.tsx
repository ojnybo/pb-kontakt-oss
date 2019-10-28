import React, { useState, useEffect } from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "../../../assets/Veileder.svg";
import { Knapp } from "nav-frontend-knapper";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import InputNavn from "../../../components/input-fields/InputNavn";
import InputTelefon from "../../../components/input-fields/InputTelefon";
import InputMelding from "../../../components/input-fields/InputMelding";
import { fetchEnheter, postRosTilNav } from "../../../clients/apiClient";
import Tilbake from "../../../components/tilbake/Tilbake";
import { HTTPError } from "../../../components/error/Error";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import { Element } from "nav-frontend-typografi";
import NavFrontendSpinner from "nav-frontend-spinner";
import { FormContext, Form, Validation } from "calidation";
import Select from "react-select";
import { ValueType } from "react-select/src/types";
import { Enheter } from "../../../types/enheter";
import { useStore } from "../../../providers/Provider";
import Header from "../../../components/header/Header";
import { urls } from "Config";
import Box from "../../../components/box/Box";
import { Radio, SkjemaGruppe } from "nav-frontend-skjema";

type HVEM_ROSES = "NAV_KONTAKTSENTER" | "NAV_DIGITALE_LOSNINGER" | "NAV_KONTOR";

type OutboundRosTilNavBase = {
  navn: string;
  telefonnummer: string;
  melding: string;
};

type OutboundRosTilNavExtend =
  | { hvemRoses: "NAV_KONTAKTSENTER" }
  | { hvemRoses: "NAV_DIGITALE_LOSNINGER" }
  | { hvemRoses: "NAV_KONTOR"; navKontor: string };

export type OutboundRosTilNav = OutboundRosTilNavBase & OutboundRosTilNavExtend;

const Ros = (props: RouteComponentProps) => {
  document.title = "Ros til NAV - www.nav.no";

  const [{ enheter }, dispatch] = useStore();
  const [loading, settLoading] = useState(false);
  const [error, settError] = useState();

  useEffect(() => {
    fetchEnheter()
      .then((enheter: Enheter[]) => {
        dispatch({ type: "SETT_ENHETER_RESULT", payload: enheter });
      })
      .catch((error: HTTPError) => {
        dispatch({ type: "SETT_ENHETER_ERROR", payload: error });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formConfig = {
    navn: {
      isRequired: "Navn er påkrevd"
    },
    telefonnummer: {
      isRequired: "Telefonnummer er påkrevd"
    },
    hvemRoses: {
      isRequired: "Du må velge hvem du skal gi ros til"
    },
    melding: {
      isRequired: "Melding er påkrevd"
    }
  };

  const navKontorConfig = {
    navKontor: {
      isRequired: "NAV-kontor er påkrevd"
    }
  };

  const send = (e: FormContext) => {
    const { isValid, fields } = e;
    const { navn, telefonnummer, melding } = fields;
    const hvemRoses: HVEM_ROSES = fields.hvemRoses;

    if (isValid) {
      const outboundBase = {
        navn,
        telefonnummer,
        melding
      };

      const outboundExtend: {
        [key in HVEM_ROSES]: OutboundRosTilNavExtend;
      } = {
        NAV_KONTAKTSENTER: { hvemRoses: "NAV_KONTAKTSENTER" },
        NAV_DIGITALE_LOSNINGER: { hvemRoses: "NAV_DIGITALE_LOSNINGER" },
        NAV_KONTOR: {
          hvemRoses: "NAV_KONTOR",
          navKontor: fields.navKontor ? fields.navKontor.label : undefined
        }
      };

      const outbound = {
        ...outboundBase,
        ...outboundExtend[hvemRoses]
      };

      console.log(outbound);
      settLoading(true);
      postRosTilNav(outbound)
        .then(() => {
          props.history.push(`${props.location.pathname}/takk`);
        })
        .catch((error: HTTPError) => {
          settError(`${error.code} - ${error.text}`);
        })
        .then(() => {
          settLoading(false);
        });
    }
  };

  return (
    <div className="pagecontent">
      <Tilbake to={urls.tilbakemeldinger.forside} />
      <Header title="Ros til NAV" />
      <div className="tb__veileder">
        <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
          Takk for at du vil dele din opplevelse med oss!
          <br />
          Vi sørger for at rosen kommer fram til riktig person.
        </Veilederpanel>
      </div>
      <Form onSubmit={send}>
        <Validation config={formConfig}>
          {({ errors, fields, submitted, setField, isValid }) => {
            return (
              <Box tittel={"Send inn ros til NAV"}>
                <InputNavn
                  bredde={"L"}
                  label={"Navn"}
                  value={fields.navn}
                  error={errors.navn}
                  onChange={v => setField({ navn: v })}
                  submitted={submitted}
                />
                <InputTelefon
                  bredde={"S"}
                  label={"Telefon"}
                  value={fields.telefonnummer}
                  error={errors.telefonnummer}
                  onChange={v => setField({ telefonnummer: v })}
                  submitted={submitted}
                />
                <SkjemaGruppe
                  title={"Hvem vil du gi ros til?"}
                  feil={
                    submitted && errors.hvemRoses
                      ? { feilmelding: errors.hvemRoses }
                      : undefined
                  }
                >
                  <Radio
                    label={"NAV Kontaktsenter"}
                    name={"NAV_KONTAKTSENTER"}
                    checked={fields.hvemRoses === "NAV_KONTAKTSENTER"}
                    onChange={() =>
                      setField({ hvemRoses: "NAV_KONTAKTSENTER" })
                    }
                  />
                  <Radio
                    label={"NAVs digitale tjenester"}
                    name={"NAV_DIGITALE_LOSNINGER"}
                    checked={fields.hvemRoses === "NAV_DIGITALE_LOSNINGER"}
                    onChange={() =>
                      setField({ hvemRoses: "NAV_DIGITALE_LOSNINGER" })
                    }
                  />
                  <Radio
                    label={"NAV-kontor"}
                    name={"NAV_KONTOR"}
                    checked={fields.hvemRoses === "NAV_KONTOR"}
                    onChange={() => setField({ hvemRoses: "NAV_KONTOR" })}
                  />
                  {fields.hvemRoses === "NAV_KONTOR" && (
                    <Validation config={navKontorConfig}>
                      {() => {
                        return (
                          <div className="ros-til-nav__navkontor">
                            <div className="ros-til-nav__label">
                              <Element>Velg NAV-kontor</Element>
                            </div>
                            {enheter.status === "RESULT" ? (
                              <Select
                                placeholder={
                                  "Skriv inn navnet eller velg med piltast"
                                }
                                classNamePrefix={
                                  submitted && errors.navKontor
                                    ? "ros-til-nav-feil"
                                    : "ros-til-nav"
                                }
                                value={fields.navKontor}
                                onChange={(
                                  v: ValueType<{
                                    value: string;
                                    label: string;
                                  }>
                                ) => setField({ navKontor: v })}
                                options={enheter.data
                                  .sort((a, b) =>
                                    a.enhetsnavn < b.enhetsnavn ? -1 : 1
                                  )
                                  .map(enhet => ({
                                    value: enhet.enhetsnummer,
                                    label: `${enhet.enhetsnavn} -  ${enhet.enhetsnummer}`
                                  }))}
                              />
                            ) : (
                              <div className="ros-til-nav__spinner">
                                <NavFrontendSpinner />
                              </div>
                            )}
                            {submitted && errors.navKontor && (
                              <div role="alert" aria-live="assertive">
                                <div className="skjemaelement__feilmelding">
                                  {errors.navKontor}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }}
                    </Validation>
                  )}
                </SkjemaGruppe>
                <div className="mellomrom">
                  <InputMelding
                    label={"Skriv din tilbakemelding her"}
                    submitted={submitted}
                    value={fields.melding}
                    error={errors.melding}
                    onChange={v => setField({ melding: v })}
                    maxLength={0}
                  />
                </div>
                {error && (
                  <AlertStripeFeil>Oi! Noe gikk galt: {error}</AlertStripeFeil>
                )}
                <div className="tb__knapper">
                  <div className="tb__knapp">
                    <Knapp
                      htmlType={"submit"}
                      type={"standard"}
                      disabled={loading || (submitted && !isValid)}
                    >
                      {loading ? <NavFrontendSpinner type={"S"} /> : "Send"}
                    </Knapp>
                  </div>
                  <div className="tb__knapp">
                    <Link to={urls.tilbakemeldinger.forside}>
                      <Knapp type={"flat"}>Tilbake</Knapp>
                    </Link>
                  </div>
                </div>
              </Box>
            );
          }}
        </Validation>
      </Form>
    </div>
  );
};
export default withRouter(Ros);
