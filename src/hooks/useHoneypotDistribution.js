import { useCallback, useEffect, useState } from "react";
import { mockHoneypotDistribution } from "../utils/mockData";

function useHoneypotDistribution() {
  const [distribution, setDistribution] = useState(
    mockHoneypotDistribution
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHoneypotDistribution = useCallback(async () => {
    /*
     * The real distribution API will be connected here
     * when the backend exposes the statistics endpoint.
     */

    setLoading(false);
    setError(null);
    setDistribution(mockHoneypotDistribution);
  }, []);

  useEffect(() => {
    fetchHoneypotDistribution();
  }, [fetchHoneypotDistribution]);

  return {
    distribution,
    fetchHoneypotDistribution,
    loading,
    error,
  };
}

export default useHoneypotDistribution;
