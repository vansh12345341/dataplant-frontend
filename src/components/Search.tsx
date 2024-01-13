import React, { useState } from 'react';
import AddScheduleForm from './forms/AddScheduleForm'; 
import Search from "../assets/search.svg"

interface SearchBarProps {
  onNewScheduleAdded : () => void;
  onSearchChange:(term: string)=> void;
}


function SearchBar({ onNewScheduleAdded , onSearchChange}: SearchBarProps) {
  const [showAddSchedule, setShowAddSchedule] = useState(false);

  
  return (
    <>
      {showAddSchedule && <AddScheduleForm onClose={() => setShowAddSchedule(false)} onAdd={onNewScheduleAdded} />}
      <div className="flex flex-col mt-5 pl-6 pr-14 w-full md:max-w-full md:px-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex ml-9 pl-9 items-center rounded border bg-white px-3 py-2.5 border-solid border-gray-200 text-neutral-400 text-sm">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full focus:outline-none"
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <img
              loading="lazy"
              src={Search}
              className="ml-2 object-contain object-center w-[21px]"
            />
          </div>
          
          <span className="mr-9 pr-9 rounded border bg-violet-950 p-2 border-solid border-gray-200">
            <button
              onClick={() => setShowAddSchedule(true)}
              className="text-white ml-3 pl-3 text-xs font-semibold"
            >
              Add
            </button>
          </span>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
