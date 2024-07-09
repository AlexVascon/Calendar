import { type NextPage } from "next";
import { useContext } from "react";
import Week from "~/components/Week";
import GlobalContext from "../context/GlobalContext";
import EventModal from "~/components/EventModal";
import dayjs from "dayjs";
import Sidebar from "~/components/Sidebar";
import Header from "~/components/Header";
import Month from "~/components/Month";
import Day from "~/components/Day";
import { Choice } from "~/types";

const Home: NextPage = () => {
  const dynamicStartDate = dayjs().startOf("week");
  const { showEventModal, choice } = useContext(GlobalContext);

  return (
    <>
      {showEventModal && <EventModal />}
      <div className="flex h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          {choice === Choice.WEEK && <Week week={dynamicStartDate} />}
          {choice === Choice.MONTH && <Month />}
          {choice === Choice.DAY && <Day />}
        </div>
      </div>
    </>
  );
};

export default Home;
