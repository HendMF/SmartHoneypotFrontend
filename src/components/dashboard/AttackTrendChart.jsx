function AttackTrendChart({ data }) {
  const maxAttacks = 50;

  const chartWidth = 700;
  const chartHeight = 260;

  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 35;

  const graphWidth =
    chartWidth - paddingLeft - paddingRight;

  const graphHeight =
    chartHeight - paddingTop - paddingBottom;

  const getX = (index) => {
    return (
      paddingLeft +
      (index / (data.length - 1)) * graphWidth
    );
  };

  const getY = (attacks) => {
    return (
      paddingTop +
      graphHeight -
      (attacks / maxAttacks) * graphHeight
    );
  };

  const linePoints = data
    .map((point, index) => {
      return `${getX(index)},${getY(point.attacks)}`;
    })
    .join(" ");

  return (
    <section className="chart-card">
      <div className="chart-header">
        <div>
          <span className="chart-label-small">
            Activity
          </span>

          <h3 className="chart-title">
            Attack Trend
          </h3>
        </div>

        <span className="chart-period">
          Last 8 Hours
        </span>
      </div>

      <div className="chart-container">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="none"
          className="attack-chart"
        >
          <line
            x1={paddingLeft}
            y1={paddingTop}
            x2={paddingLeft}
            y2={chartHeight - paddingBottom}
            className="chart-axis"
          />

          <line
            x1={paddingLeft}
            y1={chartHeight - paddingBottom}
            x2={chartWidth - paddingRight}
            y2={chartHeight - paddingBottom}
            className="chart-axis"
          />

          {[0, 10, 20, 30, 40, 50].map((value) => {
            const y = getY(value);

            return (
              <g key={value}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - paddingRight}
                  y2={y}
                  className="chart-grid-line"
                />

                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="chart-label"
                >
                  {value}
                </text>
              </g>
            );
          })}

          <polyline
            points={linePoints}
            className="attack-line"
            fill="none"
          />

          {data.map((point, index) => (
            <circle
              key={`${point.time}-${index}`}
              cx={getX(index)}
              cy={getY(point.attacks)}
              r="4"
              className="attack-point"
            />
          ))}

          {data.map((point, index) => (
            <text
              key={point.time}
              x={getX(index)}
              y={chartHeight - 10}
              textAnchor="middle"
              className="chart-label"
            >
              {point.time}
            </text>
          ))}
        </svg>
      </div>
    </section>
  );
}

export default AttackTrendChart;
