import React from "react";
import TimestampForm from "../components/TimestampForm";
import ModalNewDigestInfo from "../components/ModalNewDigestInfo";
import Page from "../components/layout/Page";
import Title from "./Title";

const Timestamp = () => (
  <Page>
    <Title title="Create new digest" modal={ModalNewDigestInfo} />
    <TimestampForm />
  </Page>
);

export default Timestamp;
