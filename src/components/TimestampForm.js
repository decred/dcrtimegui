import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Card from "./lib/Card";
import Button from "./lib/Button";
import Expandable from "./lib/Expandable";
import FileInput from "./FileInput";

const Title = styled.h1`
  color: #3d5873;
  font-size: 2.25em;
`;

const Description = styled.p`
  color: #8997a5;
  font-size: 0.75em;
  max-width: 600px;
  text-align: justify;
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

const SubmitWrapper = styled.div`
  width: 100%;
  text-align: center;
  @media (min-width: 768px) {
    text-align: right;
  }
`;

const TechnicalDetailsButton = styled.span`
  cursor: pointer;
  font-size: 0.75em;
  color: #2970ff;
`;

const TimestampForm = ({ history }) => {
  const [files, setFiles] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    const digests = files.map(file => file.digest);
    const names = files.map(file => file.name);
    history.push(
      `results?digests=${digests.toString()}&names=${names.toString()}&timestamp=true`
    );
  };
  const handleExpandDetails = () => {
    setDetailsOpen(!detailsOpen);
  };
  const cardHeight = files && files.length ? "auto" : "400px";
  return (
    <Card style={{ height: cardHeight }}>
      <Form>
        <Title>Timestamp</Title>
        <Description>
          This free service uses the Decred blockchain to time-anchor arbitrary
          files, which demonstrates a particular file existed at or before the
          time it was anchored. A hash of each submitted file is calculated and
          sent to a dcrtime server, which aggregates these hashes, organizes
          them into a merkle tree, hashes that tree down to a merkle root, and
          anchors that merkle root in the Decred blockchain once an hour.
        </Description>
        <Expandable
          style={{ maxWidth: "600px" }}
          expanded={detailsOpen}
          triggerComponent={
            <TechnicalDetailsButton onClick={handleExpandDetails}>
              {detailsOpen ? "Hide" : "Show"} Technical Details{" "}
            </TechnicalDetailsButton>
          }
        >
          <Description style={{ padding: "1em" }}>
            This service, dcrtime and Decred use the sha256 hash function.
            Submitted files have their hashes checked against
            previously-submitted files, and if the file hash has already been
            submitted, you will see information about that file. The state of
            each anchored file can be either “Pending”, indicating the file hash
            has been submitted to dcrtime and is waiting to be anchored, or
            “Anchored”, indicating the file hash has been anchored in the Decred
            blockchain, or "Not anchored", indicating the file hash has not been
            submitted to dcrtime yet. Anchored hashes have a corresponding
            inclusion proof, which is a merkle path from the file hash to the
            anchored merkle root, and this proof can be downloaded and
            independently verified using a copy of the Decred blockchain or a
            blockchain explorer.
          </Description>
        </Expandable>
        <FileInput files={files} setFiles={setFiles} />
        {files && files.length ? (
          <SubmitWrapper>
            <Button onClick={handleSubmit} type="submit">
              Timestamp files
            </Button>
          </SubmitWrapper>
        ) : null}
      </Form>
    </Card>
  );
};

export default withRouter(TimestampForm);
