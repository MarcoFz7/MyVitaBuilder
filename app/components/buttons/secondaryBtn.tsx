/**
 * As of now, the main differences to the mainBtn are visual!
 * 
 * Interface for the secondary button component with needed props from the parent
 */
interface SecondaryBtnProps {
    label: string;
    isDisabled: boolean;
    title: string;
    disabledTitle: string;
    icon: React.ReactNode;
    onClick: () => void;
}

/**
 * 
 * @param label - the button label
 * @param isDisabled - option that specifies if the button is disabled or not
 * @param title - the button title when it is enabled
 * @param disabledTitle - the button title when it is disabled
 * @param icon - the icon element to use, and respective css properties (using tailwind)
 * @param onClick - function to notify parent of button click and do something
 * 
 * @returns custom secondary button
 */
const SecondaryBtn = ({ label, isDisabled, title, disabledTitle, icon, onClick }: SecondaryBtnProps) => { 
  
  return (
    <>  
        <button type='button' disabled={isDisabled} className={`${!isDisabled && 'bg-gradient-to-r from-c-dark-green to-c-sidebar-dark-green border border-c-dark-green'} font-light mt-[0.075rem] hover:text-c-lemon-green disabled:bg-white disabled:text-black/40 rounded p-1 pl-1.5 pr-1.5 ml-1.5 min-h-[30px] shadow transition-all duration-250 ease`} title={`${isDisabled ? disabledTitle : title}`} onClick={onClick}>
            <span className="flex items-center m-0 whitespace-nowrap overflow-hidden"><strong className="mr-[0.15rem] ml-[0.10rem]">{label}</strong>{icon}</span>
        </button>
    </>
  );
};
  
export default SecondaryBtn;