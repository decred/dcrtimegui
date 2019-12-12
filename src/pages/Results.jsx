import React from "react";
import ModalResultsInfo from "src/components/ModalResultsInfo";
import Page from "src/components/Layout/Page";
import Title from "src/components/Title";
import Results from "src/components/Results";

const ResultsPage = () => {
  return (
    <Page>
      <Title title="Results" modal={ModalResultsInfo} />
      <Results />
    </Page>
  );
};

export default ResultsPage;
