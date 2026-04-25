export const LOCAL_CONTRACTS = {
  chainId:            Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 31337),
  rpcUrl:             process.env.NEXT_PUBLIC_RPC_URL ?? 'http://127.0.0.1:8545',
  eventTicket:        process.env.NEXT_PUBLIC_EVENT_TICKET_ADDRESS        ?? '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  commemorativeBadge: process.env.NEXT_PUBLIC_COMMEMORATIVE_BADGE_ADDRESS ?? '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  monadPassCore:      process.env.NEXT_PUBLIC_MONADPASS_CORE_ADDRESS      ?? '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
}
