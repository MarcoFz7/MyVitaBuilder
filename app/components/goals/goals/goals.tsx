import { FaTrophy } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";

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
        "macro": "Calor.",
        "Unit": 500,
    },
    {
        "macro": "Prot.",
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
const Goals = ({ cadence } : GoalsProps) => {
    const [isGoalsSectionExpanded, setIsGoalsSectionExpanded] = useState<boolean>(true);

    const handleGoalsSectionExpand = () => {
        setIsGoalsSectionExpanded(!isGoalsSectionExpanded);
    }

    return (
        <>
            <div className={`sm:h-full p-1 bg-white w-full border border border-grey-100 shadow-sm rounded ${!isGoalsSectionExpanded && '!h-[55px]'} transition-all duration-500 ease`}>
                <div className="w-full h-full rounded">
                    <div className="flex flex-col rounded w-full h-full items-center mt-[1%] sm:mt-0 text-sm">
                    <div className="rounded w-full h-[12%] min-h-[35px] max-h-[35px]">
                        <div className="flex flex-row w-[96%] pl-[4%] h-full justify-center">                    
                        <div className="flex w-full h-full justify-center items-center text-sm">
                            <span className="flex items-center text-c-dark-green whitespace-nowrap overflow-hidden ">
                            <FaTrophy className="text-c-dark-green inline-block mr-[0.375rem] h-[14px] w-[14px]" />
                            <strong>{cadence} Goals</strong>
                            </span>
                        </div>             
                        </div>
                        <div className="grid pl-0 ml-[2%] w-[96%] h-px bg-c-dark-green justify-center">
                            <GoTriangleDown className={`relative text-c-dark-green top-[-15px] w-6 h-6 hover:cursor-pointer hover:text-c-sidebar-dark-green rotate-180 ${!isGoalsSectionExpanded && '!top-[-8px] rotate-0'}`} title={`${isGoalsSectionExpanded ? 'Close Goals Section!' : 'Expand Goals Section!'}`} onClick={handleGoalsSectionExpand}/>
                        </div>
                    </div>
                    {isGoalsSectionExpanded ? (
                        <div className="w-full h-full p-5 pr-10 pl-10">
                            <StatisticsArea userDataToUseUnit={userDataSampleUnit} userDataToUsePercentage={userDataSamplePercentage} initializeWithPhoneLayout={true}/>  
                        </div>
                    ) : null }             
                    </div>
                </div>
            </div>
        </>
    );
};

export default Goals;