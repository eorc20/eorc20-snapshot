import fs from "fs";
import { parseTransaction } from "viem";
import readline from "readline";
import { Download } from "./download.js";
import { eorc20 } from "./utils.js";

const writer = fs.createWriteStream("pushtx-filter.jsonl");
const tokens = new Map<string, number>();

// create a readline interface for reading the file line by line
const rl = readline.createInterface({
  input: fs.createReadStream('pushtx.jsonl'),
  crlfDelay: Infinity
});

interface Filter {
  trx_id: string;
  timestamp: string;
  to: `0x${string}`;
}

// read each line of the file and parse it as JSON
rl.on('line', (line) => {
  const download = JSON.parse(line) as Download;
  // fix download data
  download.eos_block_number = Number(download.eos_block_number);
  const tx = parseTransaction(`0x${download.rlptx}`);
  if ( !tx.to) return;
  if ( !tx.nonce) return;
  if ( !tx.gas) return;
  if ( !tx.gasPrice) return;

  if ( tx.data === eorc20 ) {
    const row: Filter = {
      to: tx.to,
      trx_id: download.evm_trx_id,
      timestamp: download.timestamp,
    };
    writer.write(JSON.stringify(row) + "\n");
    tokens.set(tx.to, 1 + (tokens.get(tx.to) || 0));
  }
});

// log the parsed JSON objects once the file has been fully read
rl.on('close', () => {
  console.log("done");
  fs.writeFileSync("tokens.json", JSON.stringify([...tokens.entries()]));
});
