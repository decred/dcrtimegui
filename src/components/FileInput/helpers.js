import { digestPayload } from "src/helpers/dcrtime";
import CryptoJS from "crypto-js";
import {ERROR_INVALID_HASH_ON_FILE, ERROR_INVALID_HASHES_FILE} from "src/constants";

// processFiles adds the base64 payload into the file data
export const processFiles = (files, isVerify) =>
    new Promise((resolve, reject) => {
        const processedFiles = [];
        if (files.length === 0) {
            resolve([]);
        }
        files.forEach((file, idx) => {
            const reader = new FileReader();
            reader.onload = (f => event => {
                if (f.size >= 75000000) reject(Error(`Input field file '${f.name}' is too big (size: ${f.size/1000000}mb). Max size is 75mb.`));
                const payload = event.target.result.split(",")[1];
                if (f.type === "application/json" && f.name === "hashes.json" && isVerify) {
                    // it is a hashes file
                    const words = CryptoJS.enc.Base64.parse(payload);
                    const textString = CryptoJS.enc.Utf8.stringify(words);
                    const hashes = JSON.parse(textString);
                    if (!Array.isArray(hashes)) {
                        reject({key: ERROR_INVALID_HASHES_FILE});
                        return;
                    }
                    hashes.forEach(hash => {
                        if (hash.length !== 64) {
                            reject({key: ERROR_INVALID_HASH_ON_FILE, options: {hash: hash}});
                        }
                        processedFiles.push({
                            name: f.name,
                            digest: hash
                        });
                    });
                }
                else {
                    processedFiles.push({
                        name: f.name,
                        payload,
                        digest: digestPayload(payload)
                    });
                }
                if (idx === files.length - 1) {
                    resolve(processedFiles);
                }
            })(file);
            reader.readAsDataURL(file);
        });
    });
