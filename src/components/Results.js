import React from "react";
import styled from "styled-components";
import { Table, TableRow, TableHeader, Link, theme } from "cobra-ui";
import { ResultsTableData } from "./CommonComponents";
import {
  SUCCESS,
  FILE_ALREADY_EXISTS,
  FILE_DOES_NOT_EXIST,
  DISABLED
} from "../constants";
import { convertTsToStringDate } from "../helpers/dates";
import { formatDigestToDownload } from "../helpers/format";
import { DownloadFileLink } from "./DownloadFileLink";

const getHumanReadableResult = result => {
  const mapCodeToMessage = {
    [SUCCESS]: "Success",
    [FILE_ALREADY_EXISTS]: "File already existent",
    [FILE_DOES_NOT_EXIST]: "File does not exist",
    [DISABLED]: "Disabled"
  };
  return mapCodeToMessage[result] || "Invalid result";
};

export const AuthenticationResult = ({ files }) => (
  <ResultWrapper>
    <ResultLabel>Uploaded digests</ResultLabel>
    <Table
      style={{
        tableLayout: "fixed",
        width: "100%"
      }}
    >
      <TableRow>
        <TableHeader>File</TableHeader>
        <TableHeader>Digest</TableHeader>
        <TableHeader>Result</TableHeader>
      </TableRow>
      {files.map((file, i) => (
        <TableRow key={`file-result-${i}`}>
          <ResultsTableData
            onMouseEnter={el => {
              el.target.setAttribute("title", file.name);
            }}
          >
            {file.name}
          </ResultsTableData>
          <ResultsTableData
            style={{ fontFamily: "monospace" }}
            onMouseEnter={el => {
              el.target.setAttribute("title", file.digest);
            }}
          >
            {file.digest}
          </ResultsTableData>
          <ResultsTableData>
            {getHumanReadableResult(file.result)}
          </ResultsTableData>
        </TableRow>
      ))}
    </Table>
  </ResultWrapper>
);

export const VerificationResult = ({ files }) => (
  <ResultWrapper>
    <ResultLabel>Verified digests</ResultLabel>
    <Table>
      <TableRow>
        <TableHeader>Anchored Date</TableHeader>
        <TableHeader>File</TableHeader>
        <TableHeader>Transaction</TableHeader>
        <TableHeader>Download</TableHeader>
        <TableHeader>Result</TableHeader>
      </TableRow>
      {files.map(
        (
          {
            name,
            digest: {
              result,
              chaininformation: { chaintimestamp, transaction }
            }
          },
          i
        ) => (
          <TableRow key={`file-result-${i}`}>
            <ResultsTableData>
              {chaintimestamp ? convertTsToStringDate(chaintimestamp) : "-"}
            </ResultsTableData>
            <ResultsTableData
              onMouseEnter={el => {
                el.target.setAttribute("title", name);
              }}
            >
              {name}
            </ResultsTableData>
            <ResultsTableData
              onMouseEnter={el => {
                el.target.setAttribute("title", transaction);
              }}
            >
              {chaintimestamp && transaction ? (
                <Link
                  style={{ fontFamily: "monospace" }}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  href={`https://testnet.dcrdata.org/tx/${transaction}`}
                >
                  {transaction}
                </Link>
              ) : (
                "not anchored yet"
              )}
            </ResultsTableData>
            <ResultsTableData>
              <DownloadFileLink
                data={formatDigestToDownload({
                  name,
                  transaction,
                  date: convertTsToStringDate(chaintimestamp),
                  result: files[i]
                })}
                filename={"digest.json"}
              >
                click here
              </DownloadFileLink>
            </ResultsTableData>
            <ResultsTableData>
              {getHumanReadableResult(result)}
            </ResultsTableData>
          </TableRow>
        )
      )}
    </Table>
  </ResultWrapper>
);

const ResultWrapper = styled.div`
  padding: 20px 0;
  text-align: left;
  width: 100%;
`;

const ResultLabel = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.darkGrayColor};
`;
