import { MdHistory } from "react-icons/md";

/**
 * 
 * @returns history component
 */
const History = () => {

    return (
        <>
            <div className="flex flex-col rounded w-full h-full items-center mt-[1%] sm:mt-0 text-sm">
              <div className="rounded w-full h-[12%] min-h-[35px] max-h-[35px]">
                <div className="flex flex-row w-[96%] pl-[4%] h-full justify-center">                    
                  <div className="flex w-full h-full justify-center items-center text-sm">
                    <span className="flex items-center text-c-dark-green whitespace-nowrap overflow-hidden ">
                      <MdHistory className="text-c-dark-green inline-block mr-[0.375rem] h-[17px] w-[17px]" />
                      <strong>History</strong>
                    </span>
                  </div>             
                </div>
                <div className="pl-0 ml-[2%] w-[96%] h-px bg-c-dark-green"></div>
              </div>
              <div className="w-full h-full p-5 pr-10 pl-10">
              </div>             
            </div>
        </>
    );
};

export default History;