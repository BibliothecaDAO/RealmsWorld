import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'
import { TokenHolder, Delegate, Governance } from '../generated/schema';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export let BIGINT_ZERO = BigInt.fromI32(0);

export let BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);

export const DEFAULT_DECIMALS = 18

export function toDecimal(value: BigInt, decimals: number = DEFAULT_DECIMALS): BigDecimal {
  let precision = BigInt.fromI32(10)
    .pow(<u8>decimals)
    .toBigDecimal()

  return value.divDecimal(precision)
}

export function getOrCreateTokenHolder(
  id: String,
  createIfNotFound: boolean = true,
  save: boolean = true
): TokenHolder {
  let tokenHolder = TokenHolder.load(id as string);

  if (tokenHolder == null && createIfNotFound) {
    tokenHolder = new TokenHolder(id as string);
    tokenHolder.tokenBalanceRaw = BIGINT_ZERO;
    tokenHolder.tokenBalance = BIGINT_ZERO;
    tokenHolder.totalTokensHeldRaw = BIGINT_ZERO;
    tokenHolder.totalTokensHeld = BIGINT_ZERO;

    if (id != ZERO_ADDRESS) {
      let governance = getGovernanceEntity();
      governance.totalTokenHolders += 1;
      governance.save();
    }

    if (save) {
      tokenHolder.save();
    }
  }

  return tokenHolder as TokenHolder;
}

export function getOrCreateDelegate(
  id: String,
  createIfNotFound: boolean = true,
  save: boolean = true
): Delegate {
  let delegate = Delegate.load(id as string);

  if (delegate == null && createIfNotFound) {
    delegate = new Delegate(id as string);
    delegate.delegatedVotesRaw = BIGINT_ZERO;
    delegate.delegatedVotes = BIGINT_ZERO;
    delegate.tokenHoldersRepresentedAmount = 0;

    if (id != ZERO_ADDRESS) {
      let governance = getGovernanceEntity();
      governance.totalDelegates += 1;
      governance.save();
    }

    if (save) {
      delegate.save();
    }
  }

  return delegate as Delegate;
}

export function getGovernanceEntity(): Governance {
  let governance = Governance.load('GOVERNANCE');

  if (governance == null) {
    governance = new Governance('GOVERNANCE');
    governance.totalTokenHolders = 0;
    governance.currentTokenHolders = 0;
    governance.currentDelegates = 0;
    governance.totalDelegates = 0;
    governance.delegatedVotesRaw = BIGINT_ZERO;
    governance.delegatedVotes = BIGINT_ZERO;
  }

  return governance as Governance;
}