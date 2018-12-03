import React, { useState } from "react";
import { Button, Link } from "cobra";
import FileInput from "./FileInput";
import { timestampFiles, verifyFiles } from "../services/api";
import {
  CardTitle,
  CardWrapper,
  TabWrapper,
  CardContent
} from "./CommonComponents";
import { AuthenticationResult } from "./Results";
import { VerificationResult } from "./Results";
import {
  mergeFilesAndVerifyResult,
  mergeFilesAndAuthResult,
  filterFilesByVerifiedStatus
} from "../services/helpers";

const AuthenticateTab = () => {
  const [authorizedFiles, setAuthorizedFiles] = useState([]);
  const [verifiedFiles, setVerifiedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [submited, setSubmited] = useState(false);

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
    setSubmited(true);
  };

  const handleVerifyFiles = async files => {
    try {
      const res = await verifyFiles(files);
      return res;
    } catch (e) {
      setError(e);
    }
  };

  const handleTimestampFiles = async files => {
    try {
      const res = await timestampFiles(files, "files");
      return res;
    } catch (e) {
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
    setSubmited(false);
  };

  if (error) throw error;

  return (
    <TabWrapper>
      {submited ? (
        <>
          {authSuccess && authorizedFiles.length > 0 && (
            <AuthenticationResult files={authorizedFiles} />
          )}
          {verifySuccess && verifiedFiles.length > 0 && (
            <VerificationResult files={verifiedFiles} />
          )}
          <Link href="#" onClick={handleUploadMoreFiles}>
            Authenticate or verify more files
          </Link>
        </>
      ) : (
        <>
          <CardWrapper title={<CardTitle>Authenticate and Verify</CardTitle>}>
            <CardContent>
              <FileInput
                key="auth-files-input"
                files={files}
                setFiles={setFiles}
              />
            </CardContent>
          </CardWrapper>
          <Button
            onClick={handleSubmitFiles}
            disabled={files.length === 0}
            style={{ marginTop: "10px", width: "220px" }}
          >
            Submit Files
          </Button>
        </>
      )}
    </TabWrapper>
  );
};

export default AuthenticateTab;
