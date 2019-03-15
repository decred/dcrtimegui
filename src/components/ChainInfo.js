import React from "react";
import styled from "styled-components";
import Transaction from "./Transaction";

const ChainInforWrapper = styled.div`
  padding: 1em;
  background: #f6f8f8;
  display: flex;
  flex-direction: column;
`;

const Field = styled.span`
  font-size: 12px;
  line-height: 1.5em;
  color: #3d5873;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChainInfo = ({ chaintimestamp, merklepath, merkleroot, transaction }) => {
  return (
    <ChainInforWrapper>
      <Field>
        <b>Timestamp: </b>
        {chaintimestamp}
      </Field>
      <Field>
        <b>Merkle root: </b>
        {merkleroot}
      </Field>
      <Field>
        <b>Transaction: </b>
        <Transaction txID={transaction} />
      </Field>
    </ChainInforWrapper>
  );
};

export default ChainInfo;
