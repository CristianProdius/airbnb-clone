"use client";
import { AiOutlineMenu } from "@react-icons/all-files/ai/AiOutlineMenu";
import Avatar from "../Avatar";
import { ReactNode, useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";
import PendingBookingsBadge from "./PendingBookingsBadge";

interface UserMenuProps {
  currentUser?: SafeUser | null;
  label: string | ReactNode;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();

  const toogleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // Open rent Modal

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          FlexiSpace your space
        </div>
        <div
          onClick={toogleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-full bg-white overflow-hidden right-0 top-14 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/bookings")}
                  label="My Bookings"
                />

                <MenuItem
                  onClick={() => {
                    toogleOpen();
                    router.push("/dashboard/bookings");
                  }}
                  label={
                    <div className="flex items-center justify-between w-full">
                      <span>Manage Bookings</span>
                      {currentUser && (
                        <div className="relative">
                          <PendingBookingsBadge userId={currentUser.id} />
                        </div>
                      )}
                    </div>
                  }
                />

                <MenuItem
                  onClick={() => router.push("/invoices")}
                  label="Invoices"
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My Favorites"
                />
                <MenuItem
                  onClick={() => router.push("/spaces")}
                  label="My Spaces"
                />
                <MenuItem
                  onClick={() => router.push("/analytics")}
                  label="Analytics"
                />
                <hr />
                <MenuItem onClick={rentModal.onOpen} label="List your space" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
