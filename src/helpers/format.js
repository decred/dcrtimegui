export const formatDigestToDownload = ({name, transaction, date}) => {
    return JSON.stringify({
        "File": name,
        "Transaction": `https://testnet.dcrdata.org/tx/${transaction}`,
        "Anchored Date": date,
    });
}
