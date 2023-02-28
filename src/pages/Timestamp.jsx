import React, { useState } from "react";
import TimestampForm from "src/components/Timestamp";
import Page from "src/components/Layout/Page";
import MainSection from "src/components/MainSection";
import LatestHashes from "src/components/LatestHashesSection";

const Timestamp = () => {
    const [fetchLast, setFetchLast] = useState(false);
    return (
        <Page>
            <MainSection>
                <TimestampForm handleFetchLast={() => setFetchLast(true)} />
            </MainSection>
            <LatestHashes fetchLast={fetchLast} setFetchLast={setFetchLast} />
        </Page>
    );
};

export default Timestamp;
