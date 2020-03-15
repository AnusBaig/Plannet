import React, {
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback
} from "react";
import { Maybe, User } from "@dimelo/global";
import storage from "src/shared/utils/storage";
import { DIMELO_TOKEN, DIMELO_CURRENT_USER } from "src/constants";

interface AuthContextProps {
  isLoggedIn: boolean;
  currentUser?: User;
  login(token: string, user: User): void;
  logout(): void;
}

const AuthContext = React.createContext<Maybe<AuthContextProps>>(null);

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Can't use this hook without a AuthProvider.");
  }
  return context;
}

const AuthProvider: React.FC = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  const login = useCallback((token: string, user: User) => {
    const cipheredUser = window.btoa(JSON.stringify(user));
    storage.set(DIMELO_TOKEN, token);
    storage.set(DIMELO_CURRENT_USER, cipheredUser);

    setIsLoggedIn(true);
    setCurrentUser(user);
  }, []);

  const logout = useCallback(() => {
    storage.clear();
    setIsLoggedIn(false);
    setCurrentUser(null);
  }, []);

  useEffect(() => {
    const storedToken = storage.get(DIMELO_TOKEN);
    const storedUser = storage.get<string>(DIMELO_CURRENT_USER);

    if (storedUser) {
      const user = JSON.parse(window.atob(storedUser));
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }

    //TODO: Actually check the validation token
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const value = useMemo(() => ({ isLoggedIn, currentUser, logout, login }), [
    isLoggedIn,
    currentUser,
    logout,
    login
  ]);

  return <AuthContext.Provider value={value} {...props} />;
};

export { useAuth };
export default AuthProvider;
