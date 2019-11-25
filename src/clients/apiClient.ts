import Environment from "../Environments";
import { HTTPError } from "../components/error/Error";
import { logApiError, logEvent } from "../utils/logger";
import { OutboundRosTilNav } from "../pages/tilbakemeldinger/ros-til-nav/Ros";
import { OutboundFeilOgMangler } from "../pages/tilbakemeldinger/feil-og-mangler/FeilOgMangler";
import { OutboundServiceKlage } from "../pages/tilbakemeldinger/service-klage/ServiceKlage";
import { OutboundBestillingAvSamtale } from "../pages/samisk/bestilling-av-samtale/BestillingAvSamtale";
import { BadRequest } from "../types/errors";
const { baseUrl, apiUrl, personInfoApiUrl } = Environment();

/*
    GET
 */

const hentJson = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    credentials: "include"
  })
    .then(response => sjekkForFeil(url, response))
    .then(parseJson)
    .catch((err: string & HTTPError) => {
      const error = {
        code: err.code || 404,
        text: err.text || err
      };
      logApiError(url, error);
      throw error;
    });

export const fetchEnheter = () => hentJson(`${apiUrl}/enheter`);
export const fetchFodselsnr = () => hentJson(`${apiUrl}/fodselsnr`);

/*
    POST
 */

type Outbound =
  | OutboundRosTilNav
  | OutboundFeilOgMangler
  | OutboundServiceKlage
  | OutboundBestillingAvSamtale;

const sendJson = (url: string, data: Outbound) => {
  console.log(url, data);
  logEvent({ url });
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    credentials: "include"
  })
    .then(response => sjekkForFeil(url, response))
    .then(parseJson)
    .catch((err: string & HTTPError) => {
      const error = {
        code: err.code || 404,
        text: err.text || err
      };
      logApiError(url, error);
      throw error;
    });
};

export const fetchAuthInfo = () =>
  hentJson(`${baseUrl}/innloggingslinje-api/auth`);

export const fetchKontaktInfo = () =>
  hentJson(`${personInfoApiUrl}/kontaktinformasjon`);

export const postRosTilNav = (data: OutboundRosTilNav) =>
  sendJson(`${apiUrl}/mottak/ros`, data);

export const postServiceKlage = (data: OutboundServiceKlage) =>
  sendJson(`${apiUrl}/mottak/serviceklage`, data);

export const postFeilOgMangler = (data: OutboundFeilOgMangler) =>
  sendJson(`${apiUrl}/mottak/feil-og-mangler`, data);

export const postSamiskBestillSamtale = (data: OutboundBestillingAvSamtale) =>
  sendJson(`${apiUrl}/mottak/bestilling-av-samtale`, data);

export const fetchServerTidOffset = (callback: Function) => {
  fetch(baseUrl, { method: "HEAD" })
    .then(res => {
      const date = res.headers.get("date");
      if (!date) {
        console.log("Couldn't fetch server time!");
        callback(0);
        return;
      }
      callback(Date.parse(date) - Date.now());
    })
    .catch(e => console.log(e));
};

/*
    Utils
 */

const parseJson = (data: any) => data.json();
const sjekkForFeil = async (url: string, response: Response) => {
  if (response.ok) {
    return response;
  } else {
    const error = {
      code: response.status,
      text:
        response.status === 400
          ? await parseJson(response).then((data: BadRequest) => data.message)
          : response.statusText
    };
    throw error;
  }
};
