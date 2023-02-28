import { DCRDATA_URL } from "src/constants";

const dcrdataApi = `${DCRDATA_URL}/api`;

const POST = (path, params) => {
    return fetch(path, {
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(params)
    }).then(function (response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    });
};

export const getTxsInfo = async (transactions) => {
    if (!transactions || transactions.length === 0) {
        throw new TypeError("Transactions must be a non empty array of Txs");
    }
    const txs = {
        transactions
    };
    const res = await POST(`${dcrdataApi}/txs`, txs);
    return res;
};