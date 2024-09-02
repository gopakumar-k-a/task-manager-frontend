// useAuthToken.js
import { useSelector } from "react-redux";

export function useAuthToken() {
  const { token } = useSelector((state) => state.auth.user);

  return token;
}
