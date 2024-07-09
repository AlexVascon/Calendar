import dynamic from "next/dynamic";
import { useContext } from "react";
import GlobalContext from "~/context/GlobalContext";
import { CalendarEvent } from "~/types";
const Quill = dynamic(() => import("react-quill"), { ssr: false });

const Editor: React.FC = () => {
  const { selectedEvent, setSelectedEvent } = useContext(GlobalContext);

  return (
    <div>
      <Quill
        value={selectedEvent?.description}
        onChange={(val) =>
          // @ts-expect-error local storage typying issue
          setSelectedEvent((event) => {
            return { ...event, description: val } as CalendarEvent;
          })
        }
      />
    </div>
  );
};

export default Editor;
