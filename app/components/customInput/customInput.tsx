import { useState } from "react";

/**
 * Interface for the custom component with needed props from the parent
 */
interface CustomInputProps {
    value: string;
    title: string;
    placeholder: string;
    isDisabled: boolean;
    topic: string;
    hasUnit: boolean;
    unit: string;
    inSequence: boolean;
    isSmallerInput: boolean;
    numbersOnly: boolean;
    maxValue: number;
    minValue: number;

    // Callback function to handle comunication between parent and child. 
    // In this case this component triggers it and sends the value to the parent, the parent does nothing besides receiving the value
    onInputValueRequest: (input: string, maxMinValue: number) => void;
}

/**
 * 
 * @param value - the value of the input (when input value is disabled)
 * @param title - tile of the input
 * @param placeholder - placeholder of the input
 * @param isDisabled - option to allow the input to be editable, or not
 * @param topic - topic of the field 
 * @param hasUnit - option to allow to specify the unit of the topic, in case it has a unit, ex. Calories - kcal
 * @param unit - unit of the input
 * @param inSequence - option to change input when its used in sequence with another 
 * @param isSmallerInput - option to make input have a smaller size
 * @param numbersOnly - option to make input accept only numbers
 * @param maxValue - max value for numbers only input
 * @param minValue - min value for numbers only input
 * @param onInputValueRequest - function to retrive value on change
 * 
 * @returns custom input
 */
const CustomInput = ({ value, title, placeholder, isDisabled, topic, hasUnit, unit, inSequence, isSmallerInput, numbersOnly, maxValue, minValue, onInputValueRequest }: CustomInputProps) => {
    const [inputValue, setInputValue] = useState(value);

    /**
     * Function to handle input change
     * 
     * @param e 
     */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (numbersOnly) {
            if (parseInt(newValue) < minValue) {
                updateValue("LowValue", minValue);
                return;
            }

            if (parseInt(newValue) > maxValue) {
                updateValue("HighValue", maxValue);
                return;
            }
        }

        setInputValue(newValue);
        updateValue(newValue, 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (numbersOnly) {
            const key = e.key;
        
            // Allow navigation keys, backspace, delete, etc.
            if (['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'].includes(key)) {
            return;
            }
        
            // Prevent non-numeric characters
            if (!/^\d$/.test(key)) {
            e.preventDefault();
            updateValue("Invalid", 0);
            }
        }
    };

    const updateValue = (newValue: string, maxMinValue: number) => {
        onInputValueRequest(newValue, maxMinValue);
    }

    return (
        <>
            <div className={`h-full min-h-[32px] p-1.5 sm:p-2 ${inSequence && '!pb-0'}`}>
                <div className={`flex flex-row justify-between gap-1 w-full h-full rounded p-1 pt-0.5 pb-0.5 pr-0.5 border border-grey-100 ${isDisabled ? 'shadow-customShadow' : 'shadow-inner'} sm:h-[32px]`}>
                    <input title={title} placeholder={placeholder} disabled={isDisabled} value={value} onKeyDown={handleKeyDown} onChange={handleInputChange} className='flex flex-grow text-black h-full pl-0.5 w-1/3 items-center rounded pt-0.5 bg-transparent focus:outline-none'/>
                    <div className={`flex h-full bg-c-dark-green rounded justify-between p-0.5 pl-1 pr-1 gap-1 w-[95px] ${isSmallerInput && 'max-w-[67.5px] sm:!max-w-full'}`}>
                        <div className="flex w-full justify-center">
                            <span className='flex items-center h-full font-bold text-xs whitespace-nowrap overflow-hidden text-ellipsis'>{topic}</span>
                        </div>
                        {hasUnit && (
                            <span className='flex items-center h-full bg-c-lemon-green rounded text-c-dark-green pl-1 pr-1 font-bold text-xs'>{unit}</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomInput;