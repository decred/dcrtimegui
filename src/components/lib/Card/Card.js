import React from "react";
import styled from "styled-components";

export const CardWrapper = styled.div`
  background: white;
`;

export const CardTitle = styled.div`
  font-size: 18px;
  padding: 2em;
`;

export const CardContent = styled.div``;

const Card = ({ title, children, style, ...props }) => (
  <CardWrapper style={style} {...props}>
    {title && typeof title === String ? <CardTitle>{title}</CardTitle> : null}
    {children}
  </CardWrapper>
);

export default Card;
