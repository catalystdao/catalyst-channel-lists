import { ArbitraryMessagingBridge } from '../enums';
import { ChainsStructure, RawChainsStructure } from '../types';
import { chains } from '../config/chainsConfig';

/**
 * Returns the channel identifier for a specific paring of AMB, origin chain, and destination chain.
 */
export function getChannel(
  arbitraryMessagingBridge: ArbitraryMessagingBridge | keyof ChainsStructure,
  fromChain: string,
  toChain: string,
): BigInt {
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
  const channelIdentifier = BigInt(
    bridgeOriginChains[toChain].replace('n', ''),
  );
  if (channelIdentifier === undefined)
    throw new Error(
      `${String(toChain)} is not a valid destination chain from ${String(fromChain)} using ${arbitraryMessagingBridge}`,
    );

  return channelIdentifier;
}
