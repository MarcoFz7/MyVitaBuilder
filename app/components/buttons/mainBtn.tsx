import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

/**
 * Interface for the main button component with needed props from the parent
 */
interface MainBtnProps {
    label: string;
    isDisabled: boolean;
    title: string;
    disabledTitle: string;
    icon: React.ReactNode;
    shadow: boolean;
    isRequestProcessing: boolean;
    onClick: () => void;
}

/**
 * 
 * @param label - the button label
 * @param isDisabled - option that specifies if the button is disabled or not
 * @param title - the button title when it is enabled
 * @param disabledTitle - the button title when it is disabled
 * @param icon - the icon element to use, and respective css properties (using tailwind)
 * @param shadow - the button shadow option
 * @param onClick - function to notify parent of button click and do something
 * 
 * @returns custom main button
 */
const MainBtn = ({ label, isDisabled, title, disabledTitle, icon, shadow, isRequestProcessing, onClick }: MainBtnProps) => { 
  
  return (
    <>
        <button type='button' disabled={isDisabled} className={`flex justify-center items-center max-h-[45px] ${!isDisabled && 'bg-gradient-to-r from-c-dark-green from-[45%] to-c-sidebar-dark-green border border-c-dark-green hover:bg-gradient-to-r hover:from-c-sidebar-dark-green hover:to-c-lemon-green'} text-c-lemon-green hover:text-black disabled:bg-inherit disabled:text-black/40 rounded p-1 pl-1.5 pr-1.5 w-fit transition-all duration-250 ease h-full w-full ${shadow && 'shadow'}  ${isRequestProcessing && '!cursor-default !bg-c-lemon-green !text-black'}`} title={`${isDisabled ? disabledTitle : title}`} onClick={() => { !isRequestProcessing && onClick() }}>
            <span className="flex items-center m-0 mr-[0.25rem] whitespace-nowrap overflow-hidden">
              {!isRequestProcessing ? 
                (icon) 
                : 
                (<FontAwesomeIcon icon={faCircleNotch} className="mt-0.5 mr-[0.375rem] animate-spin w-3 h-3"/>)
              }
              <strong>{label}</strong></span>
        </button>
    </>
  );
};
  
export default MainBtn;