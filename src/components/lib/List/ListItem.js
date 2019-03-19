import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const ListItem = styled.li`
  padding: 12px 10px 12px 10px;
  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
    `}
  border-top: 1px solid #F3F5F6;
  &:first-child {
    border-top: 0;
  }
`;

ListItem.propTypes = {
  onClick: PropTypes.func
};

export default ListItem;
