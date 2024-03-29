## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

### Sepolia deployment PNS
- GUID: `58whrbadkwxziwssz5wd3stbdaqvwmqujhspcvpr5p6tpeizzw`
- URL: https://sepolia.etherscan.io/address/0x68ef16637e1cac16e85e7d4af3472d698af957d1

### Sepolia deployment Chat
- GUID: `98egmyhnnafzzedzamzdxjktz9xfi3fjvtse4crlaqbcycjp3w`
- URL: https://sepolia.etherscan.io/address/0x07b0c270d4f03ae4e49b75efe727288fbd04e886