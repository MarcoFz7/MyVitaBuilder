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

      if (isHistorySectionExpanded) {
        scrollHistorySectionToEndPage();
      } else {
        setTimeout(() => {
          scrollToFocusOnHistorySection();
        }, 500)
      }
  }

  const scrollToFocusOnHistorySection = () => {
    const historyElement = document.getElementById('history');

      if (historyElement) {
          const elementPosition = historyElement.getBoundingClientRect().top + window.scrollY; 
          const targetPosition = elementPosition - 52.5;

          window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
          });
      }
  }

  const scrollHistorySectionToEndPage = () => {
    const historyElement = document.getElementById('history');

    if (historyElement) {
        const elementPosition = historyElement.getBoundingClientRect().top + window.scrollY;
        const targetPosition = elementPosition - window.innerHeight + 35;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};
  
  return (
    <>
      <div className={`h-full p-2 pb-4 pt-0 bg-white w-full border border border-grey-100 shadow-sm rounded ${!isHistorySectionExpanded && '!h-[35px] transition-all duration-500 ease'}`}>
        <div className="w-full h-full rounded">
          <div className='flex flex-col rounded w-full h-full items-center text-sm'>
            <div className="rounded w-full h-[12%] min-h-[35px] max-h-[35px]">
              <div className="flex flex-row w-[96%] pl-[4%] h-full justify-center">
                  <div className="flex w-full h-full justify-center items-center text-sm hover:cursor-pointer text-c-sidebar-dark-green hover:text-c-dark-green" onClick={handleHistorySectionExpand}>
                      <span className="absolute flex items-center text-c-dark-green whitespace-nowrap overflow-hidden ">
                          <MdHistory className="text-c-dark-green inline-block mr-[0.375rem] h-[16px] w-[16px]" />
                          <strong id="history">History</strong>
                      </span>
                        {isHistorySectionExpanded ? (
                          <span className="relative max-w-[80px] flex w-full items-center justify-center whitespace-nowrap overflow-hidden text-[10px] left-[77.5px]" title='Close section!'>
                            <div className="flex flex-row items-center">
                                Expanded
                                <GoEye className='relative w-3 h-3 ml-1 mt-px'/>
                            </div>
                          </span>
                        ) :
                          <span className="relative max-w-[80px] flex w-full items-center justify-center whitespace-nowrap overflow-hidden text-[10px] left-[77.5px]" title='Expand section!'>
                            <div className="flex flex-row items-center">
                                Closed
                                <GoEyeClosed className='relative w-3 h-3 ml-1 mt-px'/>
                            </div>
                          </span>
                        }
                  </div>
              </div>
              {isHistorySectionExpanded && (
                  <div className="grid pl-0 ml-[2%] w-[96%] h-px bg-c-dark-green justify-center"></div>
              )}
            </div>
            {isHistorySectionExpanded && (
              <div className="w-full h-full p-1 pr-2 pl-2 max-w-[1000px]">
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