const crypto = require("crypto");

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

export const isStarknetAddress = (address: string) => {
  return address.length == 66;
};

export function hexToNumber(hexString: string, minValue = 1, maxValue = 10) {
  const hash = crypto.createHash("sha256");
  hash.update(hexString);
  const hexDigest = hash.digest("hex");
  const intValue = BigInt(`0x${hexDigest}`);
  const scaledValue =
    minValue + Number(intValue % BigInt(maxValue - minValue + 1));
  return scaledValue;
}

export function shortenHex(hexString: string, numDigits = 6) {
  if (hexString.length <= numDigits) {
    return hexString;
  }

  const halfDigits = Math.floor(numDigits / 2);
  const firstHalf = hexString.slice(0, halfDigits);
  const secondHalf = hexString.slice(-halfDigits);
  return `${firstHalf}...${secondHalf}`;
}

export function buildQueryString(queryObject: any) {
  const queryParams = Object.entries(queryObject)
    .map(([key, value]: any) => {
      if (typeof value === "object") {
        return Object.entries(value)
          .map(
            ([subKey, subValue]: any) =>
              `${encodeURIComponent(key)}[${encodeURIComponent(
                subKey
              )}]=${encodeURIComponent(subValue)}`
          )
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&")
    .replace(/%2B/g, "+");

  return `${queryParams}`;
}

export function formatQueryString(querybatch: any, type: string = "contract") {
  if (querybatch && Array.isArray(querybatch) && querybatch.length > 0) {
    const queryString = querybatch
      .map((contractObj) => `${type}=${contractObj[type]}`)
      .join("&");
    return queryString;
  }
  return "";
}
