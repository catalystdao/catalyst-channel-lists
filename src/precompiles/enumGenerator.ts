import * as chains from '../config/chains.json';
import { fileHeader, generateEnum, write } from './utils';

export function generateEnumsFromJson(name: string, enumKeys: string[]): string {
  let enumContent = fileHeader;

  // Generate AMB enums:
  enumContent += generateEnum(name, enumKeys);

  return enumContent;
}

// Generate enums from imported JSON data
const ambEnums = generateEnumsFromJson('ArbitraryMessagingBridge', Object.keys(chains));

// Write enums to TypeScript file
write('../enums/AMBs.enums.ts', ambEnums, 'AMB enums');
