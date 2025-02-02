import { Inter } from "next/font/google";
import { ImEyeBlocked } from "react-icons/im";
import AccessCheckingBanner from "./accessChecker/accessCheckingBanner";

const inter = Inter({ weight: "400", style: "normal", subsets: ["latin"] });

/**
 * Interface for the access blocked component with needed props from the parent
 */
interface AccessBlockedBannerProps {
  content: React.ReactNode;
  isAuthorized: boolean | null;
  isFullPage: boolean;
}

/**
 * @param content - the content that is blocked for user (original content without funcionalitity)
 * @param isAuthorized - to check if user is really noy authorized or if auth is still processing
 * 
 * @returns access blocked banner component (content that can only be accessed after logging with a Google account)
 */
const AccessBlockedBanner = ({ content, isAuthorized, isFullPage }: AccessBlockedBannerProps) => { 
  
  return (
    <>
      { isFullPage ? (
        <div className="absolute top-0 left-0 w-full h-full pt-[2.85rem] pb-[0.35rem] z-20">
          { isAuthorized === null ? (
            <AccessCheckingBanner isFullPage={true}/>
          ) : (
            <div className="w-full h-full bg-black flex justify-center items-center flex-col backdrop-blur-[3px] bg-black bg-opacity-20 rounded">
              <ImEyeBlocked className="text-black text-[20px]" />
              <span className="text-black text-sm font-medium">Please Login to access this Page!</span>
            </div>
          )}
        </div>
      ) : (
        <div className={`${inter.className} relative rounded`}>
          <div className="relative blur-[3px] pointer-events-none">
            {content}
          </div>
          { isAuthorized === null ? (
            <AccessCheckingBanner isFullPage={false}/>
          ) : (
            <div className="absolute top-0 left-0 right-0 bottom-0 p-2 flex justify-center items-center flex-col bg-black bg-opacity-20 z-20 rounded">
              <ImEyeBlocked className="text-black text-[20px]" />
              <span className="text-black text-sm font-medium">Please Login to access this Section!</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};
  
export default AccessBlockedBanner;