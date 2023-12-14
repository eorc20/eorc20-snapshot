import fs from "fs";
import readline from "readline";
import { Filter } from "./filter.js";
import logUpdate from 'log-update';
import { getTotalFromIndex } from "./compare.js";

const tokens = new Map<string, number>();
const writer = fs.createWriteStream("eoss-snapshot.csv");
writer.write("address,tokens,index\n");

// create a readline interface for reading the file line by line
const rl = readline.createInterface({
  input: fs.createReadStream('pushtx-filter.jsonl'),
  crlfDelay: Infinity
});

let current = 0
let total = 0;
let last_timestamp = "";

// read each line of the file and parse it as JSON
rl.on('line', (line) => {
  if ( total >= 21000000) return;
  const { to, timestamp } = JSON.parse(line) as Filter;
  tokens.set(to, 1 + (tokens.get(to) || 0));
  last_timestamp = timestamp;
  total += 1;
  const now = Math.floor(Date.now() / 1000);
  if ( current !== now ) {
    current = now;
    logUpdate(`total: ${total} | addresses: ${tokens.size} | last_timestamp: ${last_timestamp}\n`);
  }
});

// log the parsed JSON objects once the file has been fully read
rl.on('close', async () => {
  for ( const [address, count] of tokens.entries() ) {
    if ( count > 10000 ) continue;
    const index = await getTotalFromIndex(address);
    writer.write(`${address},${count},${index}\n`);
  }
  logUpdate(`total: ${total} | addresses: ${tokens.size} | last_timestamp: ${last_timestamp}\n`);
});
