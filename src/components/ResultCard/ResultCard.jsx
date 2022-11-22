import React from "react";
import PropTypes from "prop-types";
import Name from "./Name";
import Digest from "./Digest";
import ChainInfo from "./ChainInfo";
import DownloadProof from "./DownloadProof";
import styles from "./ResultCard.module.css";

const ResultCard = ({
    name,
    digest,
    chainInfo,
    statusTag,
    isDigestAnchored
}) => {
    const hasFileName = name !== digest;
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <Name name={name} statusTag={statusTag} hasFileName={hasFileName} />
                <Digest digest={digest} />
                {isDigestAnchored ? (
                    <>
                        <ChainInfo chainInfo={chainInfo} />
                        <DownloadProof
                            data={{
                                digest: digest,
                                ...chainInfo
                            }}
                            name={name}
                        />
                    </>
                ) : null}
            </div>
        </div>
    );
};

ResultCard.propTypes = {
    name: PropTypes.string,
    digest: PropTypes.string,
    chainInfo: PropTypes.object,
    statusTag: PropTypes.node,
    isDigestAnchored: PropTypes.bool
};

export default ResultCard;
