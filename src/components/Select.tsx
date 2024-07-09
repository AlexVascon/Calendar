import dayjs from "dayjs";
import { useContext, useState } from "react";
import GlobalContext from "~/context/GlobalContext";
import { CalendarEvent } from "~/types";
import { endHourSelect, startHourSelect } from "~/utils/dates";

const Select: React.FC = () => {
  const { selectedEvent, filteredEvents, setSelectedEvent } =
    useContext(GlobalContext);

  const slot = { ...selectedEvent } as CalendarEvent;
  const [dayEvents, setDayEvents] = useState(() =>
    filteredEvents.filter(
      (evt) =>
        evt !== selectedEvent &&
        dayjs(evt.day).format("DD/MM/YYYY") ===
          dayjs(selectedEvent?.day).format("DD/MM/YYYY"),
    ),
  );

  const handleStartHourChange = (hour: number): void => {
    if (hour > dayjs(selectedEvent?.end).hour()) {
      handleEndHourChange(hour + 1);
    }
    const dayUpdate = dayjs(selectedEvent?.day).set("hour", hour).valueOf();
    // @ts-expect-error
    // local storage typying issue
    setSelectedEvent((prevEvent) => {
      const updatedEvent = { ...prevEvent, day: dayUpdate };
      return updatedEvent;
    });
  };

  const handleStartMinChange = (min: number): void => {
    const dayUpdate = dayjs(selectedEvent?.day).set("minute", min).valueOf();
    setSelectedEvent({ ...selectedEvent, day: dayUpdate } as CalendarEvent);
  };

  const handleEndHourChange = (hour: number): void => {
    if (hour <= dayjs(selectedEvent?.day).hour()) {
      handleStartHourChange(hour - 1);
    }
    const endUpdate = dayjs(selectedEvent?.end).set("hour", hour).valueOf();
    // @ts-expect-error
    // local storage typying issue
    setSelectedEvent((prevEvent) => {
      const updatedEvent = { ...prevEvent, end: endUpdate };
      return updatedEvent;
    });
  };

  const handleEndMinChange = (min: number): void => {
    const endUpdate = dayjs(selectedEvent?.end).set("minute", min).valueOf();
    setSelectedEvent({ ...selectedEvent, end: endUpdate } as CalendarEvent);
  };

  const minutesOfHour = Array.from(
    { length: 60 },
    (_, i) => `${i < 10 ? "0" : ""}${i}`,
  );

  const startHours = startHourSelect(slot, dayEvents);
  const endHours = endHourSelect(slot, dayEvents);

  return (
    <span className="material-icons-outlined flex flex-col pl-3 text-gray-400">
      <div className="py-1">
        <select
          className="w-10 truncate"
          value={dayjs(selectedEvent?.day).hour()}
          onChange={(e) => handleStartHourChange(parseInt(e.target.value))}
        >
          {startHours.map((hour, index) =>
            hour === "Overlap!" ? (
              <option key={index} value="" disabled>
                {hour}
              </option>
            ) : (
              <option key={index} value={parseInt(hour)}>
                {hour}
              </option>
            ),
          )}
        </select>
        :
        <select
          className="w-10 truncate"
          value={dayjs(selectedEvent?.day).minute()}
          onChange={(e) => handleStartMinChange(parseInt(e.target.value))}
        >
          {minutesOfHour.map((min, index) => (
            <option key={min} value={index}>
              {min}
            </option>
          ))}
        </select>
      </div>
      <div className="py-1">
        <select
          className="w-10 truncate"
          value={dayjs(selectedEvent?.end).hour()}
          onChange={(e) => handleEndHourChange(parseInt(e.target.value))}
        >
          {endHours.map((hour, index) =>
            hour === "Overlap!" ? (
              <option key={index} value="" disabled>
                {hour}
              </option>
            ) : (
              <option key={index} value={parseInt(hour)}>
                {hour}
              </option>
            ),
          )}
        </select>
        :
        <select
          className="w-10 truncate"
          value={dayjs(selectedEvent?.end).minute()}
          onChange={(e) => handleEndMinChange(parseInt(e.target.value))}
        >
          {minutesOfHour.map((min, index) => (
            <option key={min} value={index}>
              {min}
            </option>
          ))}
        </select>
      </div>
    </span>
  );
};

export default Select;
