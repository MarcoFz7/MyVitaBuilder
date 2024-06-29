/**
 * Interface for the main button component with needed props from the parent
 */
interface MainBtnProps {
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
const MainBtn = ({ label, isDisabled, title, disabledTitle, icon, onClick }: MainBtnProps) => { 
  
  return (
    <>
        <button type='button' disabled={isDisabled} className='flex justify-center items-center max-h-[45px] bg-c-dark-green text-c-lemon-green hover:bg-c-lemon-green hover:text-black disabled:bg-inherit disabled:text-black/40 rounded p-1 pl-1.5 pr-1.5 w-fit transition-all duration-250 ease h-full w-full' title={`${isDisabled ? disabledTitle : title}`} onClick={onClick}>
            <span className="flex items-center m-0 mr-[0.25rem] whitespace-nowrap overflow-hidden">{icon}<strong>{label}</strong></span>
        </button>
    </>
  );
};
  
export default MainBtn;