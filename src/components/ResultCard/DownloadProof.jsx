import React from "react";
import PropTypes from "prop-types";
import fileDownload from "js-file-download";
import Button from "../Button";

const DownloadProof = ({ data }) => {
    const handleDownload = () =>
        fileDownload(JSON.stringify(data, null, 2), `${data?.digest}.json`);

    return (
        <Button kind="primary" text="Download Proof" handleClick={handleDownload} />
    );
};

DownloadProof.propTypes = {
    data: PropTypes.object,
    name: PropTypes.string
};

export default DownloadProof;
