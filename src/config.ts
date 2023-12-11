// auth API token
// https://app.streamingfast.io/
// https://app.pinax.network/
if (!process.env.SUBSTREAMS_API_TOKEN) {
    throw new Error("SUBSTREAMS_API_TOKEN is require");
}

export const token = process.env.SUBSTREAMS_API_TOKEN;
export const baseUrl = "https://eos.substreams.pinax.network:443";

// User parameters
export const manifest = "https://github.com/pinax-network/substreams/releases/download/common-v0.6.0/common-v0.6.0.spkg";
export const outputModule = "map_transaction_traces";
export const params = `map_action_traces=contract=eosio.evm&action=pushtx`;
export const startBlockNum = 345760000;
export const stopBlockNum = 346110000;