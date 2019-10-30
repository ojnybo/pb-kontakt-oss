import React, { useState } from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "../../../assets/Veileder.svg";
import { Knapp } from "nav-frontend-knapper";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import InputNavn from "../../../components/input-fields/InputNavn";
import InputTelefon from "../../../components/input-fields/InputTelefon";
import InputMelding from "../../../components/input-fields/InputMelding";
import { postFeilOgMangler } from "../../../clients/apiClient";
import Tilbake from "../../../components/tilbake/Tilbake";
import { HTTPError } from "../../../components/error/Error";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";
import { FormContext, FormValidation } from "calidation";
import Header from "../../../components/header/Header";
import { urls } from "Config";
import Box from "../../../components/box/Box";
import { Radio, SkjemaGruppe } from "nav-frontend-skjema";
import InputField from "../../../components/input-fields/InputField";
import { FormattedHTMLMessage, FormattedMessage, useIntl } from "react-intl";
import MetaTags from "react-meta-tags";
import Takk from "../../../components/takk/Takk";

export interface OutboundFeilOgMangler {
  navn: string;
  telefonnummer: string;
  epost: string;
  feiltype: string;
  melding: string;
}

const FOM = (props: RouteComponentProps) => {
  const [loading, settLoading] = useState(false);
  const [success, settSuccess] = useState(false);
  const [error, settError] = useState();
  const intl = useIntl();

  const formConfig = {
    navn: {
      isRequired: intl.formatMessage({
        id: "validering.navn.pakrevd"
      })
    },
    epost: {
      isRequired: intl.formatMessage({
        id: "validering.epost.pakrevd"
      }),
      isEmail: intl.formatMessage({
        id: "validering.epost.gyldig"
      })
    },
    telefonnummer: {
      isRequired: intl.formatMessage({
        id: "validering.tlf.pakrevd"
      })
    },
    feiltype: {
      isRequired: intl.formatMessage({
        id: "validering.feiltype.pakrevd"
      })
    },
    melding: {
      isRequired: intl.formatMessage({
        id: "validering.melding.pakrevd"
      })
    }
  };

  const send = (e: FormContext) => {
    const { isValid, fields } = e;
    const { navn, telefonnummer, feiltype, melding } = fields;
    const { epost } = fields;

    if (isValid) {
      const outbound = {
        navn,
        epost,
        telefonnummer,
        feiltype,
        melding
      };

      console.log(outbound);
      settLoading(true);
      postFeilOgMangler(outbound)
        .then(() => {
          settSuccess(true);
        })
        .catch((error: HTTPError) => {
          settError(`${error.code} - ${error.text}`);
        })
        .then(() => {
          settLoading(false);
        });
    }
  };

  const tittel = intl.formatMessage({
    id: "tilbakemeldinger.feilogmangler.form.overskrift"
  });

  return (
    <div className="pagecontent">
      <MetaTags>
        <title>{intl.messages["seo.feilogmangler.tittel"]}</title>
        <meta
          name="description"
          content={intl.messages["seo.feilogmangler.description"] as string}
        />
      </MetaTags>
      <Tilbake to={urls.tilbakemeldinger.forside} />
      <Header
        title={intl.formatMessage({
          id: "tilbakemeldinger.feilogmangler.form.tittel"
        })}
      />
      <div className={"tb__veileder"}>
        <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
          <FormattedHTMLMessage
            id={"tilbakemeldinger.feilogmangler.form.veileder"}
          />
        </Veilederpanel>
      </div>
      <Box tittel={tittel}>
        {success ? (
          <Takk />
        ) : (
          <FormValidation onSubmit={send} config={formConfig}>
            {({ errors, fields, submitted, setField, isValid }) => (
              <>
                <InputNavn
                  bredde={"M"}
                  label={intl.formatMessage({
                    id: "felter.navn.tittel"
                  })}
                  value={fields.navn}
                  error={errors.navn}
                  onChange={v => setField({ navn: v })}
                  submitted={submitted}
                />
                <InputField
                  bredde={"L"}
                  label={intl.formatMessage({
                    id: "felter.epost.tittel"
                  })}
                  value={fields.epost}
                  error={errors.epost}
                  submitted={submitted}
                  onChange={v => setField({ epost: v })}
                />
                <InputTelefon
                  bredde={"S"}
                  label={intl.formatMessage({
                    id: "felter.tlf.tittel"
                  })}
                  value={fields.telefonnummer}
                  error={errors.telefonnummer}
                  onChange={v => setField({ telefonnummer: v })}
                  submitted={submitted}
                />
                <SkjemaGruppe
                  title={intl.formatMessage({
                    id: "felter.typefeil.tittel"
                  })}
                  feil={
                    submitted && errors.feiltype
                      ? { feilmelding: errors.feiltype }
                      : undefined
                  }
                >
                  <Radio
                    label={intl.formatMessage({
                      id: "felter.typefeil.tekniskfeil"
                    })}
                    name={"TEKNISK_FEIL"}
                    checked={fields.feiltype === "TEKNISK_FEIL"}
                    onChange={() => setField({ feiltype: "TEKNISK_FEIL" })}
                  />
                  <Radio
                    label={intl.formatMessage({
                      id: "felter.typefeil.feilinformasjon"
                    })}
                    name={"FEIL_INFO"}
                    checked={fields.feiltype === "FEIL_INFO"}
                    onChange={() => setField({ feiltype: "FEIL_INFO" })}
                  />
                  <Radio
                    label={intl.formatMessage({
                      id: "felter.typefeil.uu"
                    })}
                    name={"UNIVERSELL_UTFORMING"}
                    checked={fields.feiltype === "UNIVERSELL_UTFORMING"}
                    onChange={() =>
                      setField({ feiltype: "UNIVERSELL_UTFORMING" })
                    }
                  />
                </SkjemaGruppe>
                <div className="mellomrom">
                  <InputMelding
                    label={intl.formatMessage({
                      id: "felter.melding.tittel"
                    })}
                    submitted={submitted}
                    value={fields.melding}
                    error={errors.melding}
                    onChange={v => setField({ melding: v })}
                  />
                </div>
                {error && (
                  <AlertStripeFeil>
                    <FormattedMessage id={"felter.noegikkgalt"} /> {error}
                  </AlertStripeFeil>
                )}
                <div className="tb__knapper">
                  <div className="tb__knapp">
                    <Knapp
                      htmlType={"submit"}
                      type={"standard"}
                      disabled={loading || (submitted && !isValid)}
                    >
                      {loading ? (
                        <NavFrontendSpinner type={"S"} />
                      ) : (
                        <FormattedMessage id={"felter.send"} />
                      )}
                    </Knapp>
                  </div>
                  <div className="tb__knapp">
                    <Link to={urls.tilbakemeldinger.forside}>
                      <Knapp type={"flat"}>
                        <FormattedMessage id={"felter.tilbake"} />
                      </Knapp>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </FormValidation>
        )}
      </Box>
    </div>
  );
};
export default withRouter(FOM);
