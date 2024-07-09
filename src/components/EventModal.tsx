import React, { type FormEvent, useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import { type CalendarEvent } from "~/types";
import Select from "./Select";
import "react-quill/dist/quill.snow.css";
import Editor from "./Editor";

const labelsClasses = ["amber", "orange", "green", "blue", "red", "purple"];

const EventModal: React.FC = () => {
  const {
    setShowEventModal,
    dispatchCalEvent,
    selectedEvent,
    exists,
    setSelectedEvent,
  } = useContext(GlobalContext);

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0],
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const calendarEvent: CalendarEvent = {
      title: selectedEvent?.title ?? "",
      description: selectedEvent?.description ?? "",
      label: selectedLabel ?? "",
      day: dayjs(selectedEvent?.day).valueOf(),
      end: dayjs(selectedEvent?.end).valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    if (exists) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center">
      <form className="w-1/2 rounded rounded-lg bg-white shadow-2xl">
        <header className="mb-0 flex items-center justify-between rounded rounded-t-lg bg-violet-100 px-4 py-2">
          <div>
            {selectedEvent?.title && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined cursor-pointer text-gray-400"
              >
                delete
              </span>
            )}
          </div>
          <button onClick={() => setShowEventModal(false)}>
            <span className="material-icons-outlined pr-2 text-xl font-semibold text-gray-400">
              X
            </span>
          </button>
        </header>
        <div className="">
          <div className="grid-cols-1/5 mt-0 grid items-end gap-y-2">
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={selectedEvent?.title ?? ""}
              required
              className="w-full border-gray-200 bg-violet-100 pb-2 pl-3 text-xl font-semibold text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0"
              onChange={(e) =>
                // @ts-expect-error local storage typying issue
                setSelectedEvent((ev) => {
                  return { ...ev, title: e.target.value };
                })
              }
            />
            <p className="pl-3">
              {dayjs(selectedEvent?.day).format("dddd, MMMM DD")}
            </p>
            <Select />
            <Editor />
            <div className="flex gap-x-2 pl-3 pt-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`${selectedLabel === lblClass ? `bg-${lblClass}-500` : `bg-${lblClass}-200`} flex h-6 w-6 cursor-pointer items-center justify-center rounded-full`}
                ></span>
              ))}
            </div>
          </div>
        </div>
        <footer className="mt-5 flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full rounded-b-lg bg-violet-100 px-6 py-3 text-xl font-semibold text-gray-400  hover:bg-blue-600"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
