import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Card from "../Card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faTimesCircle,
  faInfoCircle,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

const iconStyles = {
  fontSize: "28px",
  marginRight: "10px"
};

const generalStyle = {
  padding: "20px",
  margin: "20px",
  borderRadius: "5px"
};

const MessageInnerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Message = ({ type, text, hasShadow, ...props }) => {
  const messageTypes = {
    warning: (
      <Card
        hasShadow={hasShadow}
        style={{ backgroundColor: "khaki", color: "tomato", ...generalStyle }}
        {...props}
      >
        <MessageInnerWrapper>
          <FontAwesomeIcon style={iconStyles} icon={faExclamationCircle} />
          {text}
        </MessageInnerWrapper>
      </Card>
    ),
    error: (
      <Card
        hasShadow={hasShadow}
        style={{
          backgroundColor: "lightcoral",
          color: "firebrick",
          ...generalStyle
        }}
        {...props}
      >
        <MessageInnerWrapper>
          <FontAwesomeIcon style={iconStyles} icon={faTimesCircle} />
          {text}
        </MessageInnerWrapper>
      </Card>
    ),
    success: (
      <Card
        hasShadow={hasShadow}
        style={{
          backgroundColor: "lightgreen",
          color: "seagreen",
          ...generalStyle
        }}
        {...props}
      >
        <MessageInnerWrapper>
          <FontAwesomeIcon style={iconStyles} icon={faCheckCircle} />
          {text}
        </MessageInnerWrapper>
      </Card>
    ),
    default: (
      <Card
        hasShadow={hasShadow}
        style={{
          backgroundColor: "lightblue",
          color: "royalblue",
          ...generalStyle
        }}
        {...props}
      >
        <MessageInnerWrapper>
          <FontAwesomeIcon style={iconStyles} icon={faInfoCircle} />
          {text}
        </MessageInnerWrapper>
      </Card>
    )
  };
  return messageTypes[type];
};

Message.propTypes = {
  type: PropTypes.oneOf(["warning", "error", "success", "default"]),
  width: PropTypes.number,
  text: PropTypes.string,
  hasShadow: PropTypes.bool
};

Message.defaultProps = {
  hasShadow: true,
  type: "default"
};

export default Message;
