import React, { useState } from "react";
import { Button, Link } from "cobra-ui";
import FileInput from "./FileInput";
import { timestampFiles, verifyFiles } from "../services/api";
import { ContentWrapper } from "./CommonComponents";
import { AuthenticationResult, VerificationResult } from "./Results";
import {
  mergeFilesAndVerifyResult,
  mergeFilesAndAuthResult,
  filterFilesByVerifiedStatus
} from "../helpers/bytes";
import Spinner from "./Spinner";

const AuthAndVerifyTab = () => {
  const [authorizedFiles, setAuthorizedFiles] = useState([]);
  const [verifiedFiles, setVerifiedFiles] = useState([]);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitFiles = async () => {
    const verifyRes = await handleVerifyFiles(files);
    const { newFiles, verifiedFiles } = filterFilesByVerifiedStatus(
      mergeFilesAndVerifyResult(files, verifyRes)
    );

    const authRes = await handleTimestampFiles(newFiles);
    const authorizedFiles = mergeFilesAndAuthResult(newFiles, authRes);

    setAuthorizedFiles(authorizedFiles);
    setVerifiedFiles(verifiedFiles);

    setVerifySuccess(verifyRes);
    setAuthSuccess(authRes);
    setSubmitted(true);
  };

  const handleVerifyFiles = async files => {
    setLoadingVerify(true);
    try {
      const res = await verifyFiles(files);
      setLoadingVerify(false);
      return res;
    } catch (e) {
      setLoadingVerify(false);
      setError(e);
    }
  };

  const handleTimestampFiles = async files => {
    setLoadingAuth(true);
    try {
      const res = await timestampFiles(files, "files");
      setLoadingAuth(false);
      return res;
    } catch (e) {
      setLoadingAuth(false);
      setError(e);
    }
  };

  const handleUploadMoreFiles = e => {
    e.preventDefault();
    setAuthorizedFiles([]);
    setVerifiedFiles([]);
    setFiles([]);
    setAuthSuccess(false);
    setVerifySuccess(false);
    setSubmitted(false);
  };

  if (error) throw error;

  return (
    <ContentWrapper>
      {loadingAuth || loadingVerify ? (
        <Spinner />
      ) : submitted ? (
        <>
          {authSuccess && authorizedFiles.length > 0 && (
            <AuthenticationResult files={authorizedFiles} />
          )}
          {verifySuccess && verifiedFiles.length > 0 && (
            <VerificationResult files={verifiedFiles} />
          )}
          <Link
            href="#"
            style={{ margin: "20px 0" }}
            onClick={handleUploadMoreFiles}
          >
            Timestamp or verify more files
          </Link>
        </>
      ) : (
        <>
          <FileInput key="auth-files-input" files={files} setFiles={setFiles} />
          {files.length > 0 ? (
            <Button
              onClick={handleSubmitFiles}
              disabled={files.length === 0}
              style={{ marginTop: "20px", width: "220px" }}
            >
              Submit Files
            </Button>
          ) : null}
        </>
      )}
    </ContentWrapper>
  );
};

export default AuthAndVerifyTab;
