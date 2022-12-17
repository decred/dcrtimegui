import React, { useState } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import cls from "src/helpers/cls";
import { processFiles } from "./helpers";
import styles from "./FileInput.module.css";
import {useTranslation} from "react-i18next";
import {ERROR_DUPLICATE, ERROR_BIG_FILE} from "src/constants";

const FileInput = ({ filesObj, error, setError, text, handleDrop }) => {
    const [processing, setProcessing] = useState(false);
    const {t} = useTranslation();

    return (
        <div className={styles.dropzoneWrapper}>
            <Dropzone
                maxSize={75000000}
                multiple
                disabled={processing}
                disableClick={processing}
                onDrop={async (accFiles, rejFiles) => {
                    setProcessing(true);
                    try {
                        const errors = [];
                        const processedFiles = await processFiles(accFiles);
                        const duplicates = [];
                        const res = processedFiles.filter(d => {
                            const digest = filesObj?.[d.digest];
                            if (digest) {
                                duplicates.push(digest);
                            }
                            return !digest;
                        });
                        if (duplicates.length > 0) {
                            errors.push({key: ERROR_DUPLICATE, options: {hashes: duplicates.map(dup => dup.digest).join(", ")}});
                        }
                        await handleDrop(res);
                        setProcessing(false);
                        if (rejFiles.length > 0) { // max file size
                            errors.push({key: ERROR_BIG_FILE, options: {rejected: rejFiles.map(rejFile => {
                                return `${t("file")}: '${rejFile.name}' - ${rejFile.size/1000000}mb. `;
                            }).join(" ")}});
                        }
                        if (errors.length > 0) {
                            setError(errors);
                        } else {
                            setError(null);
                        }
                    }
                    catch(e) {
                        setProcessing(false);
                        setError(e);
                    }
                }}
            >
                {({ getRootProps, getInputProps, isDragActive }) => (
                    <div
                        {...getRootProps({
                            className: cls(
                                styles.dropzone,
                                isDragActive && styles.dropzoneActive,
                                error && styles.dropzoneError
                            )
                        })}
                    >
                        <input {...getInputProps()} />
                        <span className={styles.dropzoneText}>
                            {!processing
                                ? text
                                : t("fileInput.processing")}
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
