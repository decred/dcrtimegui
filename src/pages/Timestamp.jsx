import React from "react";
import TimestampForm from "src/components/TimestampForm";
import Page from "src/components/Layout/Page";
import Title from "src/components/Title";

const Timestamp = () => (
  <Page>
    <Title title="Create new hash" />
    <TimestampForm />
  </Page>
);

export default Timestamp;
