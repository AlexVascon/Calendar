import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs, { type Dayjs } from "dayjs";
import {
  type Action,
  type CalendarEvent,
  Choice,
  type Label,
  type Props,
} from "~/types";

const label: Label[] = [
  "amber",
  "orange",
  "green",
  "blue",
  "red",
  "purple",
].map((label) => ({ label: label, checked: true }));

function savedEventsReducer(
  state: CalendarEvent[],
  action: Action,
): CalendarEvent[] {
  switch (action.type) {
    case "push":
      return [...state, action.payload];
    case "update":
      return state.map((evt) =>
        evt.id === action.payload.id ? action.payload : evt,
      );
    case "delete":
      return state.filter((evt) => evt.id !== action.payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  // @ts-ignore
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper({ children }: Props): JSX.Element {
  const [choice, setChoice] = useState<Choice>(Choice.WEEK);
  const [dayIndex, setDayIndex] = useState<number>(dayjs().date());
  const [weekIndex, setWeekIndex] = useState<number>(dayjs().week());
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
  const [daySelected, setDaySelected] = useState<Dayjs>(dayjs());
  const [day, setDay] = useState(dayjs);
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [labels, setLabels] = useState<Label[]>(label);
  const [exists, setExists] = useState(false);
  const [smallCalendarMonth, setSmallCalendarMonth] = useState<number>(
    dayjs().month(),
  );
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents,
  );

  const filteredEvents = useMemo(() => {
    return savedEvents.filter(({ label }) =>
      labels
        .filter(({ checked }) => checked)
        .map(({ label }) => label)
        .includes(label),
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) =>
      [...new Set(savedEvents.map(({ label }) => label))].map((label) => ({
        label,
        checked: prevLabels.find((lbl) => lbl.label === label)?.checked ?? true,
      })),
    );
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) setMonthIndex(smallCalendarMonth);
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) setSelectedEvent(null);
  }, [showEventModal]);

  const updateLabel = (label: Label): void => {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  };

  return (
    <GlobalContext.Provider
      value={{
        exists,
        setExists,
        dayIndex,
        setDayIndex,
        weekIndex,
        setWeekIndex,
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        day,
        setDay,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
        choice,
        setChoice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
