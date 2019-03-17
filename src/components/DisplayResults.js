import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./lib/Card";
import Selector from "./lib/Selector";
import FileList from "./FileList";
import {
  getAnchoredFiles,
  getPendingFiles,
  getNotAnchoredFiles
} from "../helpers/dcrtime";

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
  text-align: left;
`;

const Wrapper = styled.div`
  max-width: 780px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ANCHORED_OPTION = 1;
const PENDING_OPTION = 2;
const NOT_ANCHORED_OPTION = 3;

const getOptions = files => {
  let options = [];

  const addOption = option => {
    options = options.concat([option]);
  };

  const anchoredFiles = getAnchoredFiles(files);
  const pendingFiles = getPendingFiles(files);
  const notAnchoredFiles = getNotAnchoredFiles(files);

  if (anchoredFiles.length) {
    addOption({
      value: ANCHORED_OPTION,
      label: "Anchored",
      count: anchoredFiles.length
    });
  }

  if (pendingFiles.length) {
    addOption({
      value: PENDING_OPTION,
      label: "Pending",
      count: pendingFiles.length
    });
  }

  if (notAnchoredFiles.length) {
    addOption({
      value: NOT_ANCHORED_OPTION,
      label: "Not Anchored",
      count: notAnchoredFiles.length
    });
  }

  return options;
};

const DisplayResults = ({ files }) => {
  const [selectedOption, setOption] = useState(1);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const options = getOptions(files);
    setOption(options[0].value);
    setOptions(options);
  }, []);
  const getFilesToDisplay = () => {
    switch (selectedOption) {
      case ANCHORED_OPTION:
        return getAnchoredFiles(files);
      case PENDING_OPTION:
        return getPendingFiles(files);
      case NOT_ANCHORED_OPTION:
        return getNotAnchoredFiles(files);
      default:
        break;
    }
  };
  const filesdp = getFilesToDisplay(files);
  return (
    <Wrapper>
      <TitleCard>
        <Title>Results</Title>
        <Description>
          The files sent to dcrtime can be either: <br />
          <b>Anchored:</b> the digest of the file and other files digests sent
          in the same hour range were compiled into a merkle root which is
          already stored in the chain. <br />
          <b>Pending:</b> the digest of the file is stored in the dcrtime server
          and it should be anchored within the next hour.
        </Description>
        <Selector
          options={options}
          value={selectedOption}
          onSelect={setOption}
        />
      </TitleCard>
      <FileList files={filesdp} />
    </Wrapper>
  );
};

export default DisplayResults;
