import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Systemtittel } from "nav-frontend-typografi";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import ChatbotWrapper from "./ChatbotWrapper";
import { Hovedknapp } from "nav-frontend-knapper";
import Config from "../../Config";
import PanelBase from "nav-frontend-paneler";
import { fetchServerTidOffset } from "../../clients/apiClient";
import { logEvent } from "../../utils/logger";
import ApningstiderAvvik from "../../components/apningstider/ApningstiderAvvik";
import { useStore } from "../../providers/Provider";
import { ChatTema, Kanal } from "../../types/kanaler";
import { chatTemaSideData } from "./data/chatTemasideData";
import { chatApningstider } from "./data/chatApningtider";
import { chatConfig } from "./data/chatConfig";
import { Language } from "../../utils/sanity/serializers";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";
import { NavContentLoader } from "../../components/content-loader/NavContentLoader";
import { VarselVisning } from "../../components/varsler/VarselVisning";
import { SanityVarsel } from "../../components/varsler/SanityVarsel";
import { Varsel } from "../../components/varsler/Varsel";

type Props = {
  chatTema: ChatTema,
};

const cssPrefix = "chat-tema";

const ChatTemaside = ({ chatTema }: Props) => {
  const [chatButtonClickedTimestamp, setChatButtonClickedTimestamp] = useState();
  const [serverTidOffset, setServerTidOffset] = useState(0);
  const [{ themes, channels }] = useStore();
  const intl = useIntl();

  const startChat = chatTema === ChatTema.EURES
    ? () => window.location.assign(Config.urls.chat.eures.chat)
    : () => setChatButtonClickedTimestamp(Date.now());

  const { harChatbot, tittelId, grafanaId } = chatTemaSideData[chatTema];
  const temaProps = themes.props[chatTema];
  const channelProps = channels.props[Kanal.Chat];
  const isLoaded = themes.isLoaded && channels.isLoaded;
  const isClosed = (channelProps.status && channelProps.status.closed)
    || (temaProps.status && temaProps.status.closed);
  const closedMsg = (temaProps.status && temaProps.status.message)
    || (channelProps.status && channelProps.status.message);

  const text = temaProps.page;
  const tittel = (text && text.title && text.title[Language.Bokmaal])
    || intl.formatMessage({ id: tittelId });
  const ingress = text && <SanityBlocks blocks={text.content} />;

  const documentTitle = `${tittel} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  useEffect(() => {
    fetchServerTidOffset(setServerTidOffset);
  }, []);
  const apningsTider = chatApningstider[chatTema];
  const chatErIApningstid = apningsTider
    ? apningsTider.isOpenNow(serverTidOffset)
    : true;
  const chatErNormaltApen = chatErIApningstid || harChatbot;
  const chatVeilederStengtAvAdmin = isClosed && chatErIApningstid;
  const chatErApen = (chatErNormaltApen && !chatVeilederStengtAvAdmin) || harChatbot;

  const chatClientConfig = chatConfig.tema[chatTema];

  useEffect(() => {
    const harStartParameter = window.location.search.includes("start");
    if (harStartParameter && chatErApen) {
      startChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`${cssPrefix} pagecontent`}>
        <BreadcrumbsWrapper />
        <PanelBase className={cssPrefix}>
          <div className={`${cssPrefix}__header`}>
            <Systemtittel>
              {tittel}
            </Systemtittel>
          </div>
          <div className={`${cssPrefix}__panel-ingress`}>
            <VarselVisning kanal={Kanal.Chat}>
              <>
                {!chatErNormaltApen && <Varsel tekstId={"chat.stengt.info"} type={"info"} />}
                {chatVeilederStengtAvAdmin && closedMsg && <SanityVarsel localeBlock={closedMsg} type={"info"} />}
              </>
            </VarselVisning>
            {(isLoaded) ? ingress
              : <NavContentLoader lines={5} />}
          </div>
          {apningsTider && (
            <ApningstiderAvvik
              apningstider={apningsTider}
              harChatbot={harChatbot}
            />
          )}
          <div className={`${cssPrefix}__panel-start-knapp`}>
            <Hovedknapp
              htmlType={"button"}
              onClick={() => {
                logEvent({ event: grafanaId });
                startChat();
              }}
              disabled={!chatErApen || !isLoaded}
            >
              <FormattedMessage id={chatErApen ? "chat.knapp.start" : "chat.knapp.stengt"} />
            </Hovedknapp>
          </div>
        </PanelBase>
      </div>
      {chatClientConfig && (
        <ChatbotWrapper
          config={chatClientConfig}
          openChatTimestamp={chatButtonClickedTimestamp}
        />
      )}
    </>
  );
};

export default ChatTemaside;
