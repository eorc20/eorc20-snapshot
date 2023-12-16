# EORC20 Snapshots

### Snapshots

| Version | Symbol | File                 | Addresses | Supply   | Checksum256  |
| --------|--------|--------------|-----------|----------|------------- |
| v3      | `eoss` | [eoss-snapshot-v3.csv](https://raw.githubusercontent.com/pinax-network/eorc20-snapshot/main/snapshot/v3/eoss-snapshot-v3.csv)  | 21373     | 21000000 | d26b9...36ed1
| v2      | `eoss` | [eoss-snapshot-v2.csv](https://raw.githubusercontent.com/pinax-network/eorc20-snapshot/main/snapshot/v2/eoss-snapshot-v2.csv)  | 21389     | 21000000 | 78015...148ef
| v1      | `eoss` | [eoss-snapshot-v1.csv](https://raw.githubusercontent.com/pinax-network/eorc20-snapshot/main/snapshot/v1/eoss-snapshot-v1.csv)  | 21095     | 21000000 | cb7b1...d791f

### Checksum256

```bash
$ shasum -a 256 snapshot/v1/eoss-snapshot-v3.csv
d26b90876ec6760ecf1030808d03137d01f88df7d906bf6f5fc1431f51936ed1  snapshot/v3/eoss-snapshot-v3.csv
```

### Common inscription mistakes

- invalid eorc-20 inscription format
  - invalid JSON parsing
  - invalid `op` operation type
- mint exceeding `lim` limit amounts
- invalid `tick` symbol (must be 4 letters and lowercase)

### References

- https://domo-2.gitbook.io/eorc-20-experiment/

### EORC-20

### `deploy`

```json
{
  "p": "eorc-20",
  "op": "deploy",
  "tick": "eoss",
  "max": "210000000000",
  "lim": "1000"
}
```

| key    | required? | description |
| ------ | --------- | ----------- |
| `p`    | yes       | Protocol: Helps other systems identify and process eorc-20 events
| `op`   | yes       | Operation: Type of event (`deploy`, `mint`, `transfer`)
| `tick` | yes       | Ticker: 4 letter identifier of the eorc-20
| `max`  | yes       | Max Supply: Maximum supply of the eorc-20
| `lim`  | no        | Mint limit: If letting users mint to themsleves, limit per inscription
| `dec`  | no        | Decimals: set decimal precision, default to 4

### `mint`

```json
{
  "p": "eorc-20",
  "op": "mint",
  "tick": "eoss",
  "amt": "10000"
}
```

| key    | required? | description |
| ------ | --------- | ----------- |
| `p`    | yes       | Protocol: Helps other systems identify and process eorc-20 events
| `op`   | yes       | Operation: Type of event (`deploy`, `mint`, `transfer`)
| `tick` | yes       | Ticker: 4 letter identifier of the eorc-20
| `amt`  | yes       | Amount to mint: States the amount of the eorc-20 to mint. Has to be less than "lim" above if stated

### `transfer`

```json
{
  "p": "eorc-20",
  "op": "transfer",
  "tick": "eoss",
  "amt": "10000"
}
```

| key    | required? | description |
| ------ | --------- | ----------- |
| `p`    | yes       | Protocol: Helps other systems identify and process eorc-20 events
| `op`   | yes       | Operation: Type of event (`deploy`, `mint`, `transfer`)
| `tick` | yes       | Ticker: 4 letter identifier of the eorc-20
| `amt`  | yes       | Amount to mint: States the amount of the eorc-20 to mint. Has to be less than "lim" above if stated
| ~~`to`~~ | ~~No~~      | ~~Address to send to: States the receiving address. If left blank logic will presume that the receiver of the transfer is correct.~~
| ~~`fee`~~| ~~No~~      | ~~Transfer fee: For tracking without taproot data purposes only~~