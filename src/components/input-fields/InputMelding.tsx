import { Textarea, TextareaProps } from "nav-frontend-skjema";
import React, { SyntheticEvent, useState } from "react";
import { FormattedMessage } from "react-intl";
import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";

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
      <div className={"skjema__legend"}>{label}</div>
      <div className={"felter__melding-advarsel"}>
        <AlertStripeAdvarsel>
          <FormattedMessage id={"felter.melding.beskrivelse"} />
        </AlertStripeAdvarsel>
      </div>
      <Textarea
        label={""}
        required={true}
        value={value}
        onChange={(e: SyntheticEvent<EventTarget, Event>) => {
          if (e.target instanceof HTMLTextAreaElement) {
            props.onChange(e.target.value);
          }
        }}
        feil={error && (blur || submitted) ? { feilmelding: error } : undefined}
        onBlur={() => settBlur(true)}
        maxLength={0}
      />
    </div>
  );
};

export default InputMelding;
