import { useEffect, useState } from "react";

type User = {
  name: string;
  role?: string;
};

const STORAGE_KEY = "lovable-auth-user";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn("Failed to parse stored user", error);
      }
    }
  }, []);

  const login = (nextUser: User) => {
    setUser(nextUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  return { user, isAuthenticated: Boolean(user), login, logout };
};
