import Navbar from "@/layout/Navbar";
import PageContainer from "@/layout/PageContainer";

import { Outlet, NavLink } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import Login from "../Authentication/Login";

const AccountManagement = () => {
  const authenticated = useIsAuthenticated();

  if (!authenticated) {
    return <Login />;
  }
  return (
    <PageContainer>
      <Navbar />
      <div className="flex flex-col md:flex-row min-w-[320px] p-4 mt-10">
        {/* Left sidebar */}
        <div className="w-full md:w-1/4 mb-4 md:mb-0 border-r">
          <h2 className="text-lg font-bold mb-2">Manage My Account</h2>
          {/* <ul className="space-y-2 flex flex-col">
            {isSuccess && (
              <NavLink
                to="/account/profile"
                className={({ isActive }) => (isActive ? "text-red-500" : "")}
                state={{ user }}
              >
                My Profile
              </NavLink>
            )}
            <NavLink
              to="/account/address-book"
              className={({ isActive }) => (isActive ? "text-red-500" : "")}
              state={isSuccess ? { user } : undefined}
            >
              Address Book
            </NavLink>
            <NavLink
              to="/account/payment"
              className={({ isActive }) => (isActive ? "text-red-500" : "")}
            >
              My Payment Options
            </NavLink>
          </ul>
          */}{" "}
          <ul className="space-y-2 flex flex-col">
            <NavLink
              to="/account/profile"
              className={({ isActive }) => (isActive ? "text-red-500" : "")}
            >
              My Profile
            </NavLink>
            <NavLink
              to="/account/address-book"
              className={({ isActive }) => (isActive ? "text-red-500" : "")}
            >
              Address Book
            </NavLink>
          </ul>
          <h2 className="text-lg font-bold mt-4 mb-2">My Orders</h2>
          <ul className="space-y-2 flex flex-col">
            <NavLink to="/account/returns">My Returns</NavLink>
            <NavLink to="/account/cancellations">My Cancellations</NavLink>
          </ul>
          <h2 className="text-lg font-bold mt-4 mb-2">My Wishlist</h2>
        </div>
        <Outlet />
      </div>
    </PageContainer>
  );
};

export default AccountManagement;
