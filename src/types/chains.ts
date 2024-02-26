import * as chains from "../config/chains.json";
import { ArbitraryMessagingBridge } from "./bridges";

export type fromChains = keyof typeof chains[ArbitraryMessagingBridge];

export type toChains = keyof typeof chains[ArbitraryMessagingBridge][fromChains];
