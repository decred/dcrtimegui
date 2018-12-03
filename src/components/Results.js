import React from "react";
import { Message, Table, TableRow, TableData, TableHeader, Link } from "cobra";
import { CardWrapper, CardContent } from "./CommonComponents";

const getHumanReadableResult = result => {
  const mapCodeToMessage = {
    0: "Success",
    1: "File already existent",
    2: "File does not exist",
    3: "Disabled"
  };
  return mapCodeToMessage[result] || "Invalid result";
};

export const AuthenticationResult = ({
  files,
  result: { digests, results }
}) => (
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
          {digests.map((d, i) => (
            <TableRow key={`file-result-${i}`}>
              <TableData>{files[i].name}</TableData>
              <TableData style={{ fontSize: "8px" }}>{d}</TableData>
              <TableData>{getHumanReadableResult(results[i])}</TableData>
            </TableRow>
          ))}
        </Table>
      </CardContent>
    </CardWrapper>
  </>
);

export const VerificationResult = ({ files, result: { digests } }) => (
  <>
    <Message style={{ width: "80%" }} type="success" text="Files Verified!" />
    <CardWrapper>
      <CardContent>
        <Table>
          <TableRow>
            <TableHeader>File</TableHeader>
            <TableHeader>Transaction</TableHeader>
            <TableHeader>Result</TableHeader>
          </TableRow>
          {digests.map(
            (
              { result, chaininformation: { chaintimestamp, transaction } },
              i
            ) => (
              <TableRow key={`file-result-${i}`}>
                <TableData>{files[i].name}</TableData>
                <TableData style={{ fontSize: "8px" }}>
                  {chaintimestamp && transaction ? (
                    <Link
                      target="_blank"
                      href={`https://testnet.dcrdata.org/tx/${transaction}`}
                    >
                      {transaction}
                    </Link>
                  ) : (
                    "-"
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
