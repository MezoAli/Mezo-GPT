import ToggleTheme from "./ToggleTheme";
import { SiOpenaigym } from "react-icons/si";

const SidebarHeader = () => {
  return (
    <div className="flex items-center mb-4 gap-4 px-4">
      <SiOpenaigym className="w-10 h-10 text-primary font-bold" />
      <h2 className="text-2xl font-extrabold">MezoGPT</h2>
      <ToggleTheme />
    </div>
  );
};

export default SidebarHeader;
