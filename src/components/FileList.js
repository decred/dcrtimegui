import React from "react";
import styled from "styled-components";
import Card from "./lib/Card";

const FileListWrapper = styled.ul`
  list-style: none;
  padding: 0;
`;

const FileListItemWrapper = styled.li`
  margin-top: 20px;
`;

const FileListItemCard = styled(Card)`
  font-size: 16px;
  padding: 2em;
`;

const FileTitle = styled.span`
  font-size: 18px;
  color: #3d5873;
`;

const FileListItem = ({ file: { name } }) => {
  return (
    <FileListItemWrapper>
      <FileListItemCard>
        <FileTitle>{name}</FileTitle>
      </FileListItemCard>
    </FileListItemWrapper>
  );
};

const FileList = ({ files }) => {
  return (
    <FileListWrapper>
      {files.map(f => (
        <FileListItem file={f} />
      ))}
    </FileListWrapper>
  );
};

export default FileList;
