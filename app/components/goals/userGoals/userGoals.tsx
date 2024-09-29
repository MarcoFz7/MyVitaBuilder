import MainBtn from "../../buttons/mainBtn";

import { useEffect, useState } from "react";

import { GrUpdate } from "react-icons/gr";
import { RiProhibited2Line } from "react-icons/ri";
import { TbTargetArrow } from "react-icons/tb";
import { IoLockClosed } from "react-icons/io5";
import { IoLockOpen } from "react-icons/io5";

import CustomInput from "../../customInput/customInput";
import CustomMessage from "../../customMessage/customMessage";

/**
 * Interface for the user goals component with needed props from the parent
 */
interface UserGoalsProps {
    cadence: string; 
}

const userSampleData = {
    "calories": "2100",
    "protein": "150",
    "totalCarbs": "300",
    "totalFat": "280"
}

/**
 * 
 * @param cadence - the cadence selected by the user
 *  
 * @returns user goals component
 */
const UserGoals = ({ cadence }: UserGoalsProps) => {

    // Reset the update goals process if the cadence was changed to weekly/monthly
    useEffect(() => {
        if (cadence == "Weekly" || cadence == "Monthly") {
            setIsGoalsChangeAllowed(false);

            setCaloriesInputValue(savedCaloriesInputValue);
            setProteinInputValue(savedProteinInputValue);
            setTotalCarbsInputValue(savedTotalCarbsInputValue);
            setTotalFatInputValue(savedTotalFatInputValue);
        }
    }, [cadence]);

    const [showUpdateWarningMessage, setShowUpdateWarningMessage] = useState<boolean>(false);
    const [changeUpdateWarningMessageOpacity, setChangeUpdateWarningMessageOpacity] = useState<boolean>(false);

    const [caloriesInputValue, setCaloriesInputValue] = useState<string>(userSampleData.calories);
    const [savedCaloriesInputValue, setSavedCaloriesInputValue] = useState<string>(userSampleData.calories);
    const [proteinInputValue, setProteinInputValue] = useState<string>(userSampleData.protein);
    const [savedProteinInputValue, setSavedProteinInputValue] = useState<string>(userSampleData.protein);
    const [totalCarbsInputValue, setTotalCarbsInputValue] = useState<string>(userSampleData.totalCarbs);
    const [savedTotalCarbsInputValue, setSavedTotalCarbsInputValue] = useState<string>(userSampleData.totalCarbs);
    const [totalFatInputValue, setTotalFatInputValue] = useState<string>(userSampleData.totalFat);
    const [savedTotalFatInputValue, setSavedTotalFatInputValue] = useState<string>(userSampleData.totalFat);

    const updateGoalsValuesToValidate = [
        [caloriesInputValue, savedCaloriesInputValue],
        [proteinInputValue, savedProteinInputValue],
        [totalCarbsInputValue, savedTotalCarbsInputValue],
        [totalFatInputValue, savedTotalFatInputValue]
    ];

    const [isGoalsChangeAllowed, setIsGoalsChangeAllowed] = useState<boolean>(false);

    // Function to handle update validation (Detect if changes were made at all)
    const handleUpdateValidation = () => {
        for (const inputValue of updateGoalsValuesToValidate) {
            if (inputValue[0] != inputValue[1]) {
                console.log(inputValue[0] + " vs " + inputValue[1]);
                return true;
            }
        }

        return false;
    };

    /**
     * Function to handle the goals update
     * This function call one more helper function - handleUpdateValidation
     */
    const handleUpdateGoals = () => {
        var isPostValidated = handleUpdateValidation();

        if (isPostValidated) {
            setShowUpdateWarningMessage(false);
            setChangeUpdateWarningMessageOpacity(false);

            // Update values
            setCaloriesInputValue(caloriesInputValue);
            setProteinInputValue(proteinInputValue);
            setTotalCarbsInputValue(totalCarbsInputValue);
            setTotalFatInputValue(totalFatInputValue);

            // Update saved values for validation purposes
            setSavedCaloriesInputValue(caloriesInputValue);
            setSavedProteinInputValue(proteinInputValue);
            setSavedTotalCarbsInputValue(totalCarbsInputValue);
            setSavedTotalFatInputValue(totalFatInputValue);

            // Reset lock fields icon
            handleLockGoalsClick(false);
        } else {
            setCustomMessageType(2);
            setCustomMessageText("Please change at least one value/field!");
            setShowUpdateWarningMessage(true);
            setChangeUpdateWarningMessageOpacity(true);
        }
    }


    // Variables and functions for the custom inputs
    // These next consts have the default custom message for the update warning
    const [customMessageType, setCustomMessageType] = useState<number>(2);
    const [customMessageText, setCustomMessageText] = useState<string>("Please change at least one value/field!");

    // Function that will be called on all input handlers for user information/warning messages
    const handleShowMessage = (responseValue: string, maxMinValue: number) => {
        if (responseValue == "Invalid") {
            setCustomMessageType(2);
            setCustomMessageText("Invalid character.");
            setShowUpdateWarningMessage(true);
            setChangeUpdateWarningMessageOpacity(true);
            return true;
        }

        if (responseValue == "LowValue") {
            setCustomMessageType(2);
            setCustomMessageText(`Value is too Low. Min: ${maxMinValue}.`);
            setShowUpdateWarningMessage(true);
            setChangeUpdateWarningMessageOpacity(true);
            return true;
        }

        if (responseValue == "HighValue") {
            setCustomMessageType(2);
            setCustomMessageText(`Value is too High. Max: ${maxMinValue}.`);
            setShowUpdateWarningMessage(true);
            setChangeUpdateWarningMessageOpacity(true);
            return true;
        }
    }

    /**
     * Handlers for changes on inputs 
     * Receive the response value, and the max or min value in case the value is higher or lower that the respective value
     * 
     * If the warning message is to be shown to the user, the value should not be set
     */ 
    const handleCaloriesInputResponse = (responseValue: string, maxMinValue: number) => {
        const showMessage = handleShowMessage(responseValue, maxMinValue);

        if (showMessage) {
            return;
        }
        setCaloriesInputValue(responseValue);
    };
    const handleProteinInputResponse = (responseValue: string, maxMinValue: number) => {
        const showMessage = handleShowMessage(responseValue, maxMinValue);

        if (showMessage) {
            return;
        }
        setProteinInputValue(responseValue);
    };
    const handleTotalCarbsInputResponse = (responseValue: string, maxMinValue: number) => {
        const showMessage = handleShowMessage(responseValue, maxMinValue);

        if (showMessage) {
            return;
        }
        setTotalCarbsInputValue(responseValue);
    };
    const handleTotalFatInputResponse = (responseValue: string, maxMinValue: number) => {
        const showMessage = handleShowMessage(responseValue, maxMinValue);

        if (showMessage) {
            return;
        }
        setTotalFatInputValue(responseValue);
    };

    const handleLockGoalsClick = (goThroughValidation: boolean) => {
        setIsGoalsChangeAllowed(!isGoalsChangeAllowed);

        // Reset value changed but not saved, on process cancellation
        if (goThroughValidation) {
            if (isGoalsChangeAllowed) {
                setCaloriesInputValue(savedCaloriesInputValue);
                setProteinInputValue(savedProteinInputValue);
                setTotalCarbsInputValue(savedTotalCarbsInputValue);
                setTotalFatInputValue(savedTotalFatInputValue);
            }
        }
    }

    // Function to reset custom message to its default
    const resetCustomMessage = () => {
        setShowUpdateWarningMessage(false);
        setCustomMessageType(2);
        setCustomMessageText("Please change at least one value/field!");
    };

    return (
        <>
            <div className="flex flex-col w-full h-full">
                <div className="rounded w-full h-[12%] min-h-[35px] max-h-[35px]">
                    <div className="flex flex-row w-[96%] pl-[4%] h-full justify-center">
                        {showUpdateWarningMessage ? (
                            <CustomMessage
                                type={customMessageType}
                                message={customMessageText}
                                iconSize="text-base"
                                isOpacityOne={changeUpdateWarningMessageOpacity}
                                onTransitionEnd={resetCustomMessage}
                            />
                        ) : (
                            <div className="flex w-full h-full justify-center items-center text-sm">
                                <span className="flex items-center text-c-dark-green whitespace-nowrap overflow-hidden ">
                                    <TbTargetArrow className="text-c-dark-green inline-block mr-[0.375rem] h-[18px] w-[18px]" />
                                    <strong>Nutritional Targets</strong>
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="pl-0 ml-[2%] w-[96%] h-px bg-c-dark-green"></div>
                </div>
                <div className="flex flex-col md:flex-row w-full h-full md:gap-2 p-1 md:pr-[5%]">
                    <div className="flex flex-row items-center h-auto sm:h-[27.5%] w-full md:h-full md:w-[25%]">
                        <div className="flex flex-col w-full h-full items-center pt-1 text-sm">
                            <div className="flex flex-row md:flex-col h-full w-full sm:w-1/2 min-w-[120px] min-h-[40px] max-h-[44px] sm:max-h-none">
                                <div className="flex w-full h-full rounded items-center justify-center p-2">
                                    <MainBtn
                                        label="Update"
                                        isDisabled={cadence != "Daily"}
                                        title="Update Goals!"
                                        disabledTitle=""
                                        shadow={true}
                                        isRequestProcessing={false}
                                        icon={<GrUpdate className="mr-[0.35rem] w-[13px] h-[13px]" />}
                                        onClick={handleUpdateGoals}
                                    />
                                </div>
                                <div
                                    className={`flex w-full h-full rounded justify-center items-center p-2 ${true ? " " : ""
                                        }`}
                                >
                                    <MainBtn
                                        label="Cancel"
                                        isDisabled={!isGoalsChangeAllowed}
                                        title="Cancel Update!"
                                        disabledTitle="Disabled. No changes were done."
                                        shadow={true}
                                        isRequestProcessing={false}
                                        icon={<RiProhibited2Line className="mr-[0.25rem] w-4 h-4" />}
                                        onClick={() => handleLockGoalsClick(true)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[72.5%] md:w-[75%] md:h-full">
                        <div className="flex flex-col sm:flex-row h-full w-full pt-0 md:pt-1 p-1 pr-0 text-white">
                            <div className="h-full w-full sm:w-1/2 pt-0 md:pt-1 sm:p-1 pr-0 text-white">
                                <div className="flex flex-col w-full h-full items-center md:pt-1 text-sm">
                                    <div className="flex flex-col h-full w-full">
                                        <div className="flex h-1/2 w-full items-center justify-center sm:justify-end">
                                            <div className="w-[95%] h-full sm:h-[75%]">
                                                <CustomInput
                                                    value={caloriesInputValue}
                                                    title="Energy"
                                                    placeholder="ex. 286"
                                                    isDisabled={!isGoalsChangeAllowed}
                                                    topic="Energy"
                                                    hasUnit={true}
                                                    unit="kcal"
                                                    inSequence={false}
                                                    numbersOnly={true}
                                                    maxValue={100000}
                                                    minValue={100}
                                                    onInputValueRequest={handleCaloriesInputResponse}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex h-1/2 w-full items-center justify-center sm:justify-end">
                                            <div className="w-[95%] h-full sm:h-[75%]">
                                                <CustomInput
                                                    value={proteinInputValue}
                                                    title="Protein"
                                                    placeholder="ex. 34"
                                                    isDisabled={!isGoalsChangeAllowed}
                                                    topic="Protein"
                                                    hasUnit={true}
                                                    unit="g"
                                                    inSequence={false}
                                                    numbersOnly={true}
                                                    maxValue={50000}
                                                    minValue={10}
                                                    onInputValueRequest={handleProteinInputResponse}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex h-full w-full sm:w-[20px] justify-center sm:items-center sm:pt-3">
                                {!isGoalsChangeAllowed && cadence == "Daily" ? (
                                    <IoLockClosed title='Open goals for change!' className='fill-c-dark-green w-5 h-5 cursor-pointer' onClick={() => handleLockGoalsClick(true)} />
                                ) : cadence == "Daily" ? (
                                    <IoLockOpen title='Lock goals!' className='fill-c-dark-green w-5 h-5 cursor-pointer' onClick={() => handleLockGoalsClick(true)} />
                                ) : (
                                    <IoLockClosed title='Open goals for change!' className='fill-c-custom-shadow-black w-5 h-5 cursor-pointer'/>
                                )}  
                            </div>
                            <div className="h-full w-full sm:w-1/2 pt-0 md:pt-1 sm:p-1 pl-0 text-white">
                                <div className="flex flex-col w-full h-full items-center md:pt-1 text-sm">
                                    <div className="flex flex-col h-full w-full">
                                        <div className="flex h-1/2 w-full items-center justify-center sm:justify-start">
                                            <div className="w-[95%] h-full sm:h-[75%]">
                                                <CustomInput
                                                    value={totalCarbsInputValue}
                                                    title="Carbs"
                                                    placeholder="ex. 25"
                                                    isDisabled={!isGoalsChangeAllowed}
                                                    topic="Total Carbs"
                                                    hasUnit={true}
                                                    unit="g"
                                                    inSequence={true}
                                                    numbersOnly={true}
                                                    maxValue={50000}
                                                    minValue={10}
                                                    onInputValueRequest={handleTotalCarbsInputResponse}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex h-1/2 w-full items-center justify-center sm:justify-start">
                                            <div className="w-[95%] h-full sm:h-[75%]">
                                                <CustomInput
                                                    value={totalFatInputValue}
                                                    title="Total Fat"
                                                    placeholder="ex. 4.6"
                                                    isDisabled={!isGoalsChangeAllowed}
                                                    topic="Total Fat"
                                                    hasUnit={true}
                                                    unit="g"
                                                    inSequence={true}
                                                    numbersOnly={true}
                                                    maxValue={10000}
                                                    minValue={10}
                                                    onInputValueRequest={handleTotalFatInputResponse}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserGoals;