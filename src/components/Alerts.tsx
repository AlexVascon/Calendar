import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "~/context/GlobalContext";
import { type CalendarEvent } from "~/types";

const Alerts: React.FC = () => {
  const [dayEvents, setDayEvents] = useState<CalendarEvent[]>([]);
  const { filteredEvents, setSelectedEvent } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === dayjs().format("DD-MM-YY"),
    );
    setDayEvents(events);
  }, [filteredEvents]);

  return (
    <div className="flex-1 cursor-pointer">
      {dayEvents.map((evt, idx) => (
        <div
          key={idx}
          onClick={() => setSelectedEvent(evt)}
          className={`bg-${evt.label}-200 mb-1 mr-3 truncate rounded p-1 text-sm text-slate-400`}
        >
          {evt.title}
        </div>
      ))}
    </div>
  );
};

export default Alerts;
