import React from "react";
import styled from "styled-components";
import { Card } from "pi-ui";
import FileList from "./FileList";

const Title = styled.h1`
  color: #3d5873;
  font-size: 2.25em;
`;

const TitleCard = styled(Card)`
  font-size: 18px;
  line-height: 1.5em;
  text-align: center;
  padding: 2em;
  padding-bottom: 0;
  width: calc(100% - 4em);
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Description = styled.p`
  color: #8997a5;
  font-size: 0.75em;
  max-width: 600px;
  text-align: justify;
`;

const Wrapper = styled.div`
  max-width: 780px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Link = styled.a`
  font-size: 10px;
  line-height: 2em;
  text-decoration: none;
  color: #2970ff;

  &:visited {
    color: #2970ff;
  }
`;

const DisplayResults = ({ files }) => (
  <Wrapper>
    <TitleCard>
      <Link href="/">← Timestamp more files</Link>
      <Title>Results</Title>
      <Description>
        The files sent to dcrtime can be either: <br />
        <b>Anchored:</b> the digest of the file and other files digests sent in
        the same hour range were compiled into a merkle root which is already
        stored in the chain. <br />
        <b>Pending:</b> the digest of the file is stored in the dcrtime server
        and it should be anchored within the next hour. <br />
        <b>Not Anchored:</b> the digest of the file is not stored in the dcrtime
        server.
      </Description>
    </TitleCard>
    <FileList files={files} />
  </Wrapper>
);

export default DisplayResults;
