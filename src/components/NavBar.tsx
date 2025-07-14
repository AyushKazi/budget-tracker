import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";

export default function NavBar({}) {
  const { user, logout } = useAuth();
  return (
    <nav className="flex items-center justify-between bg-gray-200 p-4 text-primary">
      <div className="text-lg md:text-xl font-semibold">Budget Tracker</div>
      <div className="flex items-center space-x-4">
        <span>Welcome&nbsp;{user?.username}</span>
        <Button
          onClick={logout}
          className="hover:cursor-pointer "
          variant="outline"
          size="sm"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}
