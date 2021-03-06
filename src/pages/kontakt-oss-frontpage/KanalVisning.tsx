import { Normaltekst } from "nav-frontend-typografi";
import { Language } from "../../utils/sanity/serializers";
import React from "react";
import { useStore } from "../../providers/Provider";
import { Kanal } from "../../types/kanaler";
import { SanityBlocks } from "../../components/sanity-blocks/SanityBlocks";
import { NavContentLoader } from "../../components/content-loader/NavContentLoader";

type Props = {
  kanal: Kanal;
  visHvisStengt?: boolean;
  children: JSX.Element;
};

export const KanalVisning = ({ kanal, visHvisStengt, children }: Props) => {
  const [{ channels }] = useStore();
  if (!channels.isLoaded) {
    return <NavContentLoader lines={3} />;
  }

  const channelProps = channels.props[kanal];

  const { answer_time, status, description } = channelProps;
  const svartid = answer_time && answer_time[Language.Bokmaal];
  const closed = status && status.closed;
  const closedMsg = status && status.message;

  return (
    <>
      {svartid && !closed && (
        <Normaltekst className="svartid">
          {svartid}
        </Normaltekst>
      )}
      {description && <SanityBlocks blocks={description} />}
      {closed && <SanityBlocks blocks={closedMsg} />}
      {(!closed || visHvisStengt) && children}
    </>
  );
};
