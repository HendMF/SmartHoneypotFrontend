import { useCallback, useEffect, useState } from "react";
import { mockRecentAttacks } from "../utils/mockData";
import { getAttacks } from "../services/api";

function useAttacks() {
  const [attacks, setAttacks] = useState(mockRecentAttacks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttacks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAttacks();

      setAttacks(data);
    } catch (error) {
      console.warn(
        "Attacks API unavailable. Using mock data.",
        error
      );

      setAttacks(mockRecentAttacks);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttacks();
  }, [fetchAttacks]);

  return {
    attacks,
    fetchAttacks,
    loading,
    error,
  };
}

export default useAttacks;
