import { useContext, useEffect, useMemo, useState } from "react";
import Minute from "./Minute";
import GlobalContext from "~/context/GlobalContext";
import Time from "./Time";
import dayjs, { Dayjs } from "dayjs";

const Day: React.FC = () => {
  const { dayIndex } = useContext(GlobalContext);

  const [currentDayInx, setCurrentDayInx] = useState<number>(dayjs().date());
  const [currenDay, setCurrentDay] = useState<Dayjs>(dayjs().date(dayIndex));

  useEffect(() => {
    setCurrentDay(dayjs().date(currentDayInx));
  }, [currentDayInx]);

  useEffect(() => {
    setCurrentDayInx(dayIndex);
  }, [dayIndex]);

  const hoursOfDay = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex flex-col items-center rounded-lg border border-violet-100 text-xl text-slate-400">
        <span>{dayjs().date(dayIndex).format("D")}</span>
        <span>{dayjs().date(dayIndex).format("dddd")}</span>
      </div>
      {hoursOfDay.map((hour, index) => (
        <div key={hour} className="flex flex-row">
          <Time hour={hour} fixed />
          <Minute full key={index} day={dayjs().date(dayIndex)} hour={hour} />
        </div>
      ))}
    </div>
  );
};

export default Day;
