import { BigInt } from '@graphprotocol/graph-ts'
import { DelegateChanged, DelegateVotesChanged, Transfer } from '../generated/RealmLordship/RealmLordship'
import {
  getOrCreateTokenHolder,
  getOrCreateDelegate,
  getGovernanceEntity,
  ZERO_ADDRESS,
  BIGINT_ZERO
} from './helpers'

export function handleDelegateChanged(event: DelegateChanged): void {
  let tokenHolder = getOrCreateTokenHolder(event.params.delegator.toHexString())
  let previousDelegate = getOrCreateDelegate(event.params.fromDelegate.toHexString())
  let newDelegate = getOrCreateDelegate(event.params.toDelegate.toHexString())

  tokenHolder.delegate = newDelegate.id
  tokenHolder.save()

  previousDelegate.tokenHoldersRepresentedAmount -= 1
  previousDelegate.save()

  newDelegate.tokenHoldersRepresentedAmount += 1
  newDelegate.save()
}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  let governance = getGovernanceEntity()
  let delegate = getOrCreateDelegate(event.params.delegate.toHexString())
  let votesDifference = event.params.newVotes.minus(event.params.previousVotes)

  delegate.delegatedVotes = event.params.newVotes
  delegate.delegatedVotesRaw = event.params.newVotes

  delegate.save()

  if (event.params.previousVotes == BIGINT_ZERO && event.params.newVotes > BIGINT_ZERO) {
    governance.currentDelegates += 1
  }

  if (event.params.newVotes == BIGINT_ZERO) {
    governance.currentDelegates -= 1
  }

  governance.delegatedVotes = governance.delegatedVotes.plus(votesDifference)
  governance.delegatedVotesRaw = governance.delegatedVotes.plus(votesDifference)

  governance.save()
}

export function handleTransfer(event: Transfer): void {
  let fromHolder = getOrCreateTokenHolder(event.params.from.toHexString())
  let toHolder = getOrCreateTokenHolder(event.params.to.toHexString())
  let governance = getGovernanceEntity()

  if (event.params.from.toHexString() != ZERO_ADDRESS) {
    let fromHolderpreviousVotes = fromHolder.tokenBalance
    fromHolder.tokenBalance = fromHolder.tokenBalance.minus(BigInt.fromU32(1))
    fromHolder.tokenBalanceRaw = fromHolder.tokenBalance

    if (fromHolder.tokenBalance == BIGINT_ZERO && fromHolderpreviousVotes > BIGINT_ZERO) {
      governance.currentTokenHolders -= 1
      governance.save()
    } else if (fromHolder.tokenBalance > BIGINT_ZERO && fromHolderpreviousVotes == BIGINT_ZERO) {
      governance.currentTokenHolders += 1
      governance.save()
    }

    fromHolder.save()
  }

  let toHolderpreviousVotes = toHolder.tokenBalance
  toHolder.tokenBalance = toHolder.tokenBalance.plus(BigInt.fromU32(1))
  toHolder.tokenBalanceRaw = toHolder.tokenBalance.plus(BigInt.fromU32(1))
  toHolder.totalTokensHeldRaw = toHolder.totalTokensHeld.plus(BigInt.fromU32(1))
  toHolder.totalTokensHeld = toHolder.totalTokensHeld.plus(BigInt.fromU32(1))

  if (toHolder.tokenBalance == BIGINT_ZERO && toHolderpreviousVotes > BIGINT_ZERO) {
    governance.currentTokenHolders -= 1
    governance.save()
  } else if (toHolder.tokenBalance > BIGINT_ZERO && toHolderpreviousVotes == BIGINT_ZERO) {
    governance.currentTokenHolders += 1
    governance.save()
  }

  toHolder.save()
}