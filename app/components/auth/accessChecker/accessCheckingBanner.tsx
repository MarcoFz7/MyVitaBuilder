import "./accessCheckingAnimation.css";

/**
 * Interface for the access checker component with needed props from the parent
 */
interface AccessBlockedBannerProps {
    content: React.ReactNode;
}

/**
 * @param content - the content that is being checked for user (original content without funcionalitity)
 * 
 * @returns access checker banner component
 */
const AccessCheckerBanner = ({ content }: AccessBlockedBannerProps) => { 
  
  return (
    <>
      <div className='relative rounded'>
        <div className="relative blur-[2px] pointer-events-none">
          {content}
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 p-2 flex justify-center items-center flex-col bg-black bg-opacity-10 z-20 rounded">
            {/* Link to loading animation source: https://uiball.com/ldrs/ */}
            <svg className="container" x="0px" y="0px"viewBox="0 0 50 31.25" height="31.25" preserveAspectRatio='xMidYMid meet'>
                <path className="track" strokeWidth="4" pathLength="100" d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"/>
                <path className="car" strokeWidth="4" fill="none" pathLength="100" d="M0.625 21.5 h10.25 l3.75 -5.875 l7.375 15 l9.75 -30 l7.375 20.875 v0 h10.25"/>
            </svg>
        </div>
      </div>
    </>
  );
};
  
export default AccessCheckerBanner;