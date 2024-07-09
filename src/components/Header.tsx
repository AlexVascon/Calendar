import dayjs from "dayjs";
import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { LeftArrowIcon, RightArrowIcon } from "./ArrowIcons";
import { Choice, Direction } from "~/types";

const Header: React.FC = () => {
  const {
    monthIndex,
    setMonthIndex,
    weekIndex,
    setWeekIndex,
    dayIndex,
    setDayIndex,
    choice,
    setChoice,
  } = useContext(GlobalContext);

  const handleReset = (): void => {
    switch (choice) {
      case Choice.WEEK:
        setWeekIndex(dayjs().startOf("week").week());
        break;
      case Choice.MONTH:
        setMonthIndex(dayjs().month());
        break;
    }
  };

  const edit = (index: number, direction: Direction) => {
    return direction === Direction.FORWARD ? index + 1 : index - 1;
  };

  const move = (direction: Direction) => {
    switch (choice) {
      case Choice.WEEK:
        setWeekIndex(edit(weekIndex, direction));
        break;
      case Choice.MONTH:
        setMonthIndex(edit(monthIndex, direction));
        break;
      case Choice.DAY:
        setDayIndex(edit(dayIndex, direction));
        break;
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2">
      <section className="flex items-center ">
        <h1 className="fond-bold mr-10 text-xl text-slate-500">Calendar</h1>
        <button
          onClick={handleReset}
          className="mr-5 rounded border border-violet-100 px-4 py-2 text-slate-500"
        >
          Today
        </button>
        <button onClick={() => move(Direction.BACK)}>
          <LeftArrowIcon className="material-icons-outlined mx-2 cursor-pointer">
            chevron_left
          </LeftArrowIcon>
        </button>
        <button onClick={() => move(Direction.FORWARD)}>
          <RightArrowIcon className="material-icons-outlined mx-2 cursor-pointer">
            chevron_right
          </RightArrowIcon>
        </button>
        <h2 className="ml-4 text-xl font-bold text-slate-400">
          {dayjs().month(monthIndex).format("MMMM YYYY")}
        </h2>
      </section>
      <section>
        <button
          onClick={() => setChoice(Choice.DAY)}
          className={`w-25 rounded border border-violet-100 px-7 py-3 text-slate-500 ${choice === Choice.DAY && "bg-violet-100"}`}
        >
          Day
        </button>
        <button
          onClick={() => setChoice(Choice.WEEK)}
          className={`w-25 rounded border border-violet-100 px-7 py-3 text-slate-500 ${choice === Choice.WEEK && "bg-violet-100"}`}
        >
          Week
        </button>
        <button
          onClick={() => setChoice(Choice.MONTH)}
          className={` w-25 rounded border border-violet-100 px-7 py-3 text-slate-500 ${choice === Choice.MONTH && "bg-violet-100"}`}
        >
          Month
        </button>
      </section>
    </header>
  );
};

export default Header;
