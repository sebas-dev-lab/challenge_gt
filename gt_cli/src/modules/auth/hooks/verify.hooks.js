import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyAuthByPathName, verifySession } from "../utils/storage.utils";

export default function useVerify() {
  const navigate = useNavigate();
  const localtion = useLocation();

  useEffect(() => {
    if (!localtion.pathname.includes("register")) {
      verifySession(navigate);
    }
    verifyAuthByPathName(localtion.pathname, navigate);
  }, []);
}
