import React from "react";
import styled from "styled-components";
import TimestampForm from "../components/TimestampForm";

const Page = styled.main`
  width: calc(100% - 20px);
  display: flex;
  justify-content: center;
  padding: 10px;
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
