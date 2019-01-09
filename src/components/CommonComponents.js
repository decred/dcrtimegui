import styled from "styled-components";
import { H1, Card, theme } from "cobra-ui";
import { flexColumnCenter } from "../styles";

export const ContentWrapper = styled.div`
  ${flexColumnCenter}
  padding: 20px 0;
  width: 100%;
`;

export const Main = styled.div`
  margin: 0 auto;
  max-width: 800px;
  text-align: center;
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
`;

export const CardContent = styled.div`
  padding: 12px;
  width: 100%;
`;

export const ResultsData = styled.span`
  padding: 14px 6px;
  min-width: 110px;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const ListItemHeader = styled.span`
  padding: 14px 6px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 110px;
  font-weight: 600;
  color: ${theme.primaryColor};
`;
