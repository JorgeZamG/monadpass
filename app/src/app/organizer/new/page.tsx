"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { formatEther, parseEther } from "ethers";
import { getReadCoreContract, getWriteCoreContract } from "@/lib/web3";

function toUnix(value: string) {
  return Math.floor(new Date(value).getTime() / 1000);
}

function formatDateTimeLocal(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function getDefaultForm() {
  const now = new Date();
  const start = new Date(now);
  start.setHours(18, 0, 0, 0);

  const end = new Date(now);
  end.setHours(23, 0, 0, 0);

  return {
    name: "Monad Blitz GDL",
    location: "Guadalajara, MX",
    startAt: formatDateTimeLocal(start),
    endAt: formatDateTimeLocal(end),
    maxSupply: "150",
    price: "1",
  };
}

export default function NewOrganizerEventPage() {
  const defaultForm = useMemo(() => getDefaultForm(), []);
  const [form, setForm] = useState(defaultForm);
  const [status, setStatus] = useState<string>("");
  const [createdEventId, setCreatedEventId] = useState<string>("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setStatus("Preparando transacción...");

    try {
      const readCore = getReadCoreContract();
      const nextEventId = await readCore.nextEventId();
      const core = await getWriteCoreContract();
      const tx = await core.createEvent(
        form.name,
        form.location,
        toUnix(form.startAt),
        toUnix(form.endAt),
        BigInt(form.maxSupply),
        parseEther(form.price)
      );
      setStatus(`Transacción enviada: ${tx.hash}`);
      await tx.wait();
      setCreatedEventId(nextEventId.toString());
      setStatus(`Evento #${nextEventId.toString()} creado · precio ${form.price} MON`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "No pude crear el evento";
      setStatus(message);
    } finally {
      setPending(false);
    }
  }

  return (
    <main>
      <Link href="/">&larr; Back</Link>
      <h1>Crear evento</h1>
      <p className="muted">Esto llama directamente a MonadPassCore.createEvent(...). Ya viene preconfigurado para crear hoy <strong>Monad Blitz GDL</strong> con ticket en 1 MON.</p>

      <form className="card" onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Nombre
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label>
          Ubicación
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        </label>
        <label>
          Inicio
          <input type="datetime-local" value={form.startAt} onChange={(e) => setForm({ ...form, startAt: e.target.value })} />
        </label>
        <label>
          Fin
          <input type="datetime-local" value={form.endAt} onChange={(e) => setForm({ ...form, endAt: e.target.value })} />
        </label>
        <label>
          Supply
          <input type="number" min="1" value={form.maxSupply} onChange={(e) => setForm({ ...form, maxSupply: e.target.value })} />
        </label>
        <label>
          Precio (MON)
          <input type="number" step="0.0001" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </label>
        <button className="btn" disabled={pending}>{pending ? "Creando..." : "Crear evento"}</button>
      </form>

      {status ? <div className="card"><p>{status}</p></div> : null}

      {createdEventId ? (
        <div className="card">
          <p><strong>Evento listo:</strong> #{createdEventId}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn" href={`/events/${createdEventId}`}>Ir a compra</Link>
            <Link className="btn" href={`/checkin/${createdEventId}`}>Ir a check-in</Link>
          </div>
        </div>
      ) : null}

      <div className="card">
        <p className="muted">Tip: usa la wallet local de Hardhat en MetaMask. Cuenta #0 sirve como organizer.</p>
        <p className="muted">Precio actual del form: {formatEther(parseEther(form.price || "0"))} MON</p>
      </div>
    </main>
  );
}
