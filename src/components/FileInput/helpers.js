import { digestPayload } from "src/helpers/dcrtime";

// processFiles adds the base64 payload into the file data
export const processFiles = files =>
    new Promise((resolve, reject) => {
        const processedFiles = [];
        if (files.length === 0) {
            resolve([]);
        }
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (f => event => {
                if (f.size >= 75000000) reject(Error(`Input field file '${f.name}' is too big (size: ${f.size/1000000}mb). Max size is 75mb.`));
                const payload = event.target.result.split(",")[1];
                processedFiles.push({
                    name: f.name,
                    payload,
                    digest: digestPayload(payload)
                });
                if (processedFiles.length === files.length) resolve(processedFiles);
            })(file);
            reader.readAsDataURL(file);
        });
    });
