import { useCallback, useEffect, useRef, useState } from "react";

function useSocket(url = null) {
  const socketRef = useRef(null);

  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState([]);

  const connect = useCallback(() => {
    if (!url) {
      return;
    }

    const socket = new WebSocket(url);

    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = (message) => {
      try {
        const event = JSON.parse(message.data);

        setEvents((previousEvents) => [
          event,
          ...previousEvents,
        ]);
      } catch (error) {
        console.error(
          "Invalid WebSocket event:",
          error
        );
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    socket.onerror = () => {
      setIsConnected(false);
    };
  }, [url]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }

    setIsConnected(false);
  }, []);

  useEffect(() => {
    if (!url) {
      return;
    }

    connect();

    return () => {
      disconnect();
    };
  }, [url, connect, disconnect]);

  return {
    isConnected,
    events,
    connect,
    disconnect,
  };
}

export default useSocket;
