import React, { useState } from "react";
import { Button, Link } from "cobra";
import FileInput from "./FileInput";
import { verifyFiles } from "../services/api";
import {
  TabWrapper,
  CardWrapper,
  CardTitle,
  CardContent
} from "./CommonComponents";
import { VerificationResult } from "./Results";

const VerifyTab = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleVerifyFiles = async () => {
    try {
      const res = await verifyFiles(files, "ma files");
      setSuccess(res);
    } catch (e) {
      setError(e);
    }
  };

  if (error) throw error;

  return (
    <TabWrapper>
      {success ? (
        <>
          <VerificationResult files={files} result={success} />
          <Link
            href="#"
            onClick={e => {
              e.preventDefault();
              setFiles([]);
              setSuccess(false);
            }}
          >
            Verify more files
          </Link>
        </>
      ) : (
        <>
          <CardWrapper
            title={<CardTitle>Select the file you want to verify</CardTitle>}
          >
            <CardContent>
              <FileInput
                key="verify-files-input"
                files={files}
                setFiles={setFiles}
              />
            </CardContent>
          </CardWrapper>
          <Button
            onClick={handleVerifyFiles}
            disabled={files.length <= 0}
            style={{ marginTop: "10px", width: "220px" }}
          >
            Verify Files
          </Button>
        </>
      )}
    </TabWrapper>
  );
};

export default VerifyTab;
