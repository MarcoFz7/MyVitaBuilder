import MainBtn from "../buttons/mainBtn";
import TertiaryBtn from "../buttons/tertiaryBtn";
import { IoCloseSharp, IoWarning } from "react-icons/io5";

/**
 * Interface for the popup with needed props from the parent
 */
interface popupProps {
    popupType: number;
    message: React.ReactNode;
    actionToTake: () => void;
    managePopupState: () => void;
}

/**
 * @param popupType (Information - 1, Warning - 2, Error - 3)
 * @param message
 * @param managePopupState - for closure
 * 
 * @returns custom popup
 */
const Popup = ({popupType, message, actionToTake, managePopupState }: popupProps) => {

    return (
        <>
            <div className='fixed h-full w-full top-0 left-0 bg-c-shadow-black z-[100] backdrop-blur-[0.95px] flex items-center justify-center'>
                <div className="w-1/5 h-1/4 min-w-[280px] ssm-calendar:min-w-[380px] min-h-[175px] flex items-center justify-center bg-c-global-bg-color rounded shadow-lg p-2">
                    <div className="flex flex-col h-full w-full gap-2">
                        <div className="flex flex-row h-1/4 w-full items-center justify-center bg-c-custom-shadow-black rounded gap-1">
                            <div className="flex w-[87.5%] h-full items-center text-sm pl-4">
                                { popupType == 2 &&
                                    <span className="font-semibold text-c-dark-green"><IoWarning className={`inline-block mr-[0.150rem] sm:mr-[0.375rem] h-5 w-5`}/><strong className="overflow-hidden text-ellipsis">Warning!</strong></span>           
                                }
                            </div>
                            <div className="flex w-[12.5%] h-auto justify-end pr-2">
                                <TertiaryBtn operationStatus='' btnIcon={<IoCloseSharp className='w-5 h-5'/>} isDisabled={false} inSequence={false} title='Close Popup!' onClick={managePopupState}/>
                            </div>
                        </div>
                        <div className="flex flex-col h-2/4 w-full justify-center items-center px-3">
                            {message}
                        </div>
                        <div className="flex h-1/4 w-full justify-end items-center">
                            <div className="flex flec-row w-auto h-full gap-2">
                                <button type='button' className='h-full font-light mt-[0.075rem] text-c-dark-green border border-c-dark-green rounded p-1 pl-1.5 pr-1.5 ml-1.5 min-h-[30px] max-h-[45px] transition-all duration-250 ease' title='cancel' onClick={managePopupState}>
                                    <span className="flex items-center m-0 whitespace-nowrap overflow-hidden"><strong className="mr-[0.15rem] ml-[0.10rem]">Cancel&nbsp;</strong></span>
                                </button>                      
                                <MainBtn label="Confirm" isDisabled={false} title="Deactivate Account!" disabledTitle="" shadow={true} isRequestProcessing={false} icon={<span className="ml-1"/>} onClick={() => {actionToTake(); managePopupState();}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Popup;