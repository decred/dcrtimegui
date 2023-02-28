import React from "react";
import PropTypes from "prop-types";
import fileDownload from "js-file-download";
import Button from "../Button";
import { useTranslation } from "react-i18next";

const DownloadProof = ({ data }) => {
    const {t} = useTranslation();
    const handleDownload = () =>
        fileDownload(JSON.stringify(data, null, 2), `${data?.digests[0].digest}.json`);

    return (
        <Button kind={data?.digests[0].chaininformation.chaintimestamp ? "primary" : "disabled"} text={t("downloadProof.singular")} handleClick={handleDownload} />
    );
};

DownloadProof.propTypes = {
    data: PropTypes.object,
    name: PropTypes.string
};

export default DownloadProof;
