import React, { lazy, Suspense, useState } from "react";
import { Header, Link } from "cobra-ui";
import ErrorBoundary from "./components/ErrorBoundary";
import {
  Title,
  SubTitle,
  Main,
  CardWrapper
} from "./components/CommonComponents";
import { AuthenticationResult, VerificationResult } from "./components/Results";
import { AuthText } from "./components/AuthText";
import Spinner from "./components/Spinner";

const AuthAndVerify = lazy(() => import("./components/AuthAndVerify"));

const App = () => {
  const [authSuccess, setAuthSuccess] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [authorizedFiles, setAuthorizedFiles] = useState([]);
  const [verifiedFiles, setVerifiedFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");
  const [filename, setFilename] = useState("");
  const [txtFile, setTxtFile] = useState(null);
  const [rawFiles, setRawFiles] = useState([]);

  const createFile = () => {
    const file = new File([text], `${filename}.txt`, {
      type: "text/plain;charset=utf-8"
    });
    return file;
  };

  const handleUploadMoreFiles = e => {
    e.preventDefault();
    setAuthorizedFiles([]);
    setVerifiedFiles([]);
    setFiles([]);
    setRawFiles([]);
    setText("");
    setFilename("");
    setAuthSuccess(false);
    setVerifySuccess(false);
    setSubmitted(false);
  };
  return (
    <div>
      <Header logo={<img alt="" src={"assets/lightlogo.svg"} />} />
      <ErrorBoundary>
        <Main>
          <CardWrapper>
            <div style={{ margin: "25px auto" }}>
              <Title>Timestamp</Title>
              <SubTitle>Timestamp your files with Blockchain.</SubTitle>
            </div>
            {submitted ? (
              <>
                {authSuccess && authorizedFiles.length > 0 && (
                  <AuthenticationResult
                    rawFiles={rawFiles}
                    txtFile={txtFile}
                    files={authorizedFiles}
                  />
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
              <Suspense fallback={<h4>Loading ...</h4>}>
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <AuthAndVerify
                      setSubmitted={setSubmitted}
                      setAuthSuccess={setAuthSuccess}
                      setVerifySuccess={setVerifySuccess}
                      setAuthorizedFiles={setAuthorizedFiles}
                      setVerifiedFiles={setVerifiedFiles}
                      files={files}
                      setFiles={setFiles}
                      setLoading={setLoading}
                      error={error}
                      setError={setError}
                      setRawFiles={setRawFiles}
                      rawFiles={rawFiles}
                    />
                    <h4 className="or">
                      <span>or</span>
                    </h4>
                    <AuthText
                      setTxtFile={setTxtFile}
                      text={text}
                      setText={setText}
                      setFilename={setFilename}
                      createFile={createFile}
                      setLoading={setLoading}
                      error={error}
                      setError={setError}
                      setSubmitted={setSubmitted}
                      setAuthorizedFiles={setAuthorizedFiles}
                      setAuthSuccess={setAuthSuccess}
                    />
                  </>
                )}
              </Suspense>
            )}
          </CardWrapper>
        </Main>
      </ErrorBoundary>
    </div>
  );
};

export default App;
