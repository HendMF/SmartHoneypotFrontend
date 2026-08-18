import { useCallback, useEffect, useState } from "react";
import { mockHoneypotStatus } from "../utils/mockData";

function useHoneypotStatus() {
  const [honeypots, setHoneypots] = useState(mockHoneypotStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHoneypotStatus = useCallback(async () => {
    /*
     * The real honeypot-status API will be connected here
     * when the Orchestrator backend exposes its endpoint.
     */

    setLoading(false);
    setError(null);
    setHoneypots(mockHoneypotStatus);
  }, []);

  useEffect(() => {
    fetchHoneypotStatus();
  }, [fetchHoneypotStatus]);

  return {
    honeypots,
    fetchHoneypotStatus,
    loading,
    error,
  };
}

export default useHoneypotStatus;
