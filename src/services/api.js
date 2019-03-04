import "isomorphic-fetch";
import { digestPayload } from "../helpers/bytes";

const apiBase =
  process.env.REACT_APP_NETWORK === "testnet"
    ? "https://time-testnet.decred.org:59152"
    : "https://time.decred.org:49152";

const getUrl = (path, version = "v1") => `${apiBase}/${version}/${path}`;

const getOptions = (json, method) => ({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  method,
  body: JSON.stringify(json)
});

const parseResponseBody = response => {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json"))
    return response.json();
  const err = new Error("Invalid server response");
  err.internalError = true;
  err.statusCode = response.status;
  throw err;
};

const parseResponse = response =>
  parseResponseBody(response).then(json => {
    if (json.error) {
      const err = new Error(json.error);
      err.internalError = false;
      err.errorID = json.error;
      throw err;
    }
    return json;
  });

const POST = (path, json) =>
  fetch(getUrl(path), getOptions(json, "POST")).then(parseResponse);

export const timestampFiles = (files, id) =>
  POST("timestamp/", {
    digests: files.map(file => file.digest)
  });

export const verifyFiles = (files, id) =>
  POST("verify/", {
    digests: files.map(file => file.digest)
  });
