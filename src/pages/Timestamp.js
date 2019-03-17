import React from "react";
import styled from "styled-components";
import TimestampForm from "../components/TimestampForm";

const Page = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const Timestamp = () => {
  return (
    <Page>
      <TimestampForm />
    </Page>
  );
};

export default Timestamp;
