
import React from 'react';
import ScheduleTable from './components/ScheduleTable';


const App: React.FC = () => {
  return (
    <div className="bg-slate-100 flex items-stretch gap-0 pt-12 max-md:flex-wrap">
     
      <div className="bg-violet-950 flex w-[72px] shrink-0 h-[934px] flex-col max-md:hidden" />
      <div className="flex grow basis-[0%] flex-col items-stretch self-start max-md:max-w-full">
        <div className="bg-violet-950 bg-opacity-10 flex shrink-0 h-10 flex-col border-y-zinc-300 border-t border-solid border-b max-md:max-w-full" />

        <div className="ml-5 mr-5 pl-2 pr-2"> <ScheduleTable /></div> 
      </div>
    </div>
  );
};

export default App;