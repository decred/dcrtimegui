import React from "react";

export const DownloadFileLink = ({
  children,
  filename = "download.txt",
  mime = "text/plain;charset=utf-8",
  data
}) => (
  <a
    className="download-link"
    href={`data:${mime}, ${encodeURIComponent(data)}`}
    download={filename}
    >
      {children}
  </a>
);
