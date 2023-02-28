import React from "react";
import Page from "src/components/Layout/Page";
import Results from "src/components/Results";
import MainSection from "src/components/MainSection";
import LatestHashes from "src/components/LatestHashesSection";

const ResultsPage = () => {
    return (
        <Page>
            <MainSection>
                <Results />
            </MainSection>
            <LatestHashes />
        </Page>
    );
};

export default ResultsPage;
