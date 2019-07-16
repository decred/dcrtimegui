import React, { useEffect, useState } from "react";
import styled from "styled-components";
import qs from "query-string";
import {
  mergeFilesAndResult,
  getNotAnchoredFiles,
  getFilesDigests,
  timestamp,
  verify
} from "../helpers/dcrtime";
import LoadingResults from "../components/LoadingResults";
import DisplayResults from "../components/DisplayResults";

const Page = styled.main`
  width: calc(100% - 20px);
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const updateFiles = (files, newFiles) =>
  files.map(file => {
    const newFile = newFiles.filter(nf => nf.digest === file.digest)[0];
    return newFile || file;
  });

const Results = ({ location }) => {
  const [files, setFiles] = useState([]);
  const [verifyLoading, setLoadingVerify] = useState(false);
  const [verified, setVerified] = useState(false);
  const [timestampLoading, setLoadingTimestamp] = useState(false);
  const [timestamped, setTimestamped] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // get query string parameters
    const {
      digests: strDigests,
      names: strNames,
      timestamp: strTimestamp
    } = qs.parse(location.search);
    // parse digests and names from query parameters
    const digests = strDigests.split(",");
    const names = strNames ? strNames.split(",") : [];
    const shouldTimestamp = strTimestamp === "true";

    // file names are set from the query param if existent otherwise the
    // digest is used as the name
    const files = digests.map((d, i) => ({
      name: names[i] || d,
      digest: d
    }));

    // start the files processing
    handleProcessFiles(files, shouldTimestamp);
  }, [handleProcessFiles, location.search]);

  const handleProcessFiles = async (files, shouldTimestamp) => {
    try {
      // verify digests against dcrtime
      const verifyRes = await handleVerifyFiles(files);
      const verifiedFiles = mergeFilesAndResult(files, verifyRes);
      setFiles(verifiedFiles);

      // differentiate between digests already sent to the server and the
      // ones which were not sent yet
      const notTimestampedFiles = getNotAnchoredFiles(verifiedFiles);

      // apply the timestamp to the digests which were not found in the server
      // if 'shouldTimestamp' is true
      if (
        shouldTimestamp &&
        notTimestampedFiles &&
        notTimestampedFiles.length
      ) {
        const tsRes = await handleTimestampFiles(notTimestampedFiles);
        const tsFiles = mergeFilesAndResult(notTimestampedFiles, tsRes);
        setFiles(files => updateFiles(files, tsFiles));
      }
      setDone(true);
    } catch (e) {
      setError(e);
    }
  };

  const handleVerifyFiles = async files => {
    const digests = getFilesDigests(files);
    setLoadingVerify(true);
    try {
      const res = await verify(digests);
      setLoadingVerify(false);
      setVerified(true);
      return res;
    } catch (e) {
      setLoadingVerify(false);
      throw e;
    }
  };

  const handleTimestampFiles = async files => {
    const digests = getFilesDigests(files);
    setLoadingTimestamp(true);
    try {
      const res = await timestamp(digests, "files");
      setLoadingTimestamp(false);
      setTimestamped(true);
      return res;
    } catch (e) {
      setLoadingTimestamp(false);
      throw e;
    }
  };

  if (error) throw error;

  return (
    <Page>
      {!done ? (
        <LoadingResults
          verifyLoading={verifyLoading}
          verified={verified}
          timestampLoading={timestampLoading}
          timestamped={timestamped}
        />
      ) : (
        <DisplayResults files={files} />
      )}
    </Page>
  );
};

export default Results;
