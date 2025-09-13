export const isExternalURL = (url: string) => {
  const pattern = /^(https?:\/\/|\/\/)/i;
  return pattern.test(url);
};
