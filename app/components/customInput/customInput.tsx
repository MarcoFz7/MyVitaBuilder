/**
 * Interface for the custom component with needed props from the parent
 */
interface CustomInputProps {
    title: string;
    placeholder: string;
    isDisabled: boolean;
    topic: string;
    hasUnit: boolean;
    unit: string;
}

/**
 * 
 * @param title - tile of the input
 * @param placeholder - placeholder of the input
 * @param isDisabled - option to allow the input to be editable, or not
 * @param topic - topic of the field 
 * @param hasUnit - option to allow to specify the unit of the topic, in case it has a unit, ex. Calories - kcal
 * @param unit - unit of the input
 * 
 * @returns custom input
 */
const CustomInput = ({ title, placeholder, isDisabled, topic, hasUnit, unit }: CustomInputProps) => {
  
  return (
    <>
        <div className='h-full p-1.5 sm:p-2 min-h-[32px]'>
            <div className='flex flex-row gap-1 w-full h-full bg-white rounded p-1 pt-0.5 pb-0.5 pr-0.5'>
            <input title={title} placeholder={placeholder} disabled={isDisabled} className='flex text-black h-full w-1/3 items-center rounded'/>
            <div className='target flex w-auto h-full bg-c-dark-green rounded p-0.5 pl-1 pr-1 gap-1.5 ml-auto'>
                <span className='flex items-center h-full font-bold text-xs'>{topic}</span>
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