import React from 'react';
import Hexagon from './Hexagon';

const HexagonHive: React.FC = () => {
  // Function to create a column of hexagons
  const createColumn = (offset: boolean = false) => (
    <div className={`flex flex-col space-y-1 ${offset ? '-translate-y-0' : ''}`}>
      {[...Array(8)].map((_, index) => (
        <Hexagon key={index} size="sm" color="blue" />
      ))}
    </div>
  );

  // Function to create a set of two columns
  const createColumnSet = () => (
    <div className="flex">
      {createColumn()}
      {createColumn(true)}
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* We'll create 6 sets of columns to ensure full coverage */}
      {[...Array(6)].map((_, index) => (
        <div key={index} className={index % 2 === 0 ? '' : '-translate-y-0'}>
          {createColumnSet()}
        </div>
      ))}
    </div>
  );
};

export default HexagonHive;