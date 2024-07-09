import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "~/context/GlobalContext";
import { Choice, type CalendarEvent, type DayProps } from "~/types";

const Slot = ({ day, rowIdx }: DayProps) => {
  const [dayEvents, setDayEvents] = useState<CalendarEvent[]>([]);
  const {
    setDaySelected,
    filteredEvents,
    setSelectedEvent,
    setDay,
    setChoice,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY"),
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  const getCurrentDayClass = (): string => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-violet-400 text-white rounded-full w-7"
      : "";
  };

  return (
    <div className="flex flex-col rounded-lg border border-2 border-violet-100">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="mt-1 text-sm text-slate-400">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`my-1 p-1 text-center text-sm text-slate-400  ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setDay(day);
          setChoice(Choice.DAY);
        }}
      >
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
    </div>
  );
};

export default Slot;
