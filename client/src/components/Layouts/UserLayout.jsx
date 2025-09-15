import { Outlet } from "react-router-dom";
import BottomNav from "../BottomNav";

export const UserLayout = () => {
  return (
    <div className="min-h-screen pb-14">
      <Outlet />
      <BottomNav />
    </div>
  );
};
