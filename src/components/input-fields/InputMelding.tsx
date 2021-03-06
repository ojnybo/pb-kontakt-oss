import { TextareaControlled, TextareaProps } from "nav-frontend-skjema";
import React, { KeyboardEvent, useState } from "react";
import { FormattedHTMLMessage } from "react-intl";
import { vars } from "../../Config";
import { Varsel } from "../varsler/Varsel";

interface Props extends Omit<TextareaProps, "onChange"> {
  onChange: (value: string) => void;
  error: string | null;
  submitted: boolean;
  value: string;
}

const InputMelding = (props: Props) => {
  const [blur, settBlur] = useState(false);
  const { error, value, label, submitted } = props;
  return (
    <div>
      <div className={"skjemagruppe__legend"}>{label}</div>
      <div className={"felter__melding-advarsel"}>
        <Varsel type={"advarsel"}>
          <FormattedHTMLMessage id={"felter.melding.beskrivelse"} />
        </Varsel>
      </div>
      <TextareaControlled
        label={""}
        required={true}
        value={value}
        defaultValue={""}
        maxLength={vars.maksLengdeMelding}
        feil={error && (blur || submitted) ? error : undefined}
        onBlur={() => settBlur(true)}
        onKeyUp={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.target instanceof HTMLTextAreaElement) {
            props.onChange(e.target.value);
          }
        }}
      />
    </div>
  );
};

export default InputMelding;
