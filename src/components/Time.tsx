type TimeProps = {
  hour: number;
  fixed?: boolean;
};

const Time: React.FC<TimeProps> = ({ hour, fixed }) => {
  return (
    <div
      className={`flex ${fixed && "w-[10rem]"} items-start justify-center rounded-lg border border-violet-100 text-slate-400`}
    >
      {hour < 10 ? "0" : ""}
      {hour + ":00"}
    </div>
  );
};

export default Time;
