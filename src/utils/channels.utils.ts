import * as chains from "../config/chains.json";


/**
 * Returns the channel identifier for a specific paring of AMB, origin chain, and destination chain.
 * @dev The function's output can be expected to be a number.
 */
export const getChains = <
  ArbitraryMessagingBridge extends keyof typeof chains,
  FromChain extends keyof typeof chains[ArbitraryMessagingBridge],
  ToChain extends keyof typeof chains[ArbitraryMessagingBridge][FromChain]
>(
  arbitraryMessagingBridge: ArbitraryMessagingBridge,
  fromChain: FromChain,
  toChain: ToChain
) => {
  const bridgeConfig = chains[arbitraryMessagingBridge];
  if (bridgeConfig === undefined) throw new Error(
    `${String(arbitraryMessagingBridge)} is not found`,
  );
  const bridgeOriginChains = bridgeConfig[fromChain];
  if (bridgeOriginChains === undefined) throw new Error(
    `${String(fromChain)} is not a supported origin chain for ${String(arbitraryMessagingBridge)}`
  );
  const channelIdentifier = bridgeOriginChains[toChain];
  if (channelIdentifier === undefined) throw new Error(
    `${String(toChain)} is not a valid destination chain from ${String(fromChain)} using ${arbitraryMessagingBridge}`
  );

  return channelIdentifier;
}
