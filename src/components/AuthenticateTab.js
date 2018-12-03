import React, { useState } from "react";
import { Input, Button, Link } from "cobra";
import FileInput from "./FileInput";
import { timestampFiles, verifyFiles } from "../services/api";
import {
  CardTitle,
  CardWrapper,
  TabWrapper,
  CardContent
} from "./CommonComponents";
import { AuthenticationResult } from "./Results";

const AuthenticateTab = () => {
  const [files, setFiles] = useState([]);
  const [unacceptedFiles, setUnacceptedFiles] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleTimestampFiles = async () => {
    try {
      const res = await timestampFiles(files, "ma files");
      setSuccess(res);
    } catch (e) {
      setError(e);
    }
  };

  const handleVerifyAndSetFiles = async files => {
    try {
      const res = await verifyFiles(files);
      console.log(res);
      const { digests } = res;
      // merge files and their result
      const filesAndResult = files.map((f, i) => ({
        ...f,
        digest: digests[i]
      }));
      const acceptedFiles = filesAndResult.filter(
        ({ digest }) => digest.result === 2 // File does not yet exist
      );
      const unacceptedFiles = filesAndResult.filter(
        ({ digest }) => digest.result !== 2
      );

      setFiles(acceptedFiles);
      setUnacceptedFiles(unacceptedFiles);
      console.log("unaccepted files", unacceptedFiles);
    } catch (e) {
      setError(e);
    }
  };

  if (error) throw error;

  return (
    <TabWrapper>
      {success ? (
        <>
          <AuthenticationResult files={files} result={success} />
          <Link
            href="#"
            onClick={e => {
              e.preventDefault();
              setFiles([]);
              setSuccess(false);
            }}
          >
            Authenticate more files
          </Link>
        </>
      ) : (
        <>
          <CardWrapper title={<CardTitle>Select your files</CardTitle>}>
            <CardContent>
              <FileInput
                key="auth-files-input"
                files={files}
                setFiles={handleVerifyAndSetFiles}
              />
            </CardContent>
          </CardWrapper>
          <CardWrapper title={<CardTitle>Type your email</CardTitle>}>
            <CardContent>
              <Input width={195} placeholder="email" type="email" />
            </CardContent>
          </CardWrapper>
          {/* <CardWrapper>
            <CardTitle>3 - Pay</CardTitle>
          </CardWrapper>
          <CardWrapper>
            <CardTitle>4 - Wait for the confirmation</CardTitle>
          </CardWrapper> */}
          <Button
            onClick={handleTimestampFiles}
            disabled={files.length <= 0}
            style={{ marginTop: "10px", width: "220px" }}
          >
            Upload Files
          </Button>
        </>
      )}
    </TabWrapper>
  );
};

export default AuthenticateTab;
