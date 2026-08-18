import "../../styles/recent-attacks-table.css";
function RecentAttacksTable({ data }) {
  return (
    <section className="dashboard-table-card">
      <div className="table-header">
        <div>
          <span className="table-label">
            Activity
          </span>

          <h3 className="table-title">
            Recent Attacks
          </h3>
        </div>

        <span className="table-count">
          {data.length} Events
        </span>
      </div>

      <div className="table-wrapper">
        <table className="attacks-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Source IP</th>
              <th>Country</th>
              <th>Honeypot</th>
              <th>Service</th>
              <th>Event</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((attack) => (
              <tr key={attack.id}>
                <td>
                  {new Date(attack.timestamp).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </td>

                <td className="source-ip">
                  {attack.sourceIp}
                </td>

                <td>{attack.country}</td>

                <td>{attack.honeypot}</td>

                <td>{attack.service}</td>

                <td>{attack.eventType}</td>

                <td>
                  <span
                    className={`attack-status attack-status-${attack.status}`}
                  >
                    {attack.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecentAttacksTable;
