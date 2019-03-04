import React, { useEffect, useState } from "react";
import styled from "styled-components";
import qs from "query-string";
import { timestampFiles, verifyFiles } from "../services/api";
import {
  mergeFilesAndVerifyResult,
  mergeFilesAndAuthResult,
  filterFilesByVerifiedStatus
} from "../helpers/bytes";
import LoadingResults from "../components/LoadingResults";

const Page = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 40px;
`;

const Results = ({ location }) => {
  const [files, setFiles] = useState([]);
  const [verifyLoading, setLoadingVerify] = useState(false);
  const [verified, setVerified] = useState(false);
  const [timestampLoading, setLoadingTimestamp] = useState(false);
  const [timestamped, setTimestamped] = useState(false);
  const [chainVerified, setChainVerified] = useState(false);
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

      const authRes = await handleTimestampFiles(newFiles);
      const authorizedFiles = mergeFilesAndAuthResult(newFiles, authRes);
    } catch (e) {
      setError(e);
    }
  };

  const handleVerifyFiles = async files => {
    setLoadingVerify(true);
    try {
      const res = await verifyFiles(files);
      setLoadingVerify(false);
      setVerified(true);
      return res;
    } catch (e) {
      setLoadingVerify(false);
      throw e;
    }
  };

  const handleTimestampFiles = async files => {
    setLoadingTimestamp(true);
    try {
      const res = await timestampFiles(files, "files");
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
      <LoadingResults
        verifyLoading={verifyLoading}
        verified={verified}
        timestampLoading={timestampLoading}
        timestamped={timestamped}
      />
    </Page>
  );
};

export default Results;
