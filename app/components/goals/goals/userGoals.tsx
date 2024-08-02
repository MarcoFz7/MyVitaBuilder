import MainBtn from "../../buttons/mainBtn";

import { GrUpdate } from "react-icons/gr";
import { RiProhibited2Line } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";

/**
 * 
 * @returns user goals component
 */
const UserGoals = () => {

    const handleUpdateGoals = () => {

    }

    const handleCancelUpdateGoals = () => {

    }

    return (
        <>
        <div className="flex flex-col w-full h-full">
            <div className="rounded w-full h-[12%] min-h-[35px] max-h-[35px]">
                <div className="flex flex-row w-full h-full">
                  <div className="flex w-full h-full justify-center items-center text-sm">
                    <span className="flex items-center text-c-dark-green whitespace-nowrap overflow-hidden ">
                        <TbTargetArrow className="text-c-dark-green inline-block mr-[0.375rem] h-[18px] w-[18px]" />
                        <strong>Nutritional Targets</strong>
                      </span>
                  </div>
                </div>
                <div className="pl-0 ml-[2%] w-[96%] h-px bg-c-dark-green"></div>
            </div>
            <div className="flex flex-row w-full h-full gap-2 p-1">
                <div className="flex flex-row items-center h-full w-1/5">
                    <div className="flex flex-col w-full h-full items-center pt-1 text-sm">  
                        <div className="flex flex-col h-full w-1/2">               
                            <div className="flex w-full h-full rounded items-center justify-center p-2">           
                                <MainBtn
                                    label="Post"
                                    isDisabled={false}
                                    title="Add Post!"
                                    disabledTitle=""
                                    shadow={true}
                                    isRequestProcessing={false}
                                    icon={<GrUpdate className="mr-[0.35rem] mt-px w-[13px] h-[13px]" />}
                                    onClick={handleUpdateGoals}
                                />
                            </div>
                            <div
                            className={`flex w-full h-full rounded justify-center items-center p-2 ${
                                true ? " " : ""
                            }`}
                            >
                                <MainBtn
                                    label="Discard"
                                    isDisabled={false}
                                    title="Discard Post!"
                                    disabledTitle="Disabled. Post has no content."
                                    shadow={true}
                                    isRequestProcessing={false}
                                    icon={<RiProhibited2Line className="mr-[0.25rem] w-4 h-4" />}
                                    onClick={handleCancelUpdateGoals}
                                />
                            </div> 
                        </div>   
                    </div>       
                </div>
                <div className="h-full w-2/5 bg-black"></div>
                <div className="h-full w-2/5"></div>
            </div>
        </div>
        </>
    );
};

export default UserGoals;