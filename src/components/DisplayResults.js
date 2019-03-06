import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./lib/Card";
import Selector from "./lib/Selector";
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
  text-align: left;
`;

const Wrapper = styled.div`
  max-width: 780px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const VERIFIED_OPTION = 0;
const UPLOADED_OPTION = 1;

const getOptions = (tsFiles, verifyFiles) => {
  let options = [];

  if (verifyFiles.length) {
    options = options.concat([
      {
        value: VERIFIED_OPTION,
        label: "Verified Digests",
        count: verifyFiles.length
      }
    ]);
  }

  if (tsFiles.length) {
    options = options.concat([
      {
        value: UPLOADED_OPTION,
        label: "Uploaded Digests",
        count: tsFiles.length
      }
    ]);
  }

  return options;
};

const DisplayResults = ({ timestampedFiles, verifiedFiles }) => {
  const [selectedOption, setOption] = useState(0);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const options = getOptions(timestampedFiles, verifiedFiles);
    setOption(options[0].value);
    setOptions(options);
  }, []);
  console.log(timestampedFiles, verifiedFiles);
  const getFilesToDisplay = () => {
    switch (selectedOption) {
      case VERIFIED_OPTION:
        return verifiedFiles;
      case UPLOADED_OPTION:
        return timestampedFiles;
      default:
        break;
    }
  };
  return (
    <Wrapper>
      <TitleCard>
        <Title>Results</Title>
        <Description>
          <b>Verified digests:</b> digest was in the server and may be anchored
          already. <br />
          <b>Uploaded digests:</b> digest was just added to the server and
          should be anchored within the next hour.
        </Description>
        <Selector
          options={options}
          value={selectedOption}
          onSelect={setOption}
        />
      </TitleCard>
      <FileList files={getFilesToDisplay()} />
    </Wrapper>
  );
};

export default DisplayResults;
