import React, { useEffect, useState } from "react";
import styled from "styled-components";
import qs from "query-string";
import { timestampFiles, verifyFiles } from "../services/api";
import {
  mergeFilesAndVerifyResult,
  mergeFilesAndAuthResult,
  filterFilesByVerifiedStatus,
  getFilesDigests
} from "../helpers/bytes";
import LoadingResults from "../components/LoadingResults";
import DisplayResults from "../components/DisplayResults";

const Page = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 40px;
`;

const Results = ({ location }) => {
  const [verifiedFiles, setVerifiedFiles] = useState([]);
  const [timestampedFiles, setTimestampedFiles] = useState([]);
  const [verifyLoading, setLoadingVerify] = useState(false);
  const [verified, setVerified] = useState(false);
  const [timestampLoading, setLoadingTimestamp] = useState(false);
  const [timestamped, setTimestamped] = useState(false);
  // const [chainVerified, setChainVerified] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { digests: strDigests, names: strNames } = qs.parse(location.search);
    const digests = strDigests.split(",");
    const names = strNames.split(",");
    const files = digests.map((d, i) => ({
      name: names[i],
      digest: d
    }));
    handleSubmitFiles(files);
  }, []);

  const handleSubmitFiles = async files => {
    try {
      const verifyRes = await handleVerifyFiles(files);

      const { newFiles, verifiedFiles } = filterFilesByVerifiedStatus(
        mergeFilesAndVerifyResult(files, verifyRes)
      );

      setVerifiedFiles(verifiedFiles);

      if (newFiles && newFiles.length) {
        const tsRes = await handleTimestampFiles(newFiles);
        const tsFiles = mergeFilesAndAuthResult(newFiles, tsRes);
        setTimestampedFiles(tsFiles);
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
      const res = await verifyFiles(digests);
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
      const res = await timestampFiles(digests, "files");
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
        <DisplayResults
          timestampedFiles={timestampedFiles}
          files={verifiedFiles.concat(timestampedFiles)}
        />
      )}
    </Page>
  );
};

export default Results;
