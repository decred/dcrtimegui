import styled from "styled-components";
import { H1, Card, theme } from "cobra";
import { flexColumnCenter } from "../styles";

export const TabWrapper = styled.div`
  ${flexColumnCenter}
  padding: 20px 0 10px;
`;

export const Main = styled.div`
  margin: 0 auto;
  height: 100%;
  max-width: 800px;
`;

export const Title = styled(H1)`
  margin-bottom: 0;
  color: ${theme.primaryColor};
`;

export const SubTitle = styled.span`
  color: ${theme.mediumGrayColor};
`;

export const CardTitle = styled.span`
  text-transform: uppercase;
  color: ${theme.primaryColor};
`;

export const CardWrapper = styled(Card)`
  ${flexColumnCenter}
  margin-top: 10px;
  width: 80%;
`;

export const CardContent = styled.div`
  padding: 12px;
`;
