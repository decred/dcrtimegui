import React from "react";
import Logo from "./lib/Logo";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  background: #f9fafa;
  font-size: 16px;
  padding: 1em;
`;

const Header = ({ history }) => (
  <HeaderWrapper>
    <Logo onClick={() => history.push("/")} />
  </HeaderWrapper>
);

export default Header;
