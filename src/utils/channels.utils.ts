import { ArbitraryMessagingBridge } from '../enums';
import { chains } from '../config/chainsConfig';
import { chainsName, reverseChainsName } from '../config/chainsName';

/**
 * Returns the channel identifier for a specific paring of AMB, origin chain, and destination chain or null if it does not exist.
 */
export function getChannel(
  arbitraryMessagingBridge: ArbitraryMessagingBridge,
  fromChain: string,
  toChain: string,
): bigint | null {
  const channelIdentifier = getChannelIdentifier(
    arbitraryMessagingBridge,
    fromChain,
    toChain,
  );
  if (channelIdentifier === null) {
    return channelIdentifier;
  }
  return BigInt(channelIdentifier);
}

/**
 * Returns the channel identifier for a specific paring of AMB, origin chain, and destination chain.
 */
export function getChannelOrThrowj(
  arbitraryMessagingBridge: ArbitraryMessagingBridge,
  fromChain: string,
  toChain: string,
): bigint {
  const channel = getChannel(arbitraryMessagingBridge, fromChain, toChain);
  if (channel === null) {
    throw new Error(
      `Unable to find channel for ${arbitraryMessagingBridge} between chains ${fromChain} and ${toChain}!`,
    );
  }
  return channel;
}

/**
 * Returns the channel string identifier for a specific paring of AMB, origin chain, and destination chain or null if it does not exist.
 */
export function getChannelIdentifier(
  arbitraryMessagingBridge: ArbitraryMessagingBridge,
  fromChain: string,
  toChain: string,
): string | null {
  const bridgeConfig = chains[arbitraryMessagingBridge];
  if (bridgeConfig === undefined) {
    return null;
  }
  const bridgeOriginChains = bridgeConfig[fromChain];
  if (bridgeOriginChains === undefined) {
    return null;
  }
  const channelIdentifier = bridgeOriginChains[toChain];
  if (channelIdentifier === undefined) {
    return null;
  }

  return channelIdentifier;
}

/**
 * Returns the channel string identifier for a specific paring of AMB, origin chain, and destination chain.
 */
export function getChannelIdentifierOrThrow(
  arbitraryMessagingBridge: ArbitraryMessagingBridge,
  fromChain: string,
  toChain: string,
): string {
  const channelIdentifier = getChannelIdentifier(
    arbitraryMessagingBridge,
    fromChain,
    toChain,
  );
  if (channelIdentifier === null) {
    throw new Error(
      `Unable to find channel identifier for ${arbitraryMessagingBridge} between chains ${fromChain} and ${toChain}!`,
    );
  }
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
