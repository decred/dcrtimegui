import React from "react";
import PropTypes from "prop-types";
import Modal from "src/components/Modal";

const ModalNewDigestInfo = ({ show, onClose }) => {
  const title = "Create new digest";
  const content = `
    The timestamp service allows you to create a Proof-of-Existence of a
    given file. A digital signature (digest) of each file is calculated
    and sent to the Dcrtime server which hourly will calculate the merkle
    root for all digests collected in the previous 60 minutes and store
    its value in the blockchain.
    <br />
    The files you submit below will be verified against Dcrtime to find
    out if their digests are already in there or not. If the digest is not
    in Dcrtime, it will be uploaded and should be anchored within the next
    hour.
  `;

  return (
    <Modal title={title} content={content} show={show} onClose={onClose} />
  );
};

ModalNewDigestInfo.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func
};

export default ModalNewDigestInfo;
