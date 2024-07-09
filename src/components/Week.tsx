import React, { useContext, useEffect, useMemo, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { getWeek } from "~/utils/dates";
import type { CalendarEvent, WeekProps } from "~/types";
import Minute from "./Minute";
import Time from "./Time";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(weekOfYear);

const Week: React.FC<WeekProps> = ({ week }) => {
  const { weekIndex, filteredEvents } = useContext(GlobalContext);

  const [weekEvents, setWeekEvents] = useState<CalendarEvent[]>([]);
  const [currentWeekIdx, setCurrentWeekIdx] = useState<number>(week.week());
  const [currentWeek, setCurrentWeek] = useState<number>(week.week());

  const weekDays = useMemo(() => getWeek(currentWeekIdx), [currentWeekIdx]);
  const hoursOfDay = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);

  useEffect(() => {
    setCurrentWeek(dayjs().week(currentWeekIdx).week());
  }, [currentWeekIdx]);

  useEffect(() => {
    setCurrentWeekIdx(weekIndex);
  }, [weekIndex]);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).week() === currentWeek,
    );
    setWeekEvents(events);
  }, [filteredEvents, currentWeek]);

  return (
    <div className="flex-grow p-4 pl-0 pt-0">
      <div className="grid grid-cols-8">
        <div className="h-16 w-16"></div>
        {weekDays.map((day, index) => (
          <div
            key={day.day()}
            className={`col-span-1 rounded border border-violet-100 text-slate-400 ${index !== 0 ? "border-l" : ""} flex flex-col items-center justify-center border-l border-r`}
          >
            <span>{dayjs(day).format("D")}</span>
            <span>{dayjs(day).format("dddd")}</span>
          </div>
        ))}
      </div>
      {hoursOfDay.map((hour) => (
        <div key={hour} className="grid grid-cols-8">
          <Time hour={hour} />
          {weekDays.map((day, index) => (
            <Minute key={index} day={day} hour={hour} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Week;
