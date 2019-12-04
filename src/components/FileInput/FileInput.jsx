import React, { useState } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { Text, classNames } from "pi-ui";
import FileIcon from "src/assets/file_icon.svg";
import DeleteIcon from "src/assets/delete_icon.svg";
import { processFiles } from "./helpers";
import styles from "./FileInput.module.css";

const FileInput = ({ files, setFiles }) => {
  const [processing, setProcessing] = useState(false);

  const onRemoveFile = idx => () =>
    setFiles(files.filter((_f, i) => i !== idx));

  return (
    <>
      <div style={files.length > 0 ? { paddingTop: "2em" } : {}}>
        {files.map((file, i) => (
          <div key={`f-${i}`} className={styles.fileInputLine}>
            <img src={FileIcon} alt="fileicon" />
            <Text id={`t-${i}`} className={styles.textFileName} truncate>
              {file.name}
            </Text>
            <img
              className={styles.deleteIcon}
              src={DeleteIcon}
              onClick={onRemoveFile(i)}
              alt="deleteicon"
            />
          </div>
        ))}
      </div>
      <div
        style={!files.length ? { paddingTop: "3em" } : { paddingTop: "1em" }}
        className={styles.dropzoneWrapper}
      >
        <Dropzone
          multiple
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
                className: classNames(
                  styles.dropzone,
                  isDragActive && styles.dropzoneActive
                )
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

FileInput.propTypes = {
  files: PropTypes.array,
  setFiles: PropTypes.func
};

export default FileInput;
