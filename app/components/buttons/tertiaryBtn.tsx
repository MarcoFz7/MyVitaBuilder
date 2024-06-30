import { FaXmark } from "react-icons/fa6";
import { IoCheckmark } from "react-icons/io5";

/**
 * Interface for the Tertiary button component with needed props from the parent
 * Simpler custom button
 */
interface TertiaryBtnProps {
    operationStatus: string;
    btnIcon: React.ReactNode;
    isDisabled: boolean;
    inSequence: boolean;
    title: string;
    onClick: () => void;
}

/**
 * 
 * @param operationStatus - operation status to inform the user
 * @param btnIcon - the main btn icon
 * @param isDisabled - informs if the btn is disabled
 * @param inSequence - informs if the btn is followed by the same element
 * @param title - button title
 * @param onClick - function to notify parent of button click and do something
 * 
 * @returns custom tertiary button
 */
const TertiaryBtn = ({ operationStatus, btnIcon, isDisabled, inSequence, title, onClick }: TertiaryBtnProps) => { 
  
  return (
    <>  
       <button type='button' disabled={isDisabled} className={`text-c-dark-green hover:text-c-lemon-green hover:bg-c-dark-green focus:text-c-lemon-green focus:bg-c-dark-green rounded p-1 w-min ${inSequence && 'mr-1'} transition-all duration-250 ease`} title={title} onClick={onClick}>                                               
            { operationStatus == '' ? (
                btnIcon
            ) : operationStatus == 'true' ? (
                <IoCheckmark className='w-4 h-4'/>
            ) : operationStatus == 'false' ? (
                <FaXmark className="w-4 h-4 text-red-400" />
            ) : null} 
        </button>
    </>
  );
};
  
export default TertiaryBtn;