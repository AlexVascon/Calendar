import dayjs, { type Dayjs } from "dayjs";
import weekday from "dayjs/plugin/weekday";
import updateLocale from 'dayjs/plugin/updateLocale';
import type { CalendarEvent, Hours } from "~/types";

dayjs.extend(weekday);
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

export const getAvailableStartMinutes = (slot: CalendarEvent, dayEvents: CalendarEvent[]) => {
  let startMin = 0;
  dayEvents.forEach((evt) => {
    const evtEndMin = dayjs(evt.end).minute();
    if (dayjs(evt.end).isBefore(dayjs(slot.day), 'minute') && evtEndMin > startMin) {
      startMin = evtEndMin;
    }
  });
  return startMin;
}

export const startHour = (slot: CalendarEvent, dayEvents: CalendarEvent[]) => {
  let startHour = 0;
  dayEvents.forEach((evt) => {
    const evtEndHour = dayjs(evt.end).hour();
    if(dayjs(evt.end).hour() <= dayjs(slot.day).hour() && evtEndHour > startHour) {
      startHour = evtEndHour
    }
  });
  return startHour;
};

export const endHour = (slot: CalendarEvent, dayEvents: CalendarEvent[]) => {
  let endHour = 24;
  dayEvents.forEach((evt) => {
    const evtStartHour = dayjs(evt.day).hour();
    if(dayjs(evt.day).hour() >= dayjs(slot.end).hour() && evtStartHour < endHour) {
      endHour = evtStartHour
    }
  });
  return endHour;
};

export const startHourSelect = (slot: CalendarEvent, dayEvents: CalendarEvent[]) => {
  const start = startHour(slot, dayEvents);
  const end = endHour(slot, dayEvents);

  const hours = [];
  for (let i = start; i <end; i++) {
    hours.push(`${i.toString().padStart(2, '0')}`);
  }

  if (hours.length === 0 || hours[0] !== '00') hours.unshift('Overlap!');
  if (hours.length === 0 || hours[hours.length - 1] !== '23') hours.push('Overlap!');

  return hours;

}

export const endHourSelect = (slot: CalendarEvent, dayEvents: CalendarEvent[]) => {
  const start = startHour(slot, dayEvents) + 1;
  const end = endHour(slot, dayEvents);

  const hours = [];
  for (let i = start; i <=end; i++) {
    hours.push(`${i.toString().padStart(2, '0')}`);
  }

  if (hours.length === 0 || hours[0] !== '00') hours.unshift('Overlap!');
  if (hours.length === 0 || hours[hours.length - 1] !== '23') hours.push('Overlap!');

  return hours;
}

// export const hourRange = (slot: CalendarEvent, dayEvents: CalendarEvent[], place: Hours) => {
//   let start = startHour(slot, dayEvents) + 1;
//   let end = endHour(slot, dayEvents);

//   switch(place) {
//     case Hours.END:
//       start += 1
//       end += 1
//       break;
//     case Hours.START:
//       end -= 1
//   }

//   const hours = [];
//   for (let i = start; i <end; i++) {
//     hours.push(`${i.toString().padStart(2, '0')}`);
//   }

//   if (hours.length === 0 || hours[0] !== '00') hours.unshift('Overlap!');
//   if (hours.length === 0 || hours[hours.length - 1] !== '23') hours.push('Overlap!');

//   return hours;
// }




