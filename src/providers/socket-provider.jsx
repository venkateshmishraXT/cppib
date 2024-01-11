"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";
import { SOCKET_URL } from "../constants";

const SocketContext = createContext({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

const getSocketUrl = () => {
  return SOCKET_URL;
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = new ClientIO(getSocketUrl(), {
      path: `/io`,
      addTrailingSlash: false,
    });

    socketInstance.on("connect", () => {
      console.log("socket connected");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("socket disconnected");
      setIsConnected(false);
    });


    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
