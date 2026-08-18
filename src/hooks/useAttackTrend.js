import { useCallback, useEffect, useState } from "react";
import { mockAttackTrend } from "../utils/mockData";
import { getAttackTrend } from "../services/api";

function useAttackTrend() {
  const [attackTrend, setAttackTrend] = useState(mockAttackTrend);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttackTrend = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAttackTrend();

      setAttackTrend(data);
    } catch (error) {
      console.warn(
        "Attack trend API unavailable. Using mock data.",
        error
      );

      setAttackTrend(mockAttackTrend);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttackTrend();
  }, [fetchAttackTrend]);

  return {
    attackTrend,
    fetchAttackTrend,
    loading,
    error,
  };
}

export default useAttackTrend;
