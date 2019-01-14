import React from "react";
import { Button } from "cobra-ui";
import FileInput from "./FileInput";
import { verifyFiles } from "../services/api";
import { handleTimestampFiles } from "../helpers/common";
import { ContentWrapper } from "./CommonComponents";
import {
  mergeFilesAndVerifyResult,
  mergeFilesAndAuthResult,
  filterFilesByVerifiedStatus
} from "../helpers/bytes";

const AuthAndVerifyTab = ({
  setVerifySuccess,
  setAuthSuccess,
  setSubmitted,
  setAuthorizedFiles,
  setVerifiedFiles,
  files,
  setFiles,
  setLoading,
  error,
  setError,
  setRawFiles,
  rawFiles
}) => {
  const handleSubmitFiles = async () => {
    const verifyRes = await handleVerifyFiles(files);
    const { newFiles, verifiedFiles } = filterFilesByVerifiedStatus(
      mergeFilesAndVerifyResult(files, verifyRes)
    );

    const authRes = await handleTimestampFiles(newFiles, setLoading, setError);
    const authorizedFiles = mergeFilesAndAuthResult(newFiles, authRes);

    setAuthorizedFiles(authorizedFiles);
    setVerifiedFiles(verifiedFiles);

    setVerifySuccess(verifyRes);
    setAuthSuccess(authRes);
    setSubmitted(true);
  };

  const handleVerifyFiles = async files => {
    setLoading(true);
    try {
      const res = await verifyFiles(files);
      setLoading(false);
      return res;
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  };

  if (error) throw error;

  return (
    <ContentWrapper>
      <FileInput
        key="auth-files-input"
        files={files}
        rawFiles={rawFiles}
        setRawFiles={setRawFiles}
        setFiles={setFiles}
      />
      {files.length > 0 ? (
        <Button
          onClick={handleSubmitFiles}
          disabled={files.length === 0}
          style={{ marginTop: "20px", width: "220px" }}
        >
          Submit Files
        </Button>
      ) : null}
    </ContentWrapper>
  );
};

export default AuthAndVerifyTab;
