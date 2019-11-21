import { digestPayload } from "src/helpers/dcrtime";
import { setDigestName } from "src/helpers/localstorage";

// processFiles adds the base64 payload into the file data
export const processFiles = files =>
  new Promise(resolve => {
    const processedFiles = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (f => event => {
        const payload = event.target.result.split(",")[1];
        const digest = digestPayload(payload);
        setDigestName(digest, f.name);
        processedFiles.push({
          name: f.name,
          payload,
          digest
        });
        if (processedFiles.length === files.length) resolve(processedFiles);
      })(file);
      reader.readAsDataURL(file);
    });
  });
