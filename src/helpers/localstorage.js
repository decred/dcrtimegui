export const setDigestName = (digest, name) => {
  localStorage.setItem(digest, name);
};

export const getDigestName = digest => {
  return localStorage.getItem(digest);
};
