import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const Labels: React.FC = () => {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <div>
      <p className="mt-10 font-bold text-slate-400">Label</p>
      {labels.map(({ label, checked }, idx) => (
        <label key={idx} className="mt-3 pr-3">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label, checked: !checked })}
            className={`h-5 w-5 cursor-pointer rounded text-violet-100 accent-${label}-500 h-5 w-5 cursor-pointer appearance-none rounded-full transition-colors duration-200 checked:border-transparent checked:bg-${label}-600 focus:ring-0`}
          />
        </label>
      ))}
    </div>
  );
};

export default Labels;
