"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatEther } from "ethers";
import { getReadCoreContract } from "@/lib/web3";

type EventItem = {
  id: number;
  name: string;
  location: string;
  startTime: bigint;
  maxSupply: bigint;
  price: bigint;
  sold: bigint;
};

function fmtDate(ts: bigint) {
  if (ts === 0n) return "TBD";
  return new Date(Number(ts) * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function EventsListPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const core = getReadCoreContract();
        const nextId: bigint = await core.nextEventId();
        const total = Number(nextId);

        if (total === 0) {
          setLoading(false);
          return;
        }

        const settled = await Promise.allSettled(
          Array.from({ length: total }, (_, i) =>
            core.getEventSummary(i).then(
              ([cfg, stats]: [
                {
                  name: string;
                  location: string;
                  startTime: bigint;
                  maxSupply: bigint;
                  price: bigint;
                  active: boolean;
                },
                { sold: bigint }
              ]) => ({
                id: i,
                name: cfg.name,
                location: cfg.location,
                startTime: cfg.startTime,
                maxSupply: cfg.maxSupply,
                price: cfg.price,
                active: cfg.active,
                sold: stats.sold,
              })
            )
          )
        );

        const active = settled
          .filter(
            (r): r is PromiseFulfilledResult<EventItem & { active: boolean }> =>
              r.status === "fulfilled" && r.value.active
          )
          .map((r) => r.value);

        setEvents(active);
      } catch {
        setError("Could not load events. Is the local Hardhat node running?");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "0.25rem" }}>Events</h1>
          <p className="muted" style={{ marginTop: 0 }}>
            Buy a ticket and get a commemorative badge at check-in.
          </p>
        </div>
        <Link className="btn" href="/organizer/new">
          + Create Event
        </Link>
      </div>

      {loading && (
        <div className="card">
          <p className="muted">Loading events…</p>
        </div>
      )}

      {error && (
        <div className="card">
          <p className="muted">{error}</p>
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <div className="card">
          <p className="muted">No events yet.</p>
          <Link
            className="btn"
            href="/organizer/new"
            style={{ marginTop: 12, display: "inline-block" }}
          >
            Create the first event
          </Link>
        </div>
      )}

      {events.map((event) => {
        const available = event.maxSupply - event.sold;
        const soldOut = available <= 0n;
        return (
          <div key={event.id} className="card event-card">
            <h2 style={{ margin: "0 0 0.25rem" }}>{event.name}</h2>
            <p className="muted" style={{ margin: "0 0 0.75rem" }}>
              {event.location} · {fmtDate(event.startTime)}
            </p>
            <div
              style={{
                display: "flex",
                gap: 20,
                fontSize: "0.9rem",
                marginBottom: "1rem",
              }}
            >
              <span>
                <strong>{formatEther(event.price)} ETH</strong>
              </span>
              <span
                style={soldOut ? { color: "#ef4444" } : { color: "var(--muted)" }}
              >
                {soldOut
                  ? "Sold out"
                  : `${available.toString()} / ${event.maxSupply.toString()} available`}
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Link className="btn" href={`/events/${event.id}`}>
                Buy Ticket
              </Link>
              <Link
                className="btn btn-ghost"
                href={`/checkin/${event.id}`}
              >
                Check-in Panel
              </Link>
            </div>
          </div>
        );
      })}
    </main>
  );
}
