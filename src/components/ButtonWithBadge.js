import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BadgeButton ({ initialCount, icon, action, isLeft }) {
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    action();
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={initialCount > 0 ? "m-5 relative bg-transparent-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        : "m-5 relative bg-transparent-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition rounded opacity-50 cursor-not-allowed"}>
      <FontAwesomeIcon icon={icon} className="text-white-500 m-1" />
      {count >= 0 && (
        <span className={isLeft ? "absolute top-0 left-0 -mt-2 -ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
        : "absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"}>
          {count}
        </span>
      )}
    </button>
  );
};

export default BadgeButton;
