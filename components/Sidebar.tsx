import NavLinks from "./NavLinks";
import SidebarHeader from "./SidebarHeader";
import UserProfile from "./UserProfile";

const Sidebar = () => {
  return (
    <div className="w-84 min-h-full bg-base-300 px-4 py-12 grid grid-rows-[auto,1fr,auto]">
      <SidebarHeader />
      <NavLinks />
      <UserProfile />
    </div>
  );
};

export default Sidebar;
