export interface ChainsStructure {
  [arbitraryMessagingBridge: string]: {
    [fromChain: string]: {
      [toChain: string]: BigInt;
    };
  };
}

export interface RawChainsStructure {
  [arbitraryMessagingBridge: string]: {
    [fromChain: string]: {
      [toChain: string]: string;
    };
  };
}
