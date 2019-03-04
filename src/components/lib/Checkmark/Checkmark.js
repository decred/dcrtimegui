import React from "react";
import styled from "styled-components";
import checkmarkSVG from "./checkmark.svg";

const SVG = styled.img`
  height: 3em;
`;

const Checkmark = ({}) => <SVG alt="Checkmark" src={checkmarkSVG} />;

export default Checkmark;
