# EORC20 Snapshot

### Snapshots

| Version | File                  | Addresses | Supply   | Checksum256  |
| --------|----------------------|-----------|----------|------------- |
| V1      | [eoss-snapshot-v1.csv](https://raw.githubusercontent.com/pinax-network/eorc20-snapshot/main/snapshot/v1/eoss-snapshot-v1.csv)  | 21095     | 21000000 | 2475f...c4733

### Checksum256

```bash
$ shasum -a 256 snapshot/v1/eoss-snapshot-v1.csv
```

### Get API key

- https://app.pinax.network/

**.env**
```env
SUBSTREAMS_API_TOKEN="<API KEY>"
```

### Download `pushtx.jsonl` from Substreams

```
$ npm install
$ npm run download
```

### Filtered Data

```json
{
  "to": "0x910cba72870aaca57bdfc8a98a76ba46f0a08573",
  "trx_id": "0xa24411312e1dffac1618c6d600f917c4b106e736982dbad999a26cd6ab32ac8e",
  "timestamp": "2023-12-09T03:13:50Z"
}
```

### Detailed Data

```json
{
  "evm_trx_id": "0xecc6a6aa41055331e097fa5729e6c35892daeb8cd1583324278628124e993711",
  "eos_trx_id": "ecbdfebeede514386bac233bfa521cec02ef4f57acd4e64667a427c0c99b5a05",
  "eos_block_number": "345983337",
  "timestamp": "2023-12-10T04:28:12Z",
  "miner": "eosio.evm",
  "rlptx": "f86d834cd3ea8522ecb25c008301e84894bbbbbbbbbbbbbbbbbbbbbbbb55318063a000000080b83c646174613a2c7b2270223a22656f72633230222c226f70223a226d696e74222c227469636b223a22656f7373222c22616d74223a223130303030227d1b808855318063a0000000"
}
```