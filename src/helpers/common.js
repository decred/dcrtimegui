import { timestampFiles } from "../services/api";

export const handleTimestampFiles = async (files, setLoading, setError) => {
  setLoading(true);
  try {
    const res = await timestampFiles(files, "file");
    setLoading(false);
    return res;
  } catch (e) {
    setLoading(false);
    setError(e);
  }
};
