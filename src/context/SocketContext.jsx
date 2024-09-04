import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Constants } from "../constants/Constants";
import { useSelector } from "react-redux";
// import useGetTasks from "../hooks/useGetTasks";
import {
  deleteTaskById,
  setNewTask,
  updateEditedTask,
} from "../redux/slice/taskSlice";
import { useDispatch } from "react-redux";
export const socketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  let userId;
  const { user } = useSelector((state) => state.auth);
  // const { tasks } = useGetTasks();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      userId = user.credentials._id;

      const newSocket = io(
        Constants.SERVER_URL,

        {
          query: {
            userId: userId,
          },
        }
      );
      newSocket.on("taskAdded", (newTask) => {
        dispatch(setNewTask(newTask));
      });
      newSocket.on("taskEdited", (editedTask) => {
        dispatch(updateEditedTask(editedTask));
      });
      newSocket.on("taskDeleted", (deletedTaskId) => {

        dispatch(deleteTaskById(deletedTaskId));
      });
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
