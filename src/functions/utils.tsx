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
