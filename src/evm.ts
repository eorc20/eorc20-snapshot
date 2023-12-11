import { keccak256, Address } from 'viem'

export function toTransactionId(rlptx: Address) {
    const value = Buffer.from(rlptx.replace(/^0x/,""), "hex");
    return keccak256(value);
}