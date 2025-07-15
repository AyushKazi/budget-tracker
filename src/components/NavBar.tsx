import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { useState } from "react";
import { AlertModal } from "./ui/alert-modal";
import { toast } from "sonner";

export default function NavBar({}) {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  return (
    <>
      <nav className="flex items-center justify-between bg-gray-200 p-4 rounded-b-lg text-primary">
        <div className="text-lg md:text-xl font-semibold">Budget Tracker</div>
        <div className="flex items-center space-x-4">
          <span>Welcome&nbsp;{user?.username}</span>
          <Button
            onClick={() => setShowLogoutModal(true)}
            className="hover:cursor-pointer "
            variant="outline"
            size="sm"
          >
            Logout
          </Button>
        </div>
      </nav>
      {showLogoutModal && (
        <AlertModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={() => {
            logout();
            setShowLogoutModal(false);
            toast.success("Logged out successfully");
          }}
          description="Are you sure you want to logout?"
        />
      )}
    </>
  );
}
