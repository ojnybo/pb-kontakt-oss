import React, { useState } from "react";
import { Undertittel } from "nav-frontend-typografi";
import Box from "components/box/Box";
import Lenke from "nav-frontend-lenker";
import { lenkerFAQ, lenkerMinSide } from "./FAQLenker";
import VisMer from "./FAQLenkerVisMer";
import { FormattedMessage } from "react-intl";

const FAQ = () => {
  const [visFlereFAQ, settVisFlereFAQ] = useState(false);
  const [visFlereMinside, settVisFlereMinside] = useState(false);
  const toggleVisFlereFAQ = () => settVisFlereFAQ(!visFlereFAQ);
  const toggleVisFlereMinSide = () => settVisFlereMinside(!visFlereMinside);
  const visElementer = 2;

  return (
    <Box>
      <div className={"box__section"}>
        <div className={"box__section-title"}>
          <Undertittel className="box__title">
            <FormattedMessage id={"faq.intro"} />
          </Undertittel>
        </div>
        <div className={"box__section-description"}>
          {lenkerFAQ
            .slice(0, visFlereFAQ ? lenkerFAQ.length : visElementer)
            .map(({ lenke, lenkeTekst }) => (
              <div key={lenkeTekst} className={"faq__lenke"}>
                <Lenke href={lenke}>
                  <FormattedMessage id={lenkeTekst} />
                </Lenke>
              </div>
            ))}
          {lenkerFAQ.length > visElementer && (
            <VisMer visFlere={visFlereFAQ} onClick={toggleVisFlereFAQ} />
          )}
        </div>
      </div>
      <div className={"box__section"}>
        <div className={"box__section-title"}>
          <Undertittel className="box__title">
            <FormattedMessage id={"faq.minside"} />
          </Undertittel>
        </div>
        <div className={"box__section-description"}>
          {lenkerMinSide
            .slice(0, visFlereMinside ? lenkerMinSide.length : visElementer)
            .map(({ lenke, lenkeTekst }) => (
              <div key={lenkeTekst} className={"faq__lenke"}>
                <Lenke href={lenke}>
                  <FormattedMessage id={lenkeTekst} />
                </Lenke>
              </div>
            ))}
          {lenkerFAQ.length > visElementer && (
            <VisMer
              visFlere={visFlereMinside}
              onClick={toggleVisFlereMinSide}
            />
          )}
        </div>
      </div>
    </Box>
  );
};

export default FAQ;
