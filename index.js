import { createRegistry, createRequest, applyParams } from "@substreams/core";
import { readPackage } from "@substreams/manifest";
import { BlockEmitter, createNodeTransport } from "@substreams/node";

// auth API token
// https://app.streamingfast.io/
// https://app.pinax.network/
if (!process.env.SUBSTREAMS_API_TOKEN) {
  throw new Error("SUBSTREAMS_API_TOKEN is require");
}

const token = process.env.SUBSTREAMS_API_TOKEN;
const baseUrl = "https://eos.substreams.pinax.network:443";

// User parameters
const manifest = "https://github.com/pinax-network/substreams/releases/download/common-v0.6.0/common-v0.6.0.spkg";
const outputModule = "map_action_traces";
const params = "map_action_traces=contract=eosio.evm&action=pushtx";
const startBlockNum = -100;
// const stopBlockNum = 346108912;

// Read Substream
const substreamPackage = await readPackage(manifest);
if ( !substreamPackage.modules ) throw new Error("No modules found in manifest");
applyParams([params], substreamPackage.modules.modules);

// Connect Transport
const registry = createRegistry(substreamPackage);
const transport = createNodeTransport(baseUrl, token, registry);
const request = createRequest({
  substreamPackage,
  outputModule,
  startBlockNum,
//   stopBlockNum,
//   params,
});

// NodeJS Events
const emitter = new BlockEmitter(transport, request, registry);

// Stream Blocks
emitter.on("anyMessage", (message, cursor, clock) => {
  console.dir(message);
  console.dir(cursor);
  console.dir(clock);
});

// End of Stream
emitter.on("close", (error) => {
  if (error) {
    console.error(error);
  }
});

// Fatal Error
emitter.on("fatalError", (error) => {
  console.error(error);
});

emitter.start();