import fs from "fs";
import readline from "readline";
import { Filter } from "./filter.js";

const tokens = new Map<string, number>();
const writer = fs.createWriteStream("eoss-snapshot.csv");

// create a readline interface for reading the file line by line
const rl = readline.createInterface({
  input: fs.createReadStream('pushtx-filter.jsonl'),
  crlfDelay: Infinity
});

// read each line of the file and parse it as JSON
rl.on('line', (line) => {
  const { to } = JSON.parse(line) as Filter;
  tokens.set(to, 1 + (tokens.get(to) || 0));
});

// log the parsed JSON objects once the file has been fully read
rl.on('close', () => {
  for ( const [address, count] of tokens.entries() ) {
    writer.write(`${address},${count}\n`);
  }
});
