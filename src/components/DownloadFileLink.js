import React from "react";
import { Link } from "cobra-ui";

export const DownloadFileLink = ({
  children,
  filename = "download.txt",
  mime = "text/plain;charset=utf-8",
  data
}) => (
  <Link href={`data:${mime}, ${encodeURIComponent(data)}`} download={filename}>
    {children}
  </Link>
);
