import SecondaryBtn from "../../buttons/secondaryBtn";

import { FaTrophy } from "react-icons/fa";
import { CgInternal } from "react-icons/cg";
import StatisticsArea from "../statisticsArea/statisticsArea";

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
 * @returns goals preview component
 */
const GoalsPreview = () => {


    const handleGoToGoalsPageBtn = () => {
    }

    return (
        <>
            <div className="flex flex-col h-full w-full text-sm">
                <div className="rounded w-full h-[12%] min-h-[35px] max-h-[35px]">
                    <div className="flex flex-row w-full h-full">
                        <div className="flex w-full h-full justify-center items-center">
                            <span className="flex items-center text-c-dark-green whitespace-nowrap overflow-hidden ">
                                <FaTrophy className="text-c-dark-green inline-block mr-[0.375rem] h-[14px] w-[14px]" />
                                <strong>Goals Preview</strong>
                            </span>
                        </div>
                    </div>
                    <div className="pl-0 ml-[4%] w-[92%] sm:ml-[3%] sm:w-[94%] h-px bg-c-dark-green"></div>
                </div>
                <div className="flex w-full h-full">
                    <div className="flex flex-col sm:flex-row w-full h-full max-h-[97.5%] p-1 pt-2 pl-[3%] pr-[3%] gap-0 sm:gap-[2%]">
                        <div className="flex flex-col bg-c-paper-white w-full sm:w-1/3 h-full p-1 pr-3 pl-3 rounded text-center">
                            <span className="bg-c-custom-shadow-black text-c-dark-green rounded p-1 font-bold">Check your daily progress!</span>
                            <div className="flex flex-col flex-grow text-white h-full justify-center pb-3 pt-3">
                                <span className="text-black ">Understand your behavior, and adjust your meals for <strong className="text-c-dark-green">better results</strong>.</span>
                                <span className="text-black">To set the daily target, and have a wider perspective, with <strong className="text-c-dark-green">weekly and monthly statistics</strong>, go to...</span>
                            </div>
                            <div className="w-auto text-white">
                                <SecondaryBtn label="Goals Page" isDisabled={false} title="Go to Goals page!" disabledTitle="" icon={<CgInternal className='ml-[0.25rem] w-6 h-6 mb-px' />} onClick={() => {handleGoToGoalsPageBtn}} />
                            </div>
                        </div>
                        <div className="flex flex-col rounded w-full sm:w-2/3 h-full items-center mt-[1%] sm:mt-0">
                            <StatisticsArea userDataToUseUnit={userDataSampleUnit} userDataToUsePercentage={userDataSamplePercentage} initializeWithPhoneLayout={false}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GoalsPreview;