import * as fs from 'fs';
import { parse, isInteger } from 'lossless-json';
import * as path from 'path';
import { capatalise, fileHeader, write } from './utils';

function bigIntReplacer(_: string, value: any): any {
  if (typeof value === 'bigint') {
    return '0x' + value.toString(16).padStart(64, '0');
  }
  return value;
}

// parse integer values into a bigint, and use a regular number otherwise
function customNumberParser(value: string) {
  return isInteger(value) ? BigInt(value) : parseFloat(value);
}

const configRelativePath = path.join(__dirname, '../config');

const jsonData = fs.readFileSync(`${configRelativePath}/chains.json`, 'utf8');
const remappings = fs.readFileSync(`${configRelativePath}/chainNameToId.json`, 'utf8');

// remap all chain names to ids.
const parsedJson = parse(jsonData, null, customNumberParser) as {
  [bridge: string]: { [from: string]: { [to: string]: BigInt } };
};
const parsedRemappings = parse(remappings) as { [name: string]: string };

function convertChainsToTypeScript() {
  // Convert the chain names into chain ids.
  const reconstructedJson: typeof parsedJson = {};
  for (const bridge of Object.keys(parsedJson)) {
    const selectedBridge = parsedJson[bridge];
    const reconstructedBridge: (typeof parsedJson)[string] = {};
    for (const fromChain of Object.keys(selectedBridge)) {
      const selectedFromChain = selectedBridge[fromChain];
      const reconstructedFromChain: (typeof reconstructedBridge)[string] = {};
      for (const toChain of Object.keys(selectedFromChain)) {
        const translatedToChain = parsedRemappings[toChain];
        if (translatedToChain === undefined) throw new Error(`${toChain} not found in remappings`);
        reconstructedFromChain[translatedToChain] = selectedFromChain[toChain];
      }
      const translatedFromChain = parsedRemappings[fromChain];
      if (translatedFromChain === undefined) throw new Error(`${fromChain} not found in remappings`);
      reconstructedBridge[translatedFromChain] = reconstructedFromChain;
    }
    reconstructedJson[bridge] = reconstructedBridge;
  }

  // Write chainsConfig.ts
  const stringifiedChainsConfig = JSON.stringify(reconstructedJson, bigIntReplacer, 2);
  let chainsConfigContent = fileHeader;

  chainsConfigContent += `export const chains: Record<string, Record<string, Record<string, string>>> = ${stringifiedChainsConfig};`;
  write('../config/chainsConfig.ts', chainsConfigContent, 'chainsConfig');

  // Generate the reverse chain names.
  const reversedParsedRemappings: { [key: string]: string } = {};
  for (const obj of Object.keys(parsedRemappings)) {
    reversedParsedRemappings[parsedRemappings[obj]] = obj;
  }

  // Write chainsName.ts
  const stringifiedChainsName = JSON.stringify(parsedRemappings, null, 2);
  const stringifiedReverseChainsName = JSON.stringify(reversedParsedRemappings, bigIntReplacer, 2);
  let chainsNameContent = fileHeader;

  chainsNameContent += `export const chainsName: Record<string, string> = ${stringifiedChainsName};\n\n`;
  chainsNameContent += `export const reverseChainsName: Record<string, string> = ${stringifiedReverseChainsName};`;
  write('../config/chainsName.ts', chainsNameContent, 'chainsName');
}

// Replace 'input.json' and 'output.ts' with your file paths
convertChainsToTypeScript();
