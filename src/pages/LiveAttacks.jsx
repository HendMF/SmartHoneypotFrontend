import { useMemo } from "react";
import LiveAttackCard from "../components/dashboard/LiveAttackCard";
import useSocket from "../hooks/useSocket";
import { mockLiveAttacks } from "../utils/mockLiveAttacks";
import "../styles/live-attacks.css";

function LiveAttacks() {
  const {
    isConnected,
    events,
  } = useSocket();

  const attacks = useMemo(() => {
    if (events.length > 0) {
      return events;
    }

    return mockLiveAttacks;
  }, [events]);

  const failedAttempts = attacks.filter(
    (attack) => attack.status === "failed"
  ).length;

  const detectedEvents = attacks.filter(
    (attack) => attack.status === "detected"
  ).length;

  return (
    <section className="live-attacks-page">
      <div className="live-attacks-header">
        <div>
          <span className="page-eyebrow">
            Real-Time Monitoring
          </span>

          <h2 className="page-title">
            Live Attacks
          </h2>

          <p className="page-description">
            Monitor incoming honeypot events in real time.
          </p>
        </div>

        <div
          className={`live-connection-status ${
            isConnected ? "is-connected" : "is-disconnected"
          }`}
        >
          <span className="live-connection-dot" />

          {isConnected ? "Connected" : "Waiting for connection"}
        </div>
      </div>

      <div className="live-attacks-summary">
        <div className="live-summary-card">
          <span>Live Events</span>
          <strong>{attacks.length}</strong>
        </div>

        <div className="live-summary-card">
          <span>Failed Attempts</span>
          <strong>{failedAttempts}</strong>
        </div>

        <div className="live-summary-card">
          <span>Detected Events</span>
          <strong>{detectedEvents}</strong>
        </div>
      </div>
<div className="live-attacks-list">
  {attacks.length > 0 ? (
    attacks.map((attack) => (
      <LiveAttackCard
        key={attack.id}
        attack={attack}
      />
    ))
  ) : (
    <div className="live-attacks-empty">
      <div className="live-attacks-empty__icon">
        ◌
      </div>

      <h3>No Live Attacks</h3>

      <p>
        Waiting for incoming honeypot events...
      </p>
    </div>
  )}
</div>
    </section>
  );
}

export default LiveAttacks;
