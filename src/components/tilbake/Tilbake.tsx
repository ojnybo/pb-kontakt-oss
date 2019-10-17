import React from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
}

const Tilbake = (props: Props) => (
  <div className="mellomrom lenke">
    <Link to={props.to}>Tilbake</Link>
  </div>
);

export default Tilbake;
