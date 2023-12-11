import { Clock } from "@substreams/core/proto";
import fs from "fs";
import { parseTransaction } from "viem";

export function clockToDay(clock: Clock) {
    if ( !clock.timestamp ) throw new Error("No timestamp in clock");
    const day = Math.floor(Number(clock.timestamp.seconds) / 86400) * 86400 * 1000;
    return new Date(day).toISOString();
}

export const eorc20 = "0x646174613a2c7b2270223a22656f72633230222c226f70223a226d696e74222c227469636b223a22656f7373222c22616d74223a223130303030227d"

export function isEORC20(rlptx: string) {
  const tx = parseTransaction(`0x${rlptx}`);
  return tx.data === eorc20;
}

export function readCursor() {
    if ( fs.existsSync("cursor.lock") ) {
        return fs.readFileSync("cursor.lock", "utf8");
    }
    return undefined;
}

export function saveCursor(cursor: string) {
    fs.writeFileSync("cursor.lock", cursor);
}