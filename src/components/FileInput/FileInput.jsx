import React, { useState } from "react";
import Dropzone from "react-dropzone";
import FileInputLine from "./FileInputLine";
import { processFiles } from "./helpers";
import styles from "./FileInput.module.css";

const FileInput = ({ files, setFiles, multiple = true }) => {
  const [processing, setProcessing] = useState(false);

  const onRemoveFile = idx => () =>
    setFiles(files.filter((_f, i) => i !== idx));

  return (
    <>
      <div style={files.length > 0 ? { paddingTop: "2em" } : {}}>
        {files.map((file, i) => (
          <FileInputLine file={file} onRemove={onRemoveFile(i)} />
        ))}
      </div>
      <div
        style={!files.length ? { paddingTop: "3em" } : { paddingTop: "1em" }}
        className={styles.dropzoneWrapper}
      >
        <Dropzone
          multiple={multiple}
          style={styles.dropzoneFile}
          acceptStyle={styles.dropzoneAcceptStyle}
          disabled={processing}
          disableClick={processing}
          onDrop={(accFiles, _rejFiles) => {
            setProcessing(true);
            processFiles(accFiles).then(processedFiles => {
              setProcessing(false);
              setFiles([...files, ...processedFiles]);
            });
          }}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div
              {...getRootProps({
                className: `dropzone ${isDragActive ? "dropzone-active" : ""} ${
                  isDragActive ? "dropzone-accepted" : ""
                } `
              })}
            >
              <input {...getInputProps()} />
              <span className={styles.dropzoneText}>
                {!processing
                  ? "Drop your files here or click to select them"
                  : "Processing your files..."}
              </span>
            </div>
          )}
        </Dropzone>
      </div>
    </>
  );
};

export default FileInput;
