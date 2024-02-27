import * as fs from 'fs';
import { parse, isInteger } from 'lossless-json';
import * as path from 'path';

function bigIntReplacer(key: string, value: any): any {
  if (typeof value === 'bigint') {
    return value.toString() + 'n';
  }
  return value;
}

// parse integer values into a bigint, and use a regular number otherwise
function customNumberParser(value: string) {
  return isInteger(value) ? BigInt(value) : parseFloat(value);
}

function convertJsonToTypeScript(
  jsonFilePath: string,
  outputFilePath: string,
  variableName: string = 'data',
) {
  const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
  const parsedJson = parse(jsonData, null, customNumberParser);
  const stringifiedJson = JSON.stringify(parsedJson, bigIntReplacer, 2);
  const tsContent = `export const ${variableName} = ${stringifiedJson};`;
  fs.writeFileSync(outputFilePath, tsContent, 'utf8');
}

const configRelativePath = path.join(__dirname, '../config');

// Replace 'input.json' and 'output.ts' with your file paths
convertJsonToTypeScript(
  `${configRelativePath}/chains.json`,
  `${configRelativePath}/chainsConfig.ts`,
  'chains',
);

console.log('Converted JSON into object successfully!');
