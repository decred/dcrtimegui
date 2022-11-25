import React from "react";
import Page from "src/components/Layout/Page";
import Results from "src/components/Results";
import MainSection from "src/components/MainSection";

const ResultsPage = () => {
    return (
        <Page>
            <MainSection>
                <Results />
            </MainSection>
        </Page>
    );
};

export default ResultsPage;
