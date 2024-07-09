import dayjs, { type Dayjs } from "dayjs";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import GlobalContext from "~/context/GlobalContext";
import type { CalendarEvent, MinuteProps } from "~/types";

enum Position {
  Title,
  CROSS_BORDER,
  CROSS_TOP_BORDER,
  CROSS_BOTTOM_BORDER,
  ENTER_SLOT,
  IN_SLOT,
  EXIT_SLOT,
}

const Minute: React.FC<MinuteProps> = ({ day, hour, full }) => {
  const {
    filteredEvents,
    setSelectedEvent,
    selectedEvent,
    setShowEventModal,
    setDaySelected,
    setExists,
  } = useContext(GlobalContext);

  const [dayEvents, setDayEvents] = useState<CalendarEvent[]>();

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD/MM/YYYY") === day.format("DD/MM/YYYY"),
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  const minutesOfHour = useMemo(
    () => Array.from({ length: 60 }, (_, i) => i),
    [],
  );

  const eventTitle = useCallback(
    (hour: number, minute: number) => {
      if (!dayEvents) return null;

      const foundEvent = dayEvents.find(
        ({ day }) =>
          dayjs(day).hour() === hour && dayjs(day).minute() === minute,
      );
      return foundEvent ? foundEvent.title : null;
    },
    [dayEvents],
  );

  const findEvent = (hour: number, min: number, dayEvents: CalendarEvent[]) => {
    if (!dayEvents.length) return;

    return dayEvents.find((evt) => {
      const start = dayjs(evt.day);
      const end = dayjs(evt.end);

      const startsWithinHour = start.hour() === hour && start.minute() <= min;
      const endsWithinHour = end.hour() === hour && end.minute() >= min;
      const spansHour = start.hour() < hour && end.hour() > hour;

      return startsWithinHour || endsWithinHour || spansHour;
    });
  };

  const eventStyle = (event: CalendarEvent, position: Position) => {
    const baseStyle = `cross-side-borders border-l-8 border-${event.label}-300 bg-${event.label}-100`;

    switch (position) {
      case Position.Title:
        return `${baseStyle} px-2`;
      case Position.ENTER_SLOT:
        return `${baseStyle} cross-top-border`;
      case Position.EXIT_SLOT:
        return `${baseStyle} cross-bottom-border`;
      case Position.IN_SLOT:
        return `${baseStyle}`;
    }
  };

  const getEventForMinute = useCallback(
    (hour: number, min: number) => {
      if (!dayEvents) return;

      const event = findEvent(hour, min, dayEvents);
      if (!event) return;

      const start = dayjs(event.day);
      const end = dayjs(event.end);

      if (start.hour() === hour && start.minute() === min) {
        return eventStyle(event, Position.Title);
      }
      if (hour > start.hour() && hour < end.hour() && min === 0) {
        return eventStyle(event, Position.ENTER_SLOT);
      }
      if (hour === end.hour() && min === 0) {
        return eventStyle(event, Position.ENTER_SLOT);
      }
      if (hour > start.hour() && hour < end.hour() && min === 59) {
        return eventStyle(event, Position.EXIT_SLOT);
      }
      if (end.hour() === hour && end.minute() === min) {
        return eventStyle(event, Position.IN_SLOT);
      }
      return eventStyle(event, Position.IN_SLOT);
    },
    [dayEvents],
  );

  const handleCellClick = (day: Dayjs, hour: number, min: number): void => {
    setDaySelected(day);

    if (!dayEvents?.length) {
      setExists(false);
      const startDateTime = day.set("hour", hour).set("minute", min);
      const endDateTime = startDateTime.clone().add(1, "hour");

      // @ts-ignore
      setSelectedEvent({
        ...selectedEvent,
        day: startDateTime.valueOf(),
        end: endDateTime.valueOf(),
      });
      setShowEventModal(true);
      return;
    }

    const event = findEvent(hour, min, dayEvents);

    if (event) {
      setExists(true);
      setSelectedEvent(event);
      setShowEventModal(true);
      return;
    }

    const startDateTime = day.set("hour", hour).set("minute", min);
    const endDateTime = startDateTime.clone().add(1, "hour");

    // @ts-ignore
    setSelectedEvent({
      day: startDateTime.valueOf(),
      end: endDateTime.valueOf(),
    });

    setShowEventModal(true);
  };

  return (
    <div
      className={`${full ? "w-full" : "relative col-span-1"} cursor-pointer rounded-lg rounded-bl-lg rounded-tl-lg border-l border-r border-t border-violet-100`}
    >
      {minutesOfHour.map((minute, index) => (
        <div
          key={index}
          className={`${eventTitle(hour, minute) ? "h-1" : "h-0.5"} ${getEventForMinute(hour, minute)}`}
          onClick={() => handleCellClick(day, hour, minute)}
        >
          {eventTitle(hour, minute)}
        </div>
      ))}
    </div>
  );
};

export default Minute;
