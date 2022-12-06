import { digestPayload } from "src/helpers/dcrtime";
import CryptoJS from "crypto-js";

// processFiles adds the base64 payload into the file data
export const processFiles = files =>
    new Promise(resolve => {
        const processedFiles = [];
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (f => event => {
                const payload = event.target.result.split(",")[1];
                let resDigest = digestPayload(payload);
                if (f.type === "application/json") {
                    const words = CryptoJS.enc.Base64.parse(payload);
                    const textString = CryptoJS.enc.Utf8.stringify(words);
                    const json = JSON.parse(textString);
                    if (json.digest) {
                        resDigest = json.digest;
                    }
                }
                processedFiles.push({
                    name: f.name,
                    payload,
                    digest: resDigest
                });
                if (processedFiles.length === files.length) resolve(processedFiles);
            })(file);
            reader.readAsDataURL(file);
        });
    });
