"use client";

import { useEffect, useState } from "react";
import { getBrowserProvider } from "@/lib/web3";

function truncate(addr: string) {
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

export default function WalletStatus() {
  const [account, setAccount] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;

    window.ethereum
      .request({ method: "eth_accounts" })
      .then((res) => {
        const accounts = res as string[];
        if (accounts.length > 0) setAccount(accounts[0]);
      })
      .catch(() => {});

    const handleChange = (res: unknown) => {
      const accounts = res as string[];
      setAccount(accounts.length > 0 ? accounts[0] : null);
    };

    (window.ethereum as { on?: (e: string, h: (r: unknown) => void) => void }).on?.(
      "accountsChanged",
      handleChange
    );
    return () => {
      (
        window.ethereum as {
          removeListener?: (e: string, h: (r: unknown) => void) => void;
        }
      ).removeListener?.("accountsChanged", handleChange);
    };
  }, []);

  async function connect() {
    setConnecting(true);
    try {
      const provider = await getBrowserProvider();
      const signer = await provider.getSigner();
      setAccount(await signer.getAddress());
    } catch {
      // user rejected
    } finally {
      setConnecting(false);
    }
  }

  if (!account) {
    return (
      <button className="btn" onClick={connect} disabled={connecting}>
        {connecting ? "Connecting…" : "Connect Wallet"}
      </button>
    );
  }

  return (
    <div className="wallet-connected">
      <span className="address-badge">{truncate(account)}</span>
      <button
        className="btn btn-ghost"
        onClick={() => setAccount(null)}
        title="Disconnect (clears local state)"
      >
        Disconnect
      </button>
    </div>
  );
}
