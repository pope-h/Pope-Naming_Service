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
- GUID: `zslu4kwy6xxb7jphqjmkarablvjrzvat8uutkrqk5t87ibit8b`
- URL: https://sepolia.etherscan.io/address/0xf581e9686bb235f5a0f40963e060b7c573716c2d

### Sepolia deployment Chat
- GUID: `xgt52k67bixvgymkybrqqntrfdqfk4hfpjv7emdevyjz1ayiuh`
- URL: https://sepolia.etherscan.io/address/0xf9abbd375a53bd4fa31bb12dbdd9fb0cbba6841c