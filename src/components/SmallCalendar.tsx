import dayjs, { type Dayjs } from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../utils/dates";
import { LeftArrowIcon, RightArrowIcon } from "./ArrowIcons";

const SmallCalendar: React.FC = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState<number>(
    dayjs().month(),
  );
  const [currentMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  const handlePrevMonth = (): void => {
    setCurrentMonthIdx(currentMonthIdx - 1);
  };
  const handleNextMonth = (): void => {
    setCurrentMonthIdx(currentMonthIdx + 1);
  };

  const getDayClass = (day: Dayjs): string => {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected?.format(format);

    switch (true) {
      case nowDay === currDay:
        return "bg-violet-400 rounded-full text-white";
      case currDay === slcDay:
        return "bg-violet-200 rounded-full text-white font-bold";
      default:
        return "";
    }
  };

  return (
    <div className="mt-9 rounded-lg">
      <header className="flex justify-between px-2 pt-1">
        <p className="font-bold text-slate-400">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <LeftArrowIcon className="material-icons-outlined mx-2 cursor-pointer text-gray-600">
              chevron_left
            </LeftArrowIcon>
          </button>
          <button onClick={handleNextMonth}>
            <RightArrowIcon className="material-icons-outlined mx-2 cursor-pointer text-gray-600">
              chevron_right
            </RightArrowIcon>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0] &&
          currentMonth[0].map((day, i) => (
            <span key={i} className="py-1 text-center text-sm text-slate-400">
              {day.format("dd").charAt(0)}
            </span>
          ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`w-full px-2 py-1 text-slate-400 ${getDayClass(day)}`}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
