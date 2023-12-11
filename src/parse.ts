import { parseTransaction } from "viem";
import readline from "readline";
import * as jsonl from "node-jsonl";
import { Download } from "./download.js";
import fs from "fs";

const eorc20 = "0x646174613a2c7b2270223a22656f72633230222c226f70223a226d696e74222c227469636b223a22656f7373222c22616d74223a223130303030227d"

// create a readline interface for reading the file line by line
const rl = readline.createInterface({
  input: fs.createReadStream('pushtx.jsonl'),
  crlfDelay: Infinity
});

interface Parse extends Download {
  to: `0x${string}`;
  nonce: number;
  gas: number;
  gasPrice: number;
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
    const row: Parse = {
      ...download,
      to: tx.to,
      nonce: tx.nonce,
      gas: Number(tx.gas),
      gasPrice: Number(tx.gasPrice),
    };
    console.log(row);
  }
});

// log the parsed JSON objects once the file has been fully read
rl.on('close', () => {
  console.log("done");
});

// const rlptx = "0xf86d830b916e8522ecb25c008301e84894bbbbbbbbbbbbbbbbbbbbbbbb55318063a000000080b83c646174613a2c7b2270223a22656f72633230222c226f70223a226d696e74222c227469636b223a22656f7373222c22616d74223a223130303030227d1b808855318063a0000000";

// const tx = parseTransaction(rlptx);

// console.log(tx);