import fs from "fs";
import readline from "readline";
import { Filter } from "./filter.js";
import logUpdate from 'log-update';

const tokens = new Map<string, number>();
const writer = fs.createWriteStream("eoss-snapshot.csv");
writer.write("address,tokens\n");

// create a readline interface for reading the file line by line
const rl = readline.createInterface({
  input: fs.createReadStream('pushtx-filter.jsonl'),
  crlfDelay: Infinity
});

let timestamp = 0
let total = 0;

// read each line of the file and parse it as JSON
rl.on('line', (line) => {
  if ( total >= 21000000) return;
  const { to } = JSON.parse(line) as Filter;
  tokens.set(to, 1 + (tokens.get(to) || 0));
  total += 1;
  const now = Math.floor(Date.now() / 1000);
  if ( timestamp !== now ) {
    timestamp = now;
    logUpdate(`${total}\n`);
  }
});

// log the parsed JSON objects once the file has been fully read
rl.on('close', () => {
  for ( const [address, count] of tokens.entries() ) {
    writer.write(`${address},${count}\n`);
  }
  logUpdate(`${total}\n`);
});
