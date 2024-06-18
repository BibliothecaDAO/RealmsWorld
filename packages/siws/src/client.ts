import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";
import schema from "./sign-in-schema.json";
import abiAccountContract from "./account-contract-abi.json";
import {
  ErrorTypes,
  SignInWithStarknetError,
  SignInWithStarknetResponse,
  VerifyParams,
  VerifyOpts,
} from "./types";
import {
  TypedData,
  typedData,
  num,
  RpcProvider,
  Contract,
  shortString,
  BigNumberish,
} from "starknet";

import { ISiwsTypedData, ISiwsDomain, ISiwsMessage } from "./types";

import getMessageHash = typedData.getMessageHash;

export class SiwsTypedData implements ISiwsTypedData {
  domain: ISiwsDomain;
  message: ISiwsMessage;
  primaryType: string;
  types: {
    Message: Array<{ name: string; type: string }>;
    StarknetDomain: Array<{ name: string; type: string }>;
  };

  constructor(
    domain: ISiwsDomain,
    message: ISiwsMessage,
    primaryType?: string,
    types?: any
  ) {
    this.domain = domain;
    this.message = message;
    if (primaryType != null) {
      this.primaryType = primaryType;
    } else {
      this.primaryType = "Message";
    }
    if (types != null) {
      this.types = types;
    } else {
      this.types = {
        Message: [
          { name: "address", type: "felt" },
          { name: "statement", type: "string" },
          { name: "uri", type: "string" },
          { name: "nonce", type: "string" },
          { name: "issuedAt", type: "string" },
          { name: "version", type: "felt" },
        ],
        StarknetDomain: [
          { name: "name", type: "string" },
          { name: "chainId", type: "string" },
          { name: "version", type: "string" },
          { name: "revision", type: "string" },
        ],
      };
    }

    // Perform validation
    this.validateData();
  }

  // Method to convert the object to a JSON string
  toJson(): string {
    return JSON.stringify(this);
  }

  public validateData(): boolean {
    const ajv = new Ajv2020({ allErrors: true, strict: true });
    addFormats(ajv);
    ajvErrors(ajv);

    const validate = ajv.compile(schema);

    const dataForValidation = {
      domain: this.domain,
      message: this.message,
      primaryType: this.primaryType,
      types: this.types,
    };

    // Perform validation
    if (!validate(dataForValidation)) {
      const errors = validate.errors;
      // console.log(validate.errors);
      const errorMessage = errors
        .map((error) => `${error.instancePath} ${error.message}`)
        .join(". ");
      throw new SignInWithStarknetError(errorMessage as ErrorTypes);
    }
    return true;
  }

  // Static method to create an instance from a JSON blob
  public static fromJson(json: string): SiwsTypedData {
    const obj = JSON.parse(json);
    return new SiwsTypedData(
      obj.domain,
      obj.message,
      obj.primaryType,
      obj.types
    );
  }

  async verifyMessageHash(
    hash: BigNumberish,
    signature: string[],
    provider: RpcProvider
  ): Promise<boolean> {
    try {
      const accountContract = new Contract(
        abiAccountContract,
        this.message.address,
        provider
      );
      await accountContract.call("isValidSignature", [hash, signature]);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async verifyMessage(
    data: TypedData,
    signature: string[],
    provider: RpcProvider
  ): Promise<boolean> {
    const hash = await getMessageHash(data, this.message.address);
    return this.verifyMessageHash(hash, signature, provider);
  }

  /**
   * Validates the integrity of the object by matching it's signature.
   * @param params Parameters to verify the integrity of the message, signature is required.
   * @returns {Promise<SignInWithStarknetResponse>} This object if valid.
   */
  public async verify(
    params: VerifyParams,
    opts: VerifyOpts
  ): Promise<SignInWithStarknetResponse> {
    return new Promise<SignInWithStarknetResponse>((resolve, reject) => {
      const { domain, nonce, network, signature } = params;

      /** check network/chain Id */
      if (network && network !== this.domain.chainId) {
        reject({
          success: false,
          data: this,
          error: new SignInWithStarknetError(
            ErrorTypes.NETWORK_MISMATCH,
            network,
            this.domain.chainId
          ),
        });
      }

      /** Domain binding */
      if (domain && domain !== this.domain.name) {
        reject({
          success: false,
          data: this,
          error: new SignInWithStarknetError(
            ErrorTypes.DOMAIN_MISMATCH,
            domain,
            this.domain.name
          ),
        });
      }

      /** Nonce binding */
      if (nonce && nonce !== this.message.nonce) {
        reject({
          success: false,
          data: this,
          error: new SignInWithStarknetError(
            ErrorTypes.NONCE_MISMATCH,
            nonce,
            this.message.nonce
          ),
        });
      }

      /** Check time */
      const checkTime = new Date();

      /** Expiry Checks */
      if (this.message.expirationTime) {
        const expirationDate = new Date(this.message.expirationTime);

        // Check if the message hasn't expired
        if (checkTime.getTime() >= expirationDate.getTime()) {
          resolve({
            success: false,
            data: this,
            error: new SignInWithStarknetError(
              ErrorTypes.EXPIRED_MESSAGE,
              `${checkTime.toISOString()} < ${expirationDate.toISOString()}`,
              `${checkTime.toISOString()} >= ${expirationDate.toISOString()}`
            ),
          });
        }
      }

      /** Message is valid already */
      if (this.message.notBefore) {
        const notBefore = new Date(this.message.notBefore);
        if (checkTime.getTime() < notBefore.getTime()) {
          resolve({
            success: false,
            data: this,
            error: new SignInWithStarknetError(
              ErrorTypes.EXPIRED_MESSAGE,
              `${checkTime.toISOString()} >= ${notBefore.toISOString()}`,
              `${checkTime.toISOString()} < ${notBefore.toISOString()}`
            ),
          });
        }
      }

      this.verifyMessage(this, signature, opts.provider)
        .then((valid) => {
          if (!valid)
            return reject({
              success: false,
              data: this,
              error: new SignInWithStarknetError(
                ErrorTypes.INVALID_SIGNATURE,
                "Signature verification failed"
              ),
            });
          return resolve({
            success: true,
            data: this,
          });
        })
        .catch(() => {
          return reject({
            success: false,
            data: this,
            error: new SignInWithStarknetError(
              ErrorTypes.INVALID_SIGNATURE,
              "Signature verfication failed. Check if you have an account created."
            ),
          });
        });
    });
  }
}
