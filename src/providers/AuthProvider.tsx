import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import liff from "@line/liff";
import { IUser } from "src/interfaces/user.interface";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const AuthContext = createContext<{ user: IUser | null; logout: () => void }>({ user: null, logout: () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [isLogged] = useState(liff.isLoggedIn());

  const logout = useCallback(() => {
    liff.logout();
    setUser(null);
    liff.login();
  }, []);

  useEffect(() => {
    const isLogged = liff.isLoggedIn();

    if (isLogged) {
      (async () => {
        const userProfile = await liff.getProfile();
        setUser(userProfile);
        // navigate(RouteBase.Home);
      })();
    } else {
      liff.login();
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLogged,
      logout,
    }),
    [user, isLogged, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
