import React from "react";
import Page from "src/components/Layout/Page";
import MainSection from "src/components/MainSection";
import LatestHashes from "src/components/LatestHashesSection";

const Verify = () => {
    return (
        <Page>
            <MainSection>
                <div>Verify here!</div>
            </MainSection>
            <LatestHashes />
        </Page>
    );
};

export default Verify;
