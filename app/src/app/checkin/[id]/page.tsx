"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { formatEther } from "ethers";
import { getReadBadgeContract, getReadCoreContract, getReadTicketContract, getWriteCoreContract } from "@/lib/web3";

type Props = { params: { id: string } };

type EventSummary = {
  name: string;
  location: string;
  startTime: bigint;
  endTime: bigint;
  maxSupply: bigint;
  price: bigint;
  organizer: string;
  active: boolean;
  sold: bigint;
  checkedIn: bigint;
  burned: bigint;
  revenue: bigint;
  lastSaleAt: bigint;
  lastCheckInAt: bigint;
};

function fmtTs(value: bigint) {
  if (value === 0n) return "Pendiente";
  return new Date(Number(value) * 1000).toLocaleString();
}

function parsePayload(raw: string) {
  try {
    return JSON.parse(raw) as { eventId?: number; tokenId?: number; owner?: string };
  } catch {
    return null;
  }
}

export default function CheckinPage({ params }: Props) {
  const { id } = params;
  const [summary, setSummary] = useState<EventSummary | null>(null);
  const [tokenId, setTokenId] = useState("1");
  const [payload, setPayload] = useState("");
  const [ownerPreview, setOwnerPreview] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const [mintedBadgeId, setMintedBadgeId] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);

  const parsedPayload = useMemo(() => parsePayload(payload), [payload]);

  async function loadEvent() {
    try {
      const core = getReadCoreContract();
      const [cfg, stats] = await core.getEventSummary(id);
      if (!cfg.active) {
        setSummary(null);
        setStatus(`El evento #${id} todavía no existe.`);
        return;
      }
      setSummary({ ...cfg, ...stats });
    } catch {
      setSummary(null);
      setStatus(`No pude leer el evento #${id}.`);
    }
  }

  async function previewTicket(ticketId: string) {
    if (!ticketId) return;
    try {
      const ticket = getReadTicketContract();
      const owner = await ticket.ownerOf(ticketId);
      const used = await ticket.used(ticketId);
      const badge = getReadBadgeContract();
      const hasBadge = await badge.hasBadge(owner, id);
      const badgeId = hasBadge ? await badge.badgeTokenOf(owner, id) : 0n;
      setMintedBadgeId(badgeId ? badgeId.toString() : "");
      setOwnerPreview(`${owner}${used ? " · ya usado" : " · válido"}${badgeId ? ` · badge #${badgeId}` : ""}`);
    } catch {
      setMintedBadgeId("");
      setOwnerPreview("Ticket no encontrado o ya quemado.");
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setStatus("Enviando check-in...");
    try {
      const targetTokenId = parsedPayload?.tokenId ? String(parsedPayload.tokenId) : tokenId;
      if (parsedPayload?.eventId && String(parsedPayload.eventId) !== id) {
        throw new Error("Ese QR pertenece a otro evento.");
      }

      const core = await getWriteCoreContract();
      const tx = await core.checkIn(id, targetTokenId);
      setStatus(`Check-in enviado: ${tx.hash}`);
      await tx.wait();
      setTokenId(targetTokenId);
      setStatus(`Check-in completo para ticket #${targetTokenId}. Ticket quemado + badge minteado.`);
      await loadEvent();
      await previewTicket(targetTokenId);
    } catch (error) {
      const message = error instanceof Error ? error.message : "No pude hacer check-in";
      setStatus(message);
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    loadEvent();
  }, [id]);

  useEffect(() => {
    const targetTokenId = parsedPayload?.tokenId ? String(parsedPayload.tokenId) : tokenId;
    previewTicket(targetTokenId);
  }, [tokenId, parsedPayload, id]);

  return (
    <main>
      <Link href="/">&larr; Back</Link>
      <h1>Check-in — Evento #{id}</h1>
      <p className="muted">MVP: pega el payload del QR o usa tokenId manual.</p>

      {!summary ? (
        <div className="card"><p>{status || "Cargando..."}</p></div>
      ) : (
        <>
          <div className="card">
            <h2>{summary.name}</h2>
            <ul>
              <li>Ubicación: {summary.location}</li>
              <li>Precio: {formatEther(summary.price)} MON</li>
              <li>Vendidos: {summary.sold.toString()}</li>
              <li>Check-ins: {summary.checkedIn.toString()}</li>
              <li>Burned: {summary.burned.toString()}</li>
              <li>Última venta: {fmtTs(summary.lastSaleAt)}</li>
              <li>Último check-in: {fmtTs(summary.lastCheckInAt)}</li>
            </ul>
          </div>

          <div className="card">
            <h2>QR Scanner</h2>
            <p className="muted" style={{ marginTop: 0 }}>
              Point the camera at an attendee&apos;s ticket QR.
            </p>

            {!scannerOpen ? (
              <button className="btn" onClick={() => setScannerOpen(true)}>
                Open Camera Scanner
              </button>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="qr-mock-viewport">
                  <div className="qr-mock-corners">
                    <span /><span /><span /><span />
                  </div>
                  <div className="qr-scan-line" />
                  <span style={{ color: "var(--muted)", fontSize: "0.8rem", zIndex: 1 }}>
                    Camera not available
                  </span>
                </div>
                <p className="muted" style={{ fontSize: "0.85rem", margin: 0 }}>
                  Camera scanning coming soon — use manual entry below.
                </p>
                <button className="btn btn-ghost" style={{ alignSelf: "flex-start" }} onClick={() => setScannerOpen(false)}>
                  Close Scanner
                </button>
              </div>
            )}
          </div>

          <form className="card" onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
            <h2>Manual Check-in</h2>
            <label>
              Paste QR payload
              <textarea value={payload} onChange={(e) => setPayload(e.target.value)} rows={4} placeholder='{"eventId":1,"tokenId":1,"owner":"0x..."}' />
            </label>
            <label>
              Token ID
              <input value={tokenId} onChange={(e) => setTokenId(e.target.value)} placeholder="1" />
            </label>
            <p className="muted" style={{ margin: 0 }}>Ticket: {ownerPreview || "—"}</p>
            {mintedBadgeId ? <p className="muted" style={{ margin: 0 }}>Badge already minted: #{mintedBadgeId}</p> : null}
            <button className="btn" disabled={pending}>{pending ? "Processing…" : "Check In"}</button>
          </form>
        </>
      )}

      {status && summary ? <div className="card"><p>{status}</p></div> : null}
    </main>
  );
}
