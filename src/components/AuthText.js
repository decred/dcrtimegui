import React, { useState } from "react";
import { Input, Textarea, Button } from "cobra-ui";
import { handleTimestampFiles } from "../helpers/common";
import { processFiles } from "../helpers/files";
import { ContentWrapper } from "./CommonComponents";
import { mergeFilesAndAuthResult } from "../helpers/bytes";

export const AuthText = ({
  setLoading,
  error,
  setError,
  setAuthSuccess,
  setSubmitted,
  setAuthorizedFiles
}) => {
  const [filename, setFilename] = useState("");
  const [text, setText] = useState("");

  const createFile = () => {
    const file = new File([text], `${filename}.txt`, {
      type: "text/plain;charset=utf-8"
    });
    return file;
  };

  const handleSubmitFiles = async () => {
    const file = createFile();
    const processedFiles = await processFiles([file]);

    const authRes = await handleTimestampFiles(
      processedFiles,
      setLoading,
      setError
    );
    const authorizedFiles = mergeFilesAndAuthResult(processedFiles, authRes);

    setAuthorizedFiles(authorizedFiles);
    setAuthSuccess(authRes);
    setSubmitted(true);
  };

  const handleFilenameChange = e => {
    setFilename(e.target.value);
  };
  const handleTextChange = e => {
    setText(e.target.value);
  };

  if (error) throw error;

  return (
    <ContentWrapper>
      <div style={{ textAlign: "left", width: "100%" }}>
        <Input
          value={filename}
          onChange={handleFilenameChange}
          label="Filename"
          width="100%"
          style={{ marginBottom: "15px" }}
        />
        <Textarea
          onChange={handleTextChange}
          value={text}
          label="Text"
          width="100%"
        />
      </div>
      {filename !== "" && text !== "" && (
        <Button onClick={handleSubmitFiles} style={{ marginTop: "20px" }}>
          Create File and Submit
        </Button>
      )}
    </ContentWrapper>
  );
};
