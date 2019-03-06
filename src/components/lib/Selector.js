import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const SelectorItemWrapper = styled.div`
  padding-bottom: 0.5em;
  display: flex;
  font-size: 13px;
  margin-right: 10px;
  align-items: center;
  cursor: pointer;
  ${props =>
    props.isSelected
      ? css`
          border-bottom: 2px solid #ffd16a;
        `
      : ""}
`;

const Counter = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e6eaed;
  height: 20px;
  width: 20px;
  margin-left: 5px;
`;

const SelectorWrapper = styled.div`
  display: flex;
`;

const SelectorItem = ({ item: { label, count }, ...props }) => (
  <SelectorItemWrapper {...props}>
    {label}
    {count ? <Counter>{count}</Counter> : null}
  </SelectorItemWrapper>
);

const Selector = ({ options, renderItem, onSelect, value }) => {
  return (
    <SelectorWrapper>
      {options.map((option, idx) =>
        renderItem(
          option,
          value === option.value,
          () => onSelect(option.value),
          idx
        )
      )}
    </SelectorWrapper>
  );
};

SelectorItem.propTypes = {
  item: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

Selector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired
};

Selector.defaultProps = {
  renderItem: (item, isSelected, onSelect, idx) => (
    <SelectorItem
      key={idx}
      item={item}
      isSelected={isSelected}
      onClick={onSelect}
    />
  )
};

export default Selector;
