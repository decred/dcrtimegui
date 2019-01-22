import React from "react";
import { Textarea, Input, Button } from "cobra-ui";
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
  setAuthorizedFiles,
  setFilename,
  filename,
  setText,
  text,
  createFile,
  setTxtFile
}) => {
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
    setTxtFile(file);

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
      <h4>Timestamp a .txt file</h4>
      <div
        style={{
          textAlign: "left",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Input
          value={filename}
          onChange={handleFilenameChange}
          label="Filename"
          width={500}
          style={{ marginBottom: "15px" }}
        />
        <Textarea
          onChange={handleTextChange}
          value={text}
          width={500}
          label="Text"
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
