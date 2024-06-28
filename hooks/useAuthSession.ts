import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/session');
        if (response.data.user) {
          dispatch(setUser(response.data.user));
        } else {
          dispatch(clearAuth());
        }
      } catch (error) {
        console.error("Error checking authentication session:", error);
        dispatch(clearAuth());
      }
    };

    checkAuth();
  }, [dispatch]);

  return user;
};

export default useAuthSession;
