import React, { useEffect, useState } from "react";
import qs from "query-string";
import {
  mergeFilesAndResult,
  getNotAnchoredFiles,
  getDigests,
  timestamp,
  verify
} from "../helpers/dcrtime";
import LoadingResults from "../components/LoadingResults";
import FileList from "../components/FileList";
import ModalResultsInfo from "../components/ModalResultsInfo";
import Page from "../components/layout/Page";
import Title from "./Title";

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
  const [error, setError] = useState(false);

  useEffect(() => {
    async function handleProcessFiles(files, shouldTimestamp) {
      try {
        // verify digests against dcrtime
        const verifyRes = await handleVerifyData(files);
        if (verifyRes.error) {
          throw new Error("Invalid array of digests");
        }
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
          const tsRes = await handleTimestampData(notTimestampedFiles);
          const tsFiles = mergeFilesAndResult(notTimestampedFiles, tsRes);
          setFiles(files => updateFiles(files, tsFiles));
        }
        setDone(true);
      } catch (e) {
        setError(e);
      }
    }

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
  }, [location.search]);

  const handleVerifyData = async data => {
    const digests = getDigests(data);
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

  const handleTimestampData = async data => {
    const digests = getDigests(data);
    setLoadingTimestamp(true);
    try {
      const res = await timestamp(digests, "data");
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
      <Title title="Results" modal={ModalResultsInfo} />
      {!done ? (
        <LoadingResults
          verifyLoading={verifyLoading}
          verified={verified}
          timestampLoading={timestampLoading}
          timestamped={timestamped}
        />
      ) : (
        <FileList files={files} />
      )}
    </Page>
  );
};

export default Results;
