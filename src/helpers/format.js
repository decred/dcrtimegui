export const formatDigestToDownload = ({name, transaction, date, result}) => {
    return JSON.stringify({
        "File": name,
        "Transaction": `https://testnet.dcrdata.org/tx/${transaction}`,
        "Anchored Date": date,
        "Full Response": result,
    });
}
