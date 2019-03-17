import React from "react";
import styled from "styled-components";
import Card from "./lib/Card";
import Spinner from "./lib/Spinner";
import Checkmark from "./lib/Checkmark";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  max-width: 780px;
  flex-direction: column;
`;

const LoadingItemWrapper = styled(Card)`
  font-size: 18px;
  padding: 2em;
  display: flex;
  width: calc(100% - 4em);
  color: #3d5873;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const LoadingItem = ({ message, loading }) => (
  <LoadingItemWrapper>
    <span>{message}</span>
    {loading ? <Spinner /> : <Checkmark />}
  </LoadingItemWrapper>
);

const LoadingResults = ({
  verifyLoading,
  verified,
  timestampLoading,
  timestamped,
  loadingChainVerify,
  chainVerified
}) => {
  return (
    <Wrapper>
      {verifyLoading || verified ? (
        <LoadingItem
          message={verified ? "Digests verified" : "Verifying digests"}
          loading={verifyLoading}
        />
      ) : null}
      {timestampLoading || timestamped ? (
        <LoadingItem
          message={
            timestamped ? "Uploaded new digests" : "Uploading new digests"
          }
          loading={timestampLoading}
        />
      ) : null}
    </Wrapper>
  );
};

export default LoadingResults;
