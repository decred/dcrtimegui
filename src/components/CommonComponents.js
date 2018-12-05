import styled from "styled-components";
import { H1, Card, theme, TableData } from "cobra";
import { flexColumnCenter } from "../styles";

export const ContentWrapper = styled.div`
  ${flexColumnCenter}
  padding: 20px 0;
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
  width: 80%;
`;

export const CardContent = styled.div`
  padding: 12px;
  width: 100%;
`;

export const ResultsTableData = styled(TableData)`
  max-width: 130px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
