import React from "react";
import PropTypes from "prop-types";
import { Card } from "pi-ui";
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
}) => (
  <Card className={styles.card}>
    <div className={styles.content}>
      <Name name={name} statusTag={statusTag} hasFileName={name !== digest} />
      <Digest digest={digest} />
      {isDigestAnchored ? (
        <>
          <ChainInfo chainInfo={chainInfo} />
          <DownloadProof
            data={{
              name: name,
              digest: digest,
              transaction: chainInfo.transaction,
              merkleRoot: chainInfo.merkleroot,
              merklePath: chainInfo.merklepath
            }}
            name={name}
          />
        </>
      ) : null}
    </div>
  </Card>
);

ResultCard.propTypes = {
  name: PropTypes.string,
  digest: PropTypes.string,
  chainInfo: PropTypes.object,
  statusTag: PropTypes.node,
  isDigestAnchored: PropTypes.bool
};

export default ResultCard;
