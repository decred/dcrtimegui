import React, { useState } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import cls from "src/helpers/cls";
import { processFiles } from "./helpers";
import styles from "./FileInput.module.css";

const FileInput = ({ files, setFiles, text, handleDrop }) => {
    const [processing, setProcessing] = useState(false);

    return (
        <div className={styles.dropzoneWrapper}>
            <Dropzone
                multiple
                disabled={processing}
                disableClick={processing}
                onDrop={async (accFiles, _rejFiles) => {
                    setProcessing(true);
                    try {
                        const processedFiles = await processFiles(accFiles);
                        await handleDrop(processedFiles);
                    }
                    catch(e) {
                        console.error(e);
                        throw Error("Something went wrong with processing the file");
                    }
                    setProcessing(false);
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
                                ? text
                                : "Processing files..."}
                        </span>
                    </div>
                )}
            </Dropzone>
        </div>
    );
};

FileInput.propTypes = {
    files: PropTypes.array,
    setFiles: PropTypes.func
};

export default FileInput;
