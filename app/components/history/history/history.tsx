import { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";

import { MdHistory } from "react-icons/md";
import { ContinuousCalendar } from "../calendar/calendar";

/**
 * 
 * @returns history component
 */
const History = () => {
  const [isHistorySectionExpanded, setIsHistorySectionExpanded] = useState<boolean>(false);

  const handleHistorySectionExpand = () => {
      setIsHistorySectionExpanded(!isHistorySectionExpanded);
  }
  
  return (
    <>
      <div className={`h-auto p-2 pt-0 bg-white w-full border border border-grey-100 shadow-sm rounded transition-all duration-500 ease ${!isHistorySectionExpanded && '!h-[35px]'}`}>
        <div className="w-full h-full rounded">
          <div className={`flex flex-col rounded w-full h-full items-center text-sm ${isHistorySectionExpanded ? 'mt-1' : 'mt-0'}`}>
            <div className="rounded w-full h-[12%] min-h-[35px] max-h-[35px]">
              <div className="flex flex-row w-[96%] pl-[4%] h-full justify-center">
                  <div className="flex w-full h-full justify-center items-center text-sm">
                      <span className="absolute flex items-center text-c-dark-green whitespace-nowrap overflow-hidden ">
                          <MdHistory className="text-c-dark-green inline-block mr-[0.375rem] h-[14px] w-[14px]" />
                          <strong>History</strong>
                      </span>
                      <span className="relative max-w-[80px] flex w-full items-center justify-center text-c-sidebar-dark-green whitespace-nowrap overflow-hidden text-[10px] left-[77.5px]">
                          {isHistorySectionExpanded ? (
                              <>
                                  Expanded
                                  <GoEye className='relative w-3 h-3 hover:cursor-pointer hover:text-c-sidebar-dark-green ml-1 mt-px' title='Close section!' onClick={handleHistorySectionExpand} />
                              </>
                          ) :
                              <>
                                  Closed
                                  <GoEyeClosed className='relative w-3 h-3 hover:cursor-pointer hover:text-c-sidebar-dark-green ml-1 mt-px' title='Expand section!' onClick={handleHistorySectionExpand} />
                              </>
                          }
                      </span>
                  </div>
              </div>
              {isHistorySectionExpanded && (
                  <div className="grid pl-0 ml-[2%] w-[96%] h-px bg-c-dark-green justify-center"></div>
              )}
            </div>
            {isHistorySectionExpanded && (
              <div className="w-full h-full p-1 pr-2 pl-2">
                  <ContinuousCalendar/>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;