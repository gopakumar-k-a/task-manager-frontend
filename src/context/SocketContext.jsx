import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Constants } from "../constants/Constants";
import { useSelector } from "react-redux";

export const socketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  let userId;
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      userId = user.credentials._id;
      console.log("user id ", userId);

      const newSocket = io(
        Constants.SERVER_URL,

        {
          query: {
            userId: userId,
          },
        }
      );
      setSocket(newSocket);
      return () => {
        console.log("Cleaning up socket connection");
        newSocket.close();
      };
    } else {
      console.log("User is not logged in, closing socket if exists");
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);
  return (
    <socketContext.Provider value={{ userId, socket }}>
      {children}
    </socketContext.Provider>
  );
};
