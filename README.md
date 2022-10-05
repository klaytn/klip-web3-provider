# Klip Web3 Provider

To integrate Klip wallet into Dapps that utilize ethereum based APIs, this package provides functions that handle `eth` namespace APIs using the corresponding Klip App2App Javascript SDK functions. klip-web3-provider is derived and modified from @coinbase/wallet-sdk and @walletconnect/qrcode-modal.

## Installation
```bash
npm install --save @klaytn/klip-web3-provider
# OR
yarn add @klaytn/klip-web3-provider
```

## Example (Web3Modal)

Using this Provider with the [Web3Modal](https://github.com/WalletConnect/web3modal) library, users can easily integrate Klip wallet as like other wallets.
```typescript
import Web3 from "web3";
import Web3Modal from "web3modal";
import { KlipWeb3Provider } from "@klaytn/klip-web3-provider"

const providerOptions = {
    klip: {
        package: KlipWeb3Provider, //required
        options: {
            bappName: "web3Modal Example App", //required
            rpcUrl: "RPC URL" //required
        }
    }
};

const web3Modal = new Web3Modal({
    providerOptions: providerOptions //required
});

const provider = await web3Modal.connect();

const web3 = new Web3(provider);
```