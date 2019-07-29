import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: -webkit-fill-available;
  padding: 22px 128px;
  background: #091440;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  height: 36px;
  min-width: 210px;
  font-size: 13px;
  color: #8997a5;
`;

const GitHubLink = styled.a`
  color: #2970ff;
  text-decoration: none;
`;

const Footer = () => (
  <FooterWrapper>
    <TextWrapper>
      <span>Decred developers | 2016 - 2019</span>
      <span>
        The source code is available at{" "}
        <GitHubLink href="https://github.com/decred/dcrtimegui">
          GitHub
        </GitHubLink>
      </span>
    </TextWrapper>
  </FooterWrapper>
);

export default Footer;
