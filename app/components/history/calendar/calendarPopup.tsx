import { IoCloseSharp } from "react-icons/io5";
import { BiSolidCheckboxChecked } from "react-icons/bi";
import { BiSolidCheckboxMinus } from "react-icons/bi";

import TertiaryBtn from "../../buttons/tertiaryBtn";
import { useEffect, useState } from "react";

/**
 * Interface for the calendar popup with needed props from the parent
 */
interface calendarPopupProps {
    date: string;
    managePopupState: () => void;
}

/**
 * @returns calendar custom popup
 */
const CalendarPopup = ({ date, managePopupState }: calendarPopupProps) => {

    const [retrievedData, setRetrievedData] = useState<any>(null);
    const [targetsAchieved, setTargetsAchieved] = useState<number>(0);

    useEffect(() => {
        // Simulate a data retrieval process for the selected date
        // Get by date for user meals
        // Do process to be able know user target for each day
        const retrievedSampleData = [
            { label: "Calories", value: 1920, target: 1950, targetMet: true },
            { label: "Protein", value: 250, target: 150, targetMet: false },
            { label: "Carbohydrates", value: 200, target: 195, targetMet: true }
        ];

        let targets = 0;
        retrievedSampleData.forEach(macro => {
            if (macro.targetMet) {
                targets++;
            }
        });

        setRetrievedData(retrievedSampleData);
        setTargetsAchieved(targets);

    }, [date]);

    return (
        <>
            <div className='fixed h-full w-full top-0 left-0 bg-c-shadow-black z-[100] backdrop-blur-[0.85px] flex items-center justify-center'>
                <div className="w-1/5 h-1/4 min-w-[280px] ssm-calendar:min-w-[380px] flex items-center justify-center bg-c-global-bg-color rounded shadow-md p-2">
                    <div className="flex flex-col h-full w-full">
                        <div className="flex flex-row h-1/5 w-full items-center justify-center bg-c-custom-shadow-black rounded gap-1">
                            <div className="flex w-[87.5%] h-full items-center text-sm pl-2 ssm-calendar:pl-[11.5%]">
                                <span>Your macronutrients for {date}</span>
                            </div>
                            <div className="flex w-[12.5%] h-auto justify-end pr-2">
                                <TertiaryBtn operationStatus='' btnIcon={<IoCloseSharp className='w-5 h-5'/>} isDisabled={false} inSequence={false} title='Close Popup!' onClick={managePopupState}/>
                            </div>
                        </div>
                        <div className="flex flex-col h-full w-full justify-center items-center">
                            <div className="flex flex-col h-3/5 w-full ssm-calendar:w-4/5 p-1 pl-2">
                                <div className="flex flex-row w-full h-full">
                                    {/* Macros section */}
                                    <div className="flex flex-col w-[70%] h-full">
                                        <div className="flex h-1/4 w-full items-center"></div>
                                        {/* Conditionally render data once retrievedData is not null */}
                                        {retrievedData ? retrievedData.map((macro: any, index: any) => (
                                            <div key={index} className="flex h-1/4 w-full items-center">
                                                <span>{macro.label}: {macro.value}g</span>
                                            </div>
                                        )) : <div>Loading...</div>}
                                    </div>
                                    
                                    {/* Target section */}
                                    <div className="flex flex-col w-1/4 h-full justify-center items-center">
                                        <div className="flex h-1/4 w-full items-center justify-center">
                                            <span>Target</span>
                                        </div>
                                        {retrievedData ? retrievedData.map((macro: any, index: any) => (
                                            <div key={index} className="flex flex-row h-1/4 w-full items-center justify-center gap-px">
                                                {macro.target}
                                            </div>
                                        )) : <div>Loading...</div>}
                                    </div>
                                    
                                    {/* Target Met section */}
                                    <div className="flex flex-col w-[10%] h-full justify-center items-center">
                                        <div className="flex h-1/4 w-full items-center justify-center"></div>
                                        {retrievedData ? retrievedData.map((macro: any, index: any) => (
                                            <div key={index} className="flex flex-row h-1/4 w-full items-center justify-center gap-px">
                                                {macro.targetMet ? (
                                                    <BiSolidCheckboxChecked className="h-5 w-5 text-c-dark-green" />
                                                ) : (
                                                    <BiSolidCheckboxMinus className="h-5 w-5 text-c-fail-red" />
                                                )}
                                            </div>
                                        )) : <div>Loading...</div>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col h-1/5 w-full ssm-calendar:w-4/5 p-1 pl-2 justify-center border-t border-c-shadow-black">
                                <div className="flex h-full w-full items-center">
                                    <div className="w-[70%]">
                                        <span>Total:</span>
                                    </div>
                                    <div className="flex w-1/4 justify-center">
                                        <span>{targetsAchieved}/3</span>
                                    </div>
                                    <div className="w-[10%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CalendarPopup;