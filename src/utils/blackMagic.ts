import dayjs, { type Dayjs } from "dayjs";
import weekDay from "dayjs/plugin/weekDay";
import updateLocale from 'dayjs/plugin/updateLocale';
import type { CalendarEvent } from "~/types";

dayjs.extend(weekDay);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1 
});


export const getMonth = (month: number = dayjs().month()): Dayjs[][] => {
  month = Math.floor(month);
  const year: number = dayjs().year();
  const firstDayOfTheMonth: number = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount: number = 0 - firstDayOfTheMonth;

  const daysMatrix: Dayjs[][] = new Array(5).fill([]).map((): Dayjs[] => {
    return new Array(7).fill(null).map((): Dayjs => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  
  return daysMatrix;
}

export const getWeek = (week: number = dayjs().week()): Dayjs[] => {
  const year: number = dayjs().year();
  const firstDayOfWeek: Dayjs = dayjs().year(year).week(week).startOf('week');
  const weekDays: Dayjs[] = [];

  for (let i = 0; i < 7; i++) {
    weekDays.push(firstDayOfWeek.add(i, 'day'));
  }

  return weekDays;
}

export const hours = (): Array<string> => {
  const hours = []
  for(let i = 0; i <24; i++) {
    hours.push(`${i.toString().padStart(2, "0")}`);
  }
  return hours;
}

export const hourss = (calEvent: CalendarEvent) => {
  let startHour = 24
  if(calEvent) startHour = dayjs(calEvent.day).hour()

  const hours = []
  for(let i = 0; i <24; i++) {
    if(i >= startHour) {
      hours.push('Overlap!')
      break;
    } 
    hours.push(`${i.toString().padStart(2, "0")}`);
  }

  return hours;
}

export const findEvent = (slot:CalendarEvent, events: CalendarEvent[]) => {
  const event = events.find((evt) => {
    const eventStart = dayjs(evt.day);
    const eventEnd = dayjs(evt.end);
    const slotStart = dayjs(slot.day)
    const slotEnd = dayjs(slot.end);

    // Check if the event falls on the given day
    if (eventStart.format("dddd") === slotStart.format("dddd")) {
      // Check if the event starts within the specified hour and minute range
      const startsWithinHour =
        eventStart.hour() === slotStart.hour() && eventStart.minute() <= slotStart.minute();

      // Check if the event ends within the specified hour and minute range
      const endsWithinHour =
        eventEnd.hour() === slotEnd.hour() && eventEnd.minute() >= slotEnd.minute();

      // Check if the event spans the entire hour
      const spansHour = eventStart.hour() < slotEnd.hour() && eventEnd.hour() > slotEnd.hour();

      return startsWithinHour || endsWithinHour || spansHour;
    }
  });

  return event ? true : false;
}

export const checkOverlap = (event: CalendarEvent, dayEvents: CalendarEvent[]): boolean => {
  if(!dayEvents) return false;

  return findEvent(event, dayEvents);
}

export const getAvailableStartHours = (slot: CalendarEvent, dayEvents: CalendarEvent[]) => {
  let startHour = 0;
  dayEvents.forEach((evt) => {
    const evtEndHour = dayjs(evt.end).hour();
    if (dayjs(evt.end).isBefore(dayjs(slot.day), 'hour') && evtEndHour > startHour) {
      startHour = evtEndHour;
    }
  });
  return startHour;
};

export const getAvailableEndHours = (slot: CalendarEvent, dayEvents: CalendarEvent[]) => {
  let endHour = 24;
  dayEvents.forEach((evt) => {
    const evtStartHour = dayjs(evt.day).hour();
    if (dayjs(evt.day).isAfter(dayjs(slot.end), 'hour') && evtStartHour < endHour) {
      endHour = evtStartHour;
    }
  });
  return endHour;
};

export const generateHourSelection = (slot: CalendarEvent, dayEvents: CalendarEvent[]) => {
  const start = getAvailableStartHours(slot, dayEvents);
  const end = getAvailableEndHours(slot, dayEvents);

  const hours = [];
  for (let i = start; i < end; i++) {
    hours.push(`${i.toString().padStart(2, '0')}`);
  }

  if (hours[0] !== '00') hours.unshift('Overlap!');
  if (hours[hours.length - 1] !== '23') hours.push('Overlap!');

  return hours;
};



