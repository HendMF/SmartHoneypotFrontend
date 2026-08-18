import "../../styles/honeypot-status.css";

function HoneypotStatus({ honeypots = [] }) {
  return (
    <section className="honeypot-status">
      <div className="honeypot-status__header">
        <div>
          <span className="honeypot-status__eyebrow">
            Infrastructure
          </span>

          <h3>Honeypot Status</h3>
        </div>

        <span className="honeypot-status__count">
          {honeypots.length} Honeypots
        </span>
      </div>

      {honeypots.length === 0 ? (
        <div className="honeypot-status__empty">
          <span>No honeypot data available.</span>
        </div>
      ) : (
        <div className="honeypot-status__list">
          {honeypots.map((honeypot) => {
            const status = honeypot.status || "unknown";
            const isRunning = status === "running";

            return (
              <article
                key={honeypot.id || honeypot.name}
                className="honeypot-status__item"
              >
                <div className="honeypot-status__main">
                  <div
                    className={`honeypot-status__indicator ${
                      isRunning
                        ? "is-running"
                        : "is-not-running"
                    }`}
                  />

                  <div>
                    <h4>{honeypot.name}</h4>

                    <span>
                      {honeypot.service || "Unknown service"}
                    </span>
                  </div>
                </div>

                <div className="honeypot-status__metrics">
                  <div>
                    <span>Status</span>

                    <strong
                      className={
                        isRunning
                          ? "status-running"
                          : "status-not-running"
                      }
                    >
                      {status}
                    </strong>
                  </div>

                  <div>
                    <span>Events</span>

                    <strong>
                      {honeypot.events ?? 0}
                    </strong>
                  </div>

                  <div>
                    <span>Last Activity</span>

                    <strong>
                      {honeypot.lastActivity || "—"}
                    </strong>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default HoneypotStatus;
