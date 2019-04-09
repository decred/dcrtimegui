import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0px;
  ${props =>
    props.orientation === "horizontal" &&
    css`
      display: flex;
    `}

  > li {
    display: flex;
    justify-content: flex-start;
    ${props =>
      props.orientation === "horizontal" &&
      css`
        border: none;
      `}
    ${props =>
      props.center &&
      css`
        justify-content: center;
      `}
    ${props =>
      props.spaceAround &&
      css`
        justify-content: space-around;
      `}
    ${props =>
      props.spaceBetween &&
      css`
        justify-content: space-between;
      `}
    ${props =>
      props.end &&
      css`
        justify-content: flex-end;
      `}
  }
`;

List.propTypes = {
  center: PropTypes.bool,
  spaceAround: PropTypes.bool,
  spaceBetween: PropTypes.bool,
  end: PropTypes.bool,
  orientation: PropTypes.string
};

List.defaultProps = {
  orientation: "vertical"
};

export default List;
