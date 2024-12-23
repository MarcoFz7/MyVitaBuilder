import { Inter } from "next/font/google";
import { ImEyeBlocked } from "react-icons/im";

const inter = Inter({ weight: "400", style: "normal", subsets: ["latin"] });

/**
 * Interface for the access blocked component with needed props from the parent
 */
interface AccessBlockedBannerProps {
    content: React.ReactNode;
}

/**
 * @param content - the content that is blocked for user (original content without funcionalitity)
 * 
 * @returns access blocked banner component (content that can only be accessed after logging with a Google account)
 */
const AccessBlockedBanner = ({ content }: AccessBlockedBannerProps) => { 
  
  return (
    <>
      <div className={`${inter.className} relative rounded`}>
        <div className="relative blur-[2px] pointer-events-none">
          {content}
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 p-2 flex justify-center items-center flex-col bg-black bg-opacity-10 z-20 rounded">
          <ImEyeBlocked className="text-black text-2xl" />
          <span className="text-black text-sm font-medium">Please Login to access this Section!</span>
        </div>
      </div>
    </>
  );
};
  
export default AccessBlockedBanner;