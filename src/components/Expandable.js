import React from "react";
import propTypes from "prop-types";
import styled, { css } from "styled-components";

const ExapandableContent = styled.div`
  background: #f6f8f8;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  transition: max-height 0.15s ease-out;
  max-height: 0;
  overflow: hidden;
  ${props => css`
    max-height: ${props.expanded ? "600px" : 0};
  `}
`;

const ExpandableContainer = styled.div``;

const Exapandable = ({ expanded, triggerComponent, children, style }) => (
  <ExpandableContainer style={style}>
    {triggerComponent}
    <ExapandableContent expanded={expanded}>{children}</ExapandableContent>
  </ExpandableContainer>
);

Exapandable.propTypes = {
  style: propTypes.object,
  expanded: propTypes.bool.isRequired,
  triggerComponent: propTypes.node.isRequired,
  children: propTypes.oneOfType([propTypes.node, propTypes.string])
};

export default Exapandable;
