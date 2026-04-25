'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { BrowserProvider, formatEther } from 'ethers'
import { getActiveChain, hexChainId } from '@/lib/chains'

const STORAGE_KEY = 'monadpass:wallet:autoconnect'

interface WalletState {
  address:      string | null
  chainId:      number | null
  balance:      string | null
  isConnecting: boolean
  isConnected:  boolean
  isWrongChain: boolean
  connect:      () => Promise<void>
  disconnect:   () => void
  switchChain:  () => Promise<void>
}

const WalletContext = createContext<WalletState>({
  address:      null,
  chainId:      null,
  balance:      null,
  isConnecting: false,
  isConnected:  false,
  isWrongChain: false,
  connect:      async () => {},
  disconnect:   () => {},
  switchChain:  async () => {},
})

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address,      setAddress]      = useState<string | null>(null)
  const [chainId,      setChainId]      = useState<number | null>(null)
  const [balance,      setBalance]      = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const targetChainId = getActiveChain().chainId
  const isConnected   = !!address
  const isWrongChain  = !!chainId && chainId !== targetChainId

  const refreshBalance = useCallback(async (addr: string) => {
    if (typeof window === 'undefined' || !window.ethereum) return
    try {
      const provider = new BrowserProvider(window.ethereum)
      const bal = await provider.getBalance(addr)
      setBalance(parseFloat(formatEther(bal)).toFixed(4))
    } catch { /* ignore */ }
  }, [])

  const connect = useCallback(async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert('MetaMask no encontrado. Instala la extensión en tu navegador.')
      return
    }
    setIsConnecting(true)
    try {
      const provider = new BrowserProvider(window.ethereum)
      const accounts = await provider.send('eth_requestAccounts', []) as string[]
      const addr     = accounts[0]
      const network  = await provider.getNetwork()
      setAddress(addr)
      setChainId(Number(network.chainId))
      refreshBalance(addr)
      localStorage.setItem(STORAGE_KEY, '1')
    } catch (err) {
      console.error('[WalletContext] connect error:', err)
    } finally {
      setIsConnecting(false)
    }
  }, [refreshBalance])

  const disconnect = useCallback(() => {
    setAddress(null)
    setChainId(null)
    setBalance(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const switchChain = useCallback(async () => {
    if (typeof window === 'undefined' || !window.ethereum) return
    const chain   = getActiveChain()
    const chainHex = hexChainId(chain)
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainHex }],
      })
    } catch (err: unknown) {
      const code = (err as { code?: number }).code
      if (code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId:           chainHex,
            chainName:         chain.name,
            nativeCurrency:    chain.nativeCurrency,
            rpcUrls:           [chain.rpcUrl],
            blockExplorerUrls: chain.explorer ? [chain.explorer] : [],
          }],
        })
      }
    }
  }, [])

  /* Auto-reconnect on mount */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return
    if (localStorage.getItem(STORAGE_KEY)) connect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Listen to MetaMask events */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return
    const eth = window.ethereum

    const onAccountsChanged = (raw: unknown) => {
      const accounts = raw as string[]
      if (!accounts.length) { disconnect(); return }
      setAddress(accounts[0])
      refreshBalance(accounts[0])
    }

    const onChainChanged = (raw: unknown) => {
      setChainId(parseInt(raw as string, 16))
    }

    eth.on?.('accountsChanged', onAccountsChanged)
    eth.on?.('chainChanged', onChainChanged)
    return () => {
      eth.removeListener?.('accountsChanged', onAccountsChanged)
      eth.removeListener?.('chainChanged', onChainChanged)
    }
  }, [disconnect, refreshBalance])

  return (
    <WalletContext.Provider value={{
      address, chainId, balance,
      isConnecting, isConnected, isWrongChain,
      connect, disconnect, switchChain,
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  return useContext(WalletContext)
}
