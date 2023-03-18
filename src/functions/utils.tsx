export const decodeAndSplit = (str: any) => {
  return decodeURIComponent(str).split("&");
};

export const convertToJSON = (params: any) => {
  const result: any = {};
  for (const param of params) {
    const [key, value] = param.split("=");
    result[key] = value;
  }
  return result;
};
