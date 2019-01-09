import React, { useState } from "react";
import { Button } from "cobra-ui";
import "../../node_modules/primer-tooltips/build/build.css";

export const CopyToClipboard = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = text => {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    setCopied(true);
  };

  return (
    <Button
      size="xs"
      onClick={() => copyToClipboard(text)}
      onMouseLeave={() => setCopied(false)}
      className={copied ? "tooltipped tooltipped-s" : null}
      aria-label="Copied!"
      style={{
        marginLeft: "5px",
        marginBottom: "0px",
        padding: ".2em .4em",
        transform: "none"
      }}
    >
      <img alt="Copy" width="15" src={"assets/clippy.svg"} />
    </Button>
  );
};
