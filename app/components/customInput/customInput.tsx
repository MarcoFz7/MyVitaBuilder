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
 * @param inSequence - option to change input when its used in sequence with another one
 * 
 * @returns custom input
 */
const CustomInput = ({ value, title, placeholder, isDisabled, topic, hasUnit, unit, inSequence }: CustomInputProps) => { 
  
  return (
    <>
        <div className={`h-full min-h-[32px] p-1.5 sm:p-2 ${inSequence && '!pb-0'}`}>
            <div className='flex flex-row justify-between gap-1 w-full h-full rounded p-1 pt-0.5 pb-0.5 pr-0.5 bg-c-light-smoke shadow-inner'>
                <input title={title} placeholder={placeholder} disabled={isDisabled} value={value} className='flex flex-grow text-black h-full pl-0.5 w-1/3 items-center rounded pt-0.5'/>
                <div className='flex w-auto h-full bg-c-dark-green rounded p-0.5 pl-1 pr-1 gap-1'>
                    <span className='flex items-center h-full font-bold text-xs whitespace-nowrap overflow-hidden text-ellipsis'>{topic}</span>
                    {hasUnit && (
                        <span className='flex items-center h-full bg-c-light-smoke rounded text-c-dark-green pl-1 pr-1 font-bold text-xs'>{unit}</span>
                    )}
                </div>
            </div>
        </div>
    </>
  );
};
  
export default CustomInput;