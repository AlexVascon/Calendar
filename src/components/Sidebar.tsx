import React from "react";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import Alerts from "./Alerts";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 rounded-tr-lg bg-violet-100 p-5">
      <SmallCalendar />
      <Labels />
      <Alerts />
    </aside>
  );
};

export default Sidebar;
