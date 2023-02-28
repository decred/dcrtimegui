export function toDate(input) {
    if (input instanceof Date) return input;
    // @ts-ignore
    if (!isNaN(input) || /^\d+$/.test(input)) return new Date(parseInt(input));
    input = (input || "")
        .trim()
        .replace(/\.\d+/, "") // remove milliseconds
        .replace(/-/, "/")
        .replace(/-/, "/")
        .replace(/(\d)T(\d)/, "$1 $2")
        .replace(/Z/, " UTC") // 2017-2-5T3:57:52Z -> 2017-2-5 3:57:52UTC
        .replace(/([+-]\d\d):?(\d\d)/, " $1$2"); // -04:00 -> -0400
    return new Date(input);
}

export function diffSec(date) {
    const relDate =  new Date();
    return (+relDate - +toDate(date)) / 1000;
}

export function timeago(date) {
    const diffS = diffSec(date);
    const diffH = diffS / 3600;
    if (diffH < 1) {
        return {key: "timeago.lastHour"};
    }

    if (diffH < 24) {
        return {key: "timeago.hAgo", options: {hours: Math.round(diffH)}};
    }

    const diffD = diffH / 24;

    return {key: "timeago.dAgo", options: {days: Math.round(diffD)}};
}
