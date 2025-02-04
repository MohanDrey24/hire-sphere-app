import React from "react";

import Hexagon from "./Hexagon";

const HexagonHive: React.FC = () => {
  const createColumn = (offset: boolean = false) => (
    <div
      className={`flex flex-col space-y-3 -translate-y-8 -translate-x-2 ${offset ? "-translate-y-4" : ""}`}
    >
      {[...Array(24)].map((_, index) => (
        <Hexagon className="" key={index} size="sm" />
      ))}
    </div>
  );

  const createColumnSet = () => <div className="flex">{createColumn()}</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      {[...Array(24)].map((_, index) => (
        <div
          key={index}
          className={index % 2 === 0 ? "" : "translate-y-[33px]"}
        >
          {createColumnSet()}
        </div>
      ))}
    </div>
  );
};

export default HexagonHive;
