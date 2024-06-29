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
 * @returns custom button
 */
const SecondaryBtn = ({ label, isDisabled, title, disabledTitle, icon, onClick }: SecondaryBtnProps) => { 
  
  return (
    <>
        <button type='button' disabled={isDisabled} className='bg-c-dark-green mt-[0.075rem] hover:text-c-lemon-green rounded p-1 pl-1.5 pr-1.5 ml-1.5 shadow-md' title={`${isDisabled ? disabledTitle : title}`} onClick={onClick}>
            <span className="flex items-center m-0 whitespace-nowrap overflow-hidden"><strong>{label}</strong>{icon}</span>
        </button>
    </>
  );
};
  
export default SecondaryBtn;