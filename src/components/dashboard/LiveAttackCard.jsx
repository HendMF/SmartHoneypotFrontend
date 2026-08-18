import "../../styles/live-attack-card.css";

function LiveAttackCard({ attack }) {
  return (
    <article className="live-attack-card">
      <div className="live-attack-card__header">
        <div>
          <span className="live-attack-card__status">
            LIVE
          </span>

          <h3>{attack.eventType}</h3>
        </div>

        <span className="live-attack-card__time">
          {attack.timestamp}
        </span>
      </div>

      <div className="live-attack-card__details">
        <div>
          <span>Source IP</span>
          <strong>{attack.sourceIp}</strong>
        </div>

        <div>
          <span>Country</span>
          <strong>{attack.country}</strong>
        </div>

        <div>
          <span>Honeypot</span>
          <strong>{attack.honeypot}</strong>
        </div>

        <div>
          <span>Service</span>
          <strong>{attack.service}</strong>
        </div>
      </div>

      <div className="live-attack-card__footer">
        <span>{attack.status}</span>
      </div>
    </article>
  );
}

export default LiveAttackCard;
