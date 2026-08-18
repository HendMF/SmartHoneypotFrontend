const SOCKET_URL = "ws://localhost:8000/ws";

export function createSocket() {
  const socket = new WebSocket(SOCKET_URL);

  return socket;
}
