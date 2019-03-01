export const formatDigestToDownload = ({name, transaction, date, result}) => {
    return JSON.stringify({
        "file": name,
        "transaction": `https://explorer.dcrdata.org/tx/${transaction}`,
        "achoredDate": date,
        "fullResult": result,
    });
}
