import React, { useState } from "react";
import VisMer from "./FAQLenkerVisMer";
import { FormattedMessage } from "react-intl";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-faq-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenkeMedChevron";
import { useStore } from "../../../providers/Provider";
import { Language } from "../../../utils/sanity/serializers";
import { lenkerFAQDefault } from "./FAQDefaultLenker";
import { NavContentLoader } from "../../../components/content-loader/NavContentLoader";

const language = Language.Bokmaal;

const FAQ = () => {
  const [visFlereFAQ, settVisFlereFAQ] = useState(false);
  const toggleVisFlereFAQ = () => settVisFlereFAQ(!visFlereFAQ);
  const visElementer = 3;
  const [{ faq }] = useStore();
  const lenkerFraSanity = faq.faqLenker.length > 0 && faq.faqLenker;
  const lenkerFAQ = lenkerFraSanity || lenkerFAQDefault;

  const tittel = <FormattedMessage id={"faq.intro"} />;

  const innhold = (
    <>
      {lenkerFAQ
        .slice(0, visFlereFAQ ? lenkerFAQ.length : visElementer)
        .map(({ lenke, tittel }) => {
          return (
            <RouterLenke
              href={lenke[language]}
              className={"lenke__avstand-under"}
              isExternal={true}
              key={tittel[language]}
            >
              {lenkerFraSanity ? tittel[language] : <FormattedMessage id={tittel[Language.Bokmaal]} />}
            </RouterLenke>
          );
        })
      }
      {lenkerFAQ.length > visElementer && (
        <VisMer visFlere={visFlereFAQ} onClick={toggleVisFlereFAQ} />
      )}
    </>
  );

  return (
    <IkonPanel ikon={ikon} tittel={tittel} className={"faq"}>
      {faq.isLoaded ? innhold : <NavContentLoader lines={6} />}
    </IkonPanel>
  );
};

export default FAQ;
