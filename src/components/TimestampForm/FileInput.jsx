import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Text } from "pi-ui";
import { digestPayload } from "src/helpers/dcrtime";
import styles from "./timestampform.module.css";
import FileIcon from "src/assets/file_icon.svg";
import DeleteIcon from "src/assets/delete_icon.svg";

// processFiles adds the base64 payload into the file data
const processFiles = files =>
  new Promise(resolve => {
    const processedFiles = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (f => event => {
        const payload = event.target.result.split(",")[1];
        processedFiles.push({
          name: f.name,
          payload,
          digest: digestPayload(payload)
        });
        if (processedFiles.length === files.length) resolve(processedFiles);
      })(file);
      reader.readAsDataURL(file);
    });
  });

const FilesList = ({ files, onRemoveFile }) =>
  files.map((file, i) => (
    <div key={`file-${i}`} className={styles.fileInList}>
      <img src={FileIcon} alt="fileicon" />
      <Text id={`file-${i}`} className={styles.textFileName} truncate>
        {file.name}
      </Text>
      <img
        className={styles.deleteIcon}
        src={DeleteIcon}
        onClick={() => onRemoveFile(i)}
        alt="deleteicon"
      />
    </div>
  ));

const FileInput = ({ files, setFiles, multiple = true }) => {
  const [processing, setProcessing] = useState(false);
  return (
    <>
      <div style={files.length > 0 ? { paddingTop: "2em" } : {}}>
        <FilesList
          files={files}
          onRemoveFile={idx => setFiles(files.filter((_f, i) => i !== idx))}
        />
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
