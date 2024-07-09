import { type Dayjs } from "dayjs";

export interface Props {
  children: React.ReactNode;
}

export interface Action {
  type: string;
  payload: CalendarEvent;
}

export interface Label {
  label: string;
  checked: boolean;
}

export interface CalendarEvent {
  title: string;
  description?: string;
  label: string;
  day: number;
  end: number;
  id: number;
}

export type DispatchCallEventType = {
  type: "push" | "update" | "delete";
  payload: CalendarEvent;
}

const labels = ["indigo" , "gray" , "green" , "blue" , "red" , "purple"].map((label) => ({label: label, checked: true}))

export type GlobalContextTypes = {
  exists: boolean;
  setExists: (exists: boolean) => void;
  dayIndex: number;
  setDayIndex: (day: number) => void;
  day: Dayjs;
  setDay: (day: Dayjs) => void;
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  weekIndex: number;
  setWeekIndex: (index: number) => void;
  smallCalendarMonth: number;
  setSmallCalendarMonth: (index: number) => void;
  daySelected: Dayjs;
  setDaySelected: (day: Dayjs) => void;
  showEventModal: boolean;
  setShowEventModal: (flag: boolean) => void;
  dispatchCalEvent: (action: { type: string; payload: CalendarEvent }) => void;
  savedEvents: CalendarEvent[];
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: (event: CalendarEvent) => void;
  setLabels: (labels: Label[]) => void;
  labels: Label[];
  updateLabel: (label: Label) => void;
  filteredEvents: CalendarEvent[];
  choice: Choice;
  setChoice: (input: number) => void;
};

export type DayProps = {
  day: Dayjs;
  rowIdx: number;
};

export type WeekProps = {
  week: Dayjs;
};

export type MinuteProps = {
  day: Dayjs;
  hour: number;
  full?: boolean;
}

export type HourProps = {
  hour: number;
}

export enum Choice {
  DAY,
  WEEK,
  MONTH
}

export enum Direction {
  FORWARD,
  BACK,
}

export enum Hours {
  START,
  END
}