import { INewUser, ISessionUser} from "hive-link-common";
import { createContext, useState, useContext, useEffect } from "react";
import AuthService from "../services/auth.service";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import User from "../../pages/user/User";


export function isSessionUser(user: any): user is ISessionUser {
  return (
      user &&
      typeof user.id === 'number' &&
      typeof user.email === 'string' &&
      typeof user.first_name === 'string' &&
      typeof user.last_name === 'string' &&
      typeof user.role === 'number' 
  );
}

interface IAuthContext {
    user: User | null;
    error: string | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    register: (newUser: INewUser) => Promise<void>;
    autoSignIn: () => Promise<User>;
}

const authContext = createContext<IAuthContext | null>(null);

export const useAuth = () => {
  const auth = useContext(authContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
}

export function ProvideAuth({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth(): IAuthContext{
  const [user, setUser] = useState<ISessionUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => { Cookies.get("hive-link-token") && autoSignIn(); }, []);

  async function login(username: string, password: string) {
    try {
      setLoading(true);
      const sessionUser = await AuthService.login(username, password);
      setUser(new User(sessionUser));
    } catch (err) {
      console.error(err);
      // You can handle the error here or rethrow it if needed.
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    AuthService.logout();
    setUser(null);
  }

  async function register(newUser: INewUser) {
    setLoading(true);
  
    try {
      const sessionUser = await AuthService.register(newUser);
      setUser(new User(sessionUser));
      setError(null); // Clear any previous errors
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function autoSignIn() {
    setLoading(true);
    return AuthService.autoSignIn().then((sessionUser) => {
      sessionUser && setUser(new User(sessionUser));
      return sessionUser;
    }).finally(() => setLoading(false));

  }

  return {
    user,
    error,
    loading,
    login,
    logout,
    register,
    autoSignIn,
    } as IAuthContext;

}