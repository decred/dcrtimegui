import React, { useState } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import cls from "../../helpers/cls";
import { processFiles } from "./helpers";
import styles from "./FileInput.module.css";

const FileInput = ({ files, setFiles }) => {
    const [processing, setProcessing] = useState(false);

    const onRemoveFile = idx => () =>
        setFiles(files.filter((_f, i) => i !== idx));

    return (
        <>
            <div>
                {files.map((file, i) => (
                    <div key={`f-${i}`} className={styles.fileInputLine}>
                        <span id={`t-${i}`} className={styles.textFileName} truncate>
                            {file.name}
                        </span>
                        <img
                            className={styles.deleteIcon}
                            onClick={onRemoveFile(i)}
                            alt="deleteicon"
                        />
                    </div>
                ))}
            </div>
            <div className={styles.dropzoneWrapper}>
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
                                className: cls(
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
