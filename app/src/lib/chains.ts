export interface Chain {
  chainId:        number
  name:           string
  shortName:      string
  rpcUrl:         string
  explorer:       string
  nativeCurrency: { name: string; symbol: string; decimals: number }
}

export const CHAINS = {
  monadTestnet: {
    chainId:        10143,
    name:           'Monad Testnet',
    shortName:      'monad',
    rpcUrl:         'https://testnet-rpc.monad.xyz',
    explorer:       'https://testnet.monadexplorer.com',
    nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
  },
  hardhat: {
    chainId:        31337,
    name:           'Hardhat Local',
    shortName:      'local',
    rpcUrl:         'http://127.0.0.1:8545',
    explorer:       '',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  },
} satisfies Record<string, Chain>

export type ChainKey = keyof typeof CHAINS

export function getActiveChain(): Chain {
  const key = (process.env.NEXT_PUBLIC_CHAIN ?? 'hardhat') as ChainKey
  return CHAINS[key] ?? CHAINS.hardhat
}

export function hexChainId(chain: Chain) {
  return `0x${chain.chainId.toString(16)}`
}
