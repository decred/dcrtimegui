import React, { useState } from "react";
import styled, { css } from "styled-components";
import Card from "./lib/Card";
import Button from "./lib/Button";
import FileInput from "./FileInput";

const Title = styled.h1`
  color: #3d5873;
  font-size: 2.25em;
`;

const Description = styled.p`
  color: #8997a5;
  font-size: 0.75em;
  max-width: 600px;
`;

const Form = styled.form`
  font-size: 18px;
  line-height: 1.5em;
  padding: 2em;
  text-align: center;
  max-width: 780px;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const SubmitCard = styled(Card)`
  position: fixed;
  bottom: -88px;
  left: 0;
  width: calc(100% - 2em);
  padding: 1em;
  background: #f9fafa;
  box-shadow: 1px 2px 10px 1px #8997a5;
  display: flex;
  justify-content: center;
  transition: transform 300ms ease-in-out;

  ${props =>
    props.isOpen &&
    css`
      transform: translate(0, -88px);
    `}

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

const TimestampForm = ({}) => {
  const [files, setFiles] = useState([]);
  return (
    <Card>
      <Form>
        <Title>Timestamp</Title>
        <Description>
          The timestamp service allows you to create a Proof-of-Existence of a
          given file. A digital signature of the files are calculated and sent
          to the Dcrtime server which hourly will anchor the signatures in the
          Decred blockchain.
        </Description>
        <FileInput files={files} setFiles={setFiles} />
        <SubmitCard isOpen={files && files.length}>
          <Button type="submit">Timestamp files</Button>
        </SubmitCard>
      </Form>
    </Card>
  );
};

export default TimestampForm;
