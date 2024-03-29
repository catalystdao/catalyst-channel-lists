import { ArbitraryMessagingBridge } from '../enums';
import { ChainsStructure, RawChainsStructure } from '../types';
import { chains } from '../config/chainsConfig';
import { chainsName, reverseChainsName } from '../config/chainsName';

/**
 * Returns the channel identifier for a specific paring of AMB, origin chain, and destination chain.
 */
export function getChannel(
  arbitraryMessagingBridge: ArbitraryMessagingBridge | keyof ChainsStructure,
  fromChain: string,
  toChain: string,
): bigint {
  const bridgeConfig = chains[
    arbitraryMessagingBridge
  ] as RawChainsStructure[string];
  if (bridgeConfig === undefined)
    throw new Error(`${String(arbitraryMessagingBridge)} is not found`);
  const bridgeOriginChains = bridgeConfig[fromChain];
  if (bridgeOriginChains === undefined)
    throw new Error(
      `${String(fromChain)} is not a supported origin chain for ${String(arbitraryMessagingBridge)}`,
    );
  const channelIdentifier = BigInt(bridgeOriginChains[toChain]);
  if (channelIdentifier === undefined)
    throw new Error(
      `${String(toChain)} is not a valid destination chain from ${String(fromChain)} using ${arbitraryMessagingBridge}`,
    );

  return channelIdentifier;
}

/**
 * Given a chainId returns the chain name.
 */
export function getChainName(
  chainName: string | keyof typeof reverseChainsName,
): string | undefined {
  return reverseChainsName[chainName];
}

/**
 * Given a chain name returns the chain id.
 */
export function getChainId(
  chainId: string | keyof typeof chainsName,
): string | undefined {
  return chainsName[chainId];
}
