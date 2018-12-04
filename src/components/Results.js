import React from "react";
import { Message, Table, TableRow, TableData, TableHeader, Link } from "cobra";
import { CardWrapper, CardContent } from "./CommonComponents";
import {
  SUCCESS,
  FILE_ALREADY_EXISTS,
  FILE_DOES_NOT_EXIST,
  DISABLED
} from "../constants";
import {convertTsToStringDate} from "../helpers/dates";

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
        <Table>
          <TableRow>
            <TableHeader>File</TableHeader>
            <TableHeader>Digest</TableHeader>
            <TableHeader>Result</TableHeader>
          </TableRow>
          {files.map((file, i) => (
            <TableRow key={`file-result-${i}`}>
              <TableData>{file.name}</TableData>
              <TableData style={{ fontSize: "8px" }}>{file.digest}</TableData>
              <TableData>{getHumanReadableResult(file.result)}</TableData>
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
                <TableData>{convertTsToStringDate(chaintimestamp)}</TableData>
                <TableData>{name}</TableData>
                <TableData style={{ fontSize: "8px" }}>
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
                </TableData>
                <TableData>{getHumanReadableResult(result)}</TableData>
              </TableRow>
            )
          )}
        </Table>
      </CardContent>
    </CardWrapper>
  </>
);
