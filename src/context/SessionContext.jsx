import { createContext } from "react";
import {clear} from 'idb-keyval'
import {useNavigate} from 'react-router-dom'

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, []);

  const resetInactivityTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      // Clear session and redirect to login after inactivity
      handleLogout();
    }, 300000); // 5 minutes of inactivity
    setTimeoutId(newTimeoutId);
  };

  const handleLogout = async () => {
    localStorage.clear()
    await clear()
    navigate("/");
  };

  return (
    <SessionContext.Provider value={{}}>{children}</SessionContext.Provider>
  );
};
