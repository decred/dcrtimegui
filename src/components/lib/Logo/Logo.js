import React from "react";
import styled from "styled-components";
import logoSVG from "./lightlogo.svg";

const LogoImg = styled.img`
  cursor: pointer;
`;

const Logo = props => <LogoImg {...props} alt="Decred logo" src={logoSVG} />;

export default Logo;
