import React, { useContext, useEffect, useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import { getMonth } from "~/utils/dates";
import GlobalContext from "~/context/GlobalContext";
import Slot from "./Slot";

const Month: React.FC = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState<number>(
    dayjs().month(),
  );
  const [currenMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const { monthIndex } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  return (
    <div className="grid flex-1 grid-cols-7 grid-rows-5">
      {currenMonth.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Slot day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Month;
