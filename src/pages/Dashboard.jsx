import "../styles/dashboard.css";
import "../styles/statistic-card.css";
import "../styles/attack-trend-chart.css";

import WorldAttackMap from "../components/dashboard/WorldAttackMap";
import AttackTrendChart from "../components/dashboard/AttackTrendChart";
import StatisticCard from "../components/dashboard/StatisticCard";
import RecentAttacksTable from "../components/dashboard/RecentAttacksTable";
import HoneypotStatus from "../components/dashboard/HoneypotStatus";
import HoneypotDistributionChart from "../components/dashboard/HoneypotDistributionChart";

import useAttacks from "../hooks/useAttacks";
import useStatistics from "../hooks/useStatistics";
import useAttackTrend from "../hooks/useAttackTrend";
import useHoneypotStatus from "../hooks/useHoneypotStatus";
import useHoneypotDistribution from "../hooks/useHoneypotDistribution";

function Dashboard() {
  const {
    attacks,
    loading: attacksLoading,
    error: attacksError,
  } = useAttacks();

  const {
    statistics,
    loading: statisticsLoading,
    error: statisticsError,
  } = useStatistics();

  const {
    attackTrend,
    loading: trendLoading,
    error: trendError,
  } = useAttackTrend();

  const {
    honeypots,
    loading: honeypotsLoading,
    error: honeypotsError,
  } = useHoneypotStatus();

  const {
    distribution,
    loading: distributionLoading,
    error: distributionError,
  } = useHoneypotDistribution();

  const loading =
    attacksLoading ||
    statisticsLoading ||
    trendLoading ||
    honeypotsLoading ||
    distributionLoading;

  const error =
    attacksError ||
    statisticsError ||
    trendError ||
    honeypotsError ||
    distributionError;

  return (
    <section className="dashboard-page">
      <div className="page-header">
        <span className="page-eyebrow">
          Overview
        </span>

        <h2 className="page-title">
          Security Overview
        </h2>

        <p className="page-description">
          Monitor honeypot activity, attack events, and
          threat intelligence in real time.
        </p>
      </div>

      {loading && (
        <p>Loading dashboard data...</p>
      )}

      {error && (
        <p>Unable to load dashboard data.</p>
      )}

      {!loading && !error && (
        <>
          <div className="statistics-grid">
            <StatisticCard
              title="Total Attacks"
              value={statistics.totalAttacks.toLocaleString()}
              subtitle="Detected attack events"
              icon="⚡"
              variant="blue"
            />

            <StatisticCard
              title="Active Honeypots"
              value={statistics.activeHoneypots}
              subtitle="Currently monitoring"
              icon="◉"
              variant="green"
            />

            <StatisticCard
              title="Unique Sources"
              value={statistics.uniqueSources.toLocaleString()}
              subtitle="Distinct source IPs"
              icon="⌁"
              variant="cyan"
            />

            <StatisticCard
              title="Countries"
              value={statistics.countries}
              subtitle="Attack origins"
              icon="◇"
              variant="red"
            />
          </div>
          <div className="dashboard-chart-section">
  <WorldAttackMap />
</div>
          <div className="dashboard-chart-section">
            <AttackTrendChart data={attackTrend} />
          </div>

          <div className="dashboard-chart-section">
            <HoneypotStatus honeypots={honeypots} />
          </div>

          <div className="dashboard-chart-section">
            <HoneypotDistributionChart
              data={distribution}
            />
          </div>

          <div className="dashboard-table-section">
            <RecentAttacksTable data={attacks} />
          </div>
        </>
      )}
    </section>
  );
}

export default Dashboard;
