import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Element } from "nav-frontend-typografi";
import Veileder from "nav-frontend-veileder";
import VeilederIcon from "../../assets/Veileder.svg";

const ColorBar = (props: RouteComponentProps) =>
  props.location.pathname === "/" ? (
    <div className="header header__frontpage">
      <div className="header__icon">
        <Veileder
          tekst="Hei! Vi vil gjerne høre om opplevelsen din!"
          posisjon="topp"
        >
          <img src={VeilederIcon} alt="Veileder" />
        </Veileder>
      </div>
    </div>
  ) : (
    <div className="header">
      <Element>Tilbakemelding på service</Element>
    </div>
  );
export default withRouter(ColorBar);
