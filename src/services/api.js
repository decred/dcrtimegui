import "isomorphic-fetch";
import { digestPayload } from "../helpers/bytes";

const apiBase = "api";
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

const POST = (path, json) =>
  fetch(getUrl(path), getOptions(json, "POST")).then(parseResponseBody).catch(err => console.log(err));

export const timestampFiles = (files, id) =>
  POST("timestamp/", {
    digests: files.map(file => digestPayload(file.payload))
  });

export const verifyFiles = (files, id) =>
  POST("verify/", {
    digests: files.map(file => digestPayload(file.payload))
  });
