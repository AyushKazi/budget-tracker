import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("currentUser");
    // console.log("Logged in user:", loggedInUser);
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u: any) => u.email === email)) {
      throw new Error("User already exists with this email");
      // return false;
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const userSession = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    };
    setUser(userSession);
    localStorage.setItem("currentUser", JSON.stringify(userSession));

    return true;
  };

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password");
      // return false;
    }

    if (user) {
      const userSession = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      setUser(userSession);
      localStorage.setItem("currentUser", JSON.stringify(userSession));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
