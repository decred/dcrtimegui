import React from "react";
import { Message, Table, TableRow, TableHeader, Link } from "cobra";
import { CardWrapper, CardContent, ResultsTableData } from "./CommonComponents";
import {
  SUCCESS,
  FILE_ALREADY_EXISTS,
  FILE_DOES_NOT_EXIST,
  DISABLED
} from "../constants";
import { convertTsToStringDate } from "../helpers/dates";

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
  <>
    <Message style={{ width: "80%" }} type="success" text="Files Uploaded!" />
    <CardWrapper>
      <CardContent>
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
      </CardContent>
    </CardWrapper>
  </>
);

export const VerificationResult = ({ files }) => (
  <>
    <Message style={{ width: "80%" }} type="success" text="Files Verified!" />
    <CardWrapper>
      <CardContent>
        <Table>
          <TableRow>
            <TableHeader>Anchored Date</TableHeader>
            <TableHeader>File</TableHeader>
            <TableHeader>Transaction</TableHeader>
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
                {/* <TableData style={{ fontSize: "8px" }}> */}
                <ResultsTableData
                  onMouseEnter={el => {
                    el.target.setAttribute("title", name);
                  }}
                >
                  {name}
                </ResultsTableData>
                <ResultsTableData
                  style={{ fontFamily: "monospace" }}
                  onMouseEnter={el => {
                    el.target.setAttribute("title", transaction);
                  }}
                >
                  {chaintimestamp && transaction ? (
                    <Link
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
                  {getHumanReadableResult(result)}
                </ResultsTableData>
              </TableRow>
            )
          )}
        </Table>
      </CardContent>
    </CardWrapper>
  </>
);
