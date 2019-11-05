import React from "react";
import TimestampForm from "src/components/TimestampForm";
import ModalNewDigestInfo from "src/components/ModalNewDigestInfo";
import Page from "src/components/layout/Page";
import Title from "./Title";

const Timestamp = () => (
  <Page>
    <Title title="Create new digest" modal={ModalNewDigestInfo} />
    <TimestampForm />
  </Page>
);

export default Timestamp;
