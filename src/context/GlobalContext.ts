import dayjs from "dayjs";
import React from "react";
import type { GlobalContextTypes } from "~/types";

const labels = ["amber" , "orange" , "green" , "blue" , "red" , "purple"].map((label) => ({label: label, checked: true}))

// eslint-disable-next-line
const noop = () => {}; 

const GlobalContext = React.createContext<GlobalContextTypes>({
  exists: false,
  setExists: noop,
  dayIndex: 0,
  setDayIndex: noop,
  day: dayjs(),
  setDay: noop,
  monthIndex: 0,
  setMonthIndex: noop,
  weekIndex: 0,
  setWeekIndex: noop,
  smallCalendarMonth: 0,
  setSmallCalendarMonth: noop,
  daySelected: dayjs(),
  setDaySelected: noop,
  showEventModal: false,
  setShowEventModal: noop,
  dispatchCalEvent: noop,
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: noop,
  setLabels: () => labels,
  labels,
  updateLabel: noop,
  filteredEvents: [],
  choice: 1,
  setChoice: noop,
});

export default GlobalContext;