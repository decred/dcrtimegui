import React from "react";
import styled, { css } from "styled-components";
import activeIcon from "./green_check.png";
import finishedIcon from "./finished.png";
import pendingIcon from "./pending.png";

const types = {
  PENDING: "pending",
  FINISHED: "finished",
  ACTIVE: "active"
};

const getLabel = type => {
  const mapTypeToLabel = {
    [types.ACTIVE]: "Active",
    [types.FINISHED]: "Finished",
    [types.PENDING]: "Pending"
  };
  return mapTypeToLabel[type];
};

const getColor = type => {
  const mapTypeToColor = {
    [types.ACTIVE]: "#2ED8A3",
    [types.FINISHED]: "#8997A5",
    [types.PENDING]: "#2970FF"
  };
  const color = mapTypeToColor[type];
  return color;
};

const getIcon = type => {
  const mapTypeToIcon = {
    [types.ACTIVE]: activeIcon,
    [types.FINISHED]: finishedIcon,
    [types.PENDING]: pendingIcon
  };
  return mapTypeToIcon[type];
};

const StatusWrapper = styled.div`
  font-size: 12px;
  padding: 0em 0.4em;
  min-height: 20px;
  display: flex;
  align-items: center;
  border: 1px solid ${props => getColor(props.type)};
  border-radius: 2px;
  max-width: 200px;
`;

const Icon = styled.img`
  margin-right: 4px;
  height: ${props => (props.type === types.PENDING ? "2px" : "4px")};
`;

const Label = styled.span`
  ${props => css`
    color: ${getColor(props.type)};
  `};
`;

const Status = ({ type, label, ...props }) => {
  return (
    <StatusWrapper {...{ type, props }}>
      <Icon type={type} src={getIcon(type)} />
      <Label type={type}>{label || getLabel(type)}</Label>
    </StatusWrapper>
  );
};

Status.defaultProps = {
  type: types.ACTIVE
};

export default Status;
