import React from "react";
import PropTypes from "prop-types";
import Modal from "src/components/Modal";
import { StatusTag, P } from "pi-ui";

const ModalResultsInfo = ({ show, onClose }) => {
  const title = "Files sent to dcrtime can be either";
  const content = (
    <>
      <StatusTag text="Anchored" type="greenCheck" />
      <P style={{ marginTop: "5px" }}>
        The digest of the file and other files digests sent in the same hour
        range were compiled into a merkle root which is already stored in the
        chain.
      </P>
      <StatusTag text="Pending" type="bluePending" />
      <P style={{ marginTop: "5px" }}>
        The digest of the file is stored in the dcrtime server and it should be
        anchored within the next hour.
      </P>
      <StatusTag text="Not Anchored" type="orangeNegativeCircled" />
      <P style={{ marginTop: "5px" }}>
        The digest of the file is not stored in the dcrtime server.
      </P>
    </>
  );
  return (
    <Modal title={title} content={content} show={show} onClose={onClose} />
  );
};

ModalResultsInfo.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func
};

export default ModalResultsInfo;
