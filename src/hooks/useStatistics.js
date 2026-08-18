import { useCallback, useEffect, useState } from "react";
import { mockStatistics } from "../utils/mockData";
import { getStatistics } from "../services/api";

function useStatistics() {
  const [statistics, setStatistics] = useState(mockStatistics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatistics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getStatistics();

      setStatistics(data);
    } catch (error) {
      console.warn(
        "Statistics API unavailable. Using mock data.",
        error
      );

      setStatistics(mockStatistics);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return {
    statistics,
    fetchStatistics,
    loading,
    error,
  };
}

export default useStatistics;
