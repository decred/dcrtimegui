import React from "react";
import styled from "styled-components";
import { DCRDATA_URL } from "../constants";

const TransactionWrapper = styled.a``;

const Transaction = ({ txID }) => (
  <TransactionWrapper
    rel="nofollow noopener noreferrer"
    target="_blank"
    href={`${DCRDATA_URL}/tx/${txID}`}
  >
    {txID}
  </TransactionWrapper>
);

export default Transaction;
