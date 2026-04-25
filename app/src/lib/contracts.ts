export interface ContractAddresses {
  chainId:            number
  rpcUrl:             string
  eventTicket:        string
  commemorativeBadge: string
  monadPassCore:      string
}

export const LOCAL_CONTRACTS: ContractAddresses = {
  chainId:            31337,
  rpcUrl:             'http://127.0.0.1:8545',
  eventTicket:        '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  commemorativeBadge: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  monadPassCore:      '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
}

export function getContracts(): ContractAddresses {
  const core = process.env.NEXT_PUBLIC_CORE_ADDRESS
  if (core) {
    return {
      chainId:            parseInt(process.env.NEXT_PUBLIC_CHAIN_ID ?? '31337'),
      rpcUrl:             process.env.NEXT_PUBLIC_RPC_URL ?? LOCAL_CONTRACTS.rpcUrl,
      eventTicket:        process.env.NEXT_PUBLIC_TICKET_ADDRESS ?? LOCAL_CONTRACTS.eventTicket,
      commemorativeBadge: process.env.NEXT_PUBLIC_BADGE_ADDRESS ?? LOCAL_CONTRACTS.commemorativeBadge,
      monadPassCore:      core,
    }
  }
  return LOCAL_CONTRACTS
}
