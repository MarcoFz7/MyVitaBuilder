import { FaTrophy } from "react-icons/fa";
import { GoEye, GoEyeClosed, GoTriangleDown } from "react-icons/go";

import StatisticsArea from "../statisticsArea/statisticsArea";
import { useState } from "react";

/**
 * Interface for the goals component with needed props from the parent
 */
interface GoalsProps {
    cadence: string;
}

// Nivo graph data templates - to use dynamic values
const userDataSampleUnit = [
    {
        "macro": "Calories",
        "Unit": 500,
    },
    {
        "macro": "Protein",
        "Unit": 10,
    },
    {
        "macro": "Carbs",
        "Unit": 80,
    }
];
const userDataSamplePercentage = [
    {
        "id": "Carbs",
        "data": [
            {
                "x": "%", "y": 27
            }
        ]
    },
    {
        "id": "Protein",
        "data": [
            {
                "x": "%", "y": 20
            }
        ]
    },
    {
        "id": "Calories",
        "data": [
            {
                "x": "%", "y": 20
            }
        ]
    },
    {
        "id": "Total",
        "data": [
            {
                "x": "%", "y": 24
            }
        ]
    }
];

/**
 * 
 * @returns goals component
 */
const Goals = ({ cadence }: GoalsProps) => {
    const [isGoalsSectionExpanded, setIsGoalsSectionExpanded] = useState<boolean>(false);

    const handleGoalsSectionExpand = () => {
        setIsGoalsSectionExpanded(!isGoalsSectionExpanded);
    }

    return (
        <>
            <div className={`h-full p-2 pt-0 bg-white w-full border border border-grey-100 shadow-sm rounded ${!isGoalsSectionExpanded && '!h-[35px] transition-all duration-500 ease'}`}>
                <div className="w-full h-full rounded">
                    <div className='flex flex-col rounded w-full h-full items-center text-sm'>
                        <div className="rounded w-full h-[12%] min-h-[35px] max-h-[35px]">
                            <div className="flex flex-row w-[96%] pl-[4%] h-full justify-center">
                                <div className="flex w-full h-full justify-center items-center text-sm hover:cursor-pointer text-c-sidebar-dark-green hover:text-c-dark-green" onClick={handleGoalsSectionExpand}>
                                    <span className="absolute flex items-center text-c-dark-green whitespace-nowrap overflow-hidden ">
                                        <FaTrophy className="text-c-dark-green inline-block mr-[0.375rem] h-[14px] w-[14px]" />
                                        <strong>{cadence} Goals</strong>
                                    </span>
                                    {isGoalsSectionExpanded ? (
                                        <span className="relative max-w-[80px] flex w-full items-center justify-center whitespace-nowrap overflow-hidden text-[10px] left-[95px]" title='Close section!'>
                                            <div className="flex flex-row items-center">
                                                Expanded
                                                <GoEye className='relative w-3 h-3 ml-1'/>
                                            </div>
                                        </span>
                                    ) :
                                        <span className="relative max-w-[80px] flex w-full items-center justify-center whitespace-nowrap overflow-hidden text-[10px] left-[95px]" title='Expand section!'>
                                            <div className="flex flex-row items-center">
                                                Closed
                                                <GoEyeClosed className='relative w-3 h-3 ml-1'/>
                                            </div>
                                        </span>    
                                    }  
                                </div>
                            </div>
                            {isGoalsSectionExpanded && (
                                <div className="grid pl-0 ml-[2%] w-[96%] h-px bg-c-dark-green justify-center"></div>
                            )}
                        </div>
                        {isGoalsSectionExpanded && (
                            <div className="w-full h-full p-3 pt-1 pr-10 pl-10">
                                <StatisticsArea userDataToUseUnit={userDataSampleUnit} userDataToUsePercentage={userDataSamplePercentage} initializeWithPhoneLayout={false} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Goals;