import { useEffect, useState } from "react";
import { IoWarning } from "react-icons/io5";

/**
 * Interface for the custom message with needed props from the parent
 */
interface customMessageProps {
    type: number;
    message: string;
    iconSize: string;
    isOpacityOne: boolean;
    onTransitionEnd: () => void;
}

/**
 * 
 * @param type - type of the custom message: 1-Info, 2-Warning, 3-Error
 * @param message - content to use in the custom message
 * @param iconSize - size of the icon
 * @param isOpacityOne - controls component visibility (mainly to apply smoth transitions)
 * @param onTransitionEnd - callback function to invoke when the transition ends and hide message
 * 
 * @returns custom 
 */
const CustomMessage = ({ type, message, iconSize, isOpacityOne, onTransitionEnd }: customMessageProps) => { 
   
  const [opacity, setOpacity] = useState<number>(0);

  // Use effect for custom Message smooth transition effect
  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;
  
    if (isOpacityOne) {
      setOpacity(1);

      hideTimeout = setTimeout(() => {
        setOpacity(0);
      }, 2500);
  
      setTimeout(() => {
        onTransitionEnd();
      }, 2750);
    }
  
    return () => {
      clearTimeout(hideTimeout);
    };
  }, [isOpacityOne]);

  return (
    <>
        { type == 1 &&
            <div className={`flex w-[100%] sm:w-[92%] h-[70%] justify-center self-center items-center text-[12px] text-green-900 bg-green-100 rounded opacity-${opacity} transition-all duration-250 ease`} role="alert">
                <span className="flex items-center whitespace-nowrap overflow-hidden pr-1"><IoWarning className={`inline-block mr-[0.150rem] sm:mr-[0.375rem] ${iconSize}`}/><strong className="overflow-hidden text-ellipsis">Information! {message}</strong></span>
            </div>
        }
        { type == 2 &&
            <div className={`flex w-[100%] sm:w-[92%] h-[70%] justify-center self-center items-center text-[12px] text-yellow-900 bg-yellow-100 rounded opacity-${opacity} transition-all duration-250 ease`} role="alert">
                <span className="flex items-center whitespace-nowrap overflow-hidden pr-1"><IoWarning className={`inline-block mr-[0.150rem] sm:mr-[0.375rem] ${iconSize}`}/><strong className="overflow-hidden text-ellipsis">Warning! {message}</strong></span>
            </div>
        }
        { type == 3 &&
            <div className={`flex w-[100%] sm:w-[92%] h-[70%] justify-center self-center items-center text-[12px] text-red-900 bg-red-100 rounded opacity-${opacity} transition-all duration-250 ease`} role="alert">
                <span className="flex items-center whitespace-nowrap overflow-hidden pr-1"><IoWarning className={`inline-block mr-[0.150rem] sm:mr-[0.375rem] ${iconSize}`}/><strong className="overflow-hidden text-ellipsis">Error! {message}</strong></span>
            </div>
        }
    </>
  );
};
  
export default CustomMessage;         