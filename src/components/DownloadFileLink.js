import React from "react";
import styled from "styled-components";

const DownloadFileLinkWrapper = styled.a`
  font-size: 10px;
  line-height: 2em;
  text-decoration: none;
`;

const DownloadFileLink = ({
  children,
  filename = "download.txt",
  mime = "text/plain;charset=utf-8",
  data
}) => (
  <DownloadFileLinkWrapper
    href={`data:${mime}, ${encodeURIComponent(data)}`}
    download={filename}
  >
    {children}
  </DownloadFileLinkWrapper>
);

export default DownloadFileLink;
