import React from "react";
import Page from "src/components/Layout/Page";
import MainSection from "src/components/MainSection";
import LatestHashes from "src/components/LatestHashesSection";
import VerifyForm from "src/components/Verify";

const Verify = () => {
    return (
        <Page>
            <MainSection>
                <VerifyForm/>
            </MainSection>
            <LatestHashes />
        </Page>
    );
};

export default Verify;
