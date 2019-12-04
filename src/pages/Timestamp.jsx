import React from "react";
import TimestampForm from "src/components/TimestampForm";
import ModalNewDigestInfo from "src/components/ModalNewDigestInfo";
import Page from "src/components/Layout/Page";
import Title from "src/components/Title";

const Timestamp = () => (
  <Page>
    <Title title="Create new digest" modal={ModalNewDigestInfo} />
    <TimestampForm />
  </Page>
);

export default Timestamp;
