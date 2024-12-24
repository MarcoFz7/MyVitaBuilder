"use client";

import { Inter } from "next/font/google";
import { isUserAuthorized } from "../auth/isUserAuthorized";
import AccessBlockedBanner from "../components/auth/accessBlockedBanner";
import { useEffect, useState } from "react";
import Popup from "../components/popup/popup";
import { GoTriangleRight } from "react-icons/go";

const inter = Inter({ weight: "400", style: "normal", subsets: ["latin"] });

const Page = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const [popupMessage, setPopupMessage] = useState<React.ReactNode>();
  const [popupAction, setPopupAction] = useState<() => void>(() => () => {});

  useEffect(() => {
    setIsAuthorized(isUserAuthorized);
  }, []);

  const handleAction = (action: string) => {
    switch (action) {
      case "deactivate":
        setPopupMessage(
          <span>
            <strong>Deactivating your account</strong> will make your information and posts invisible to other users! Do you want to proceed?
          </span>
        );
        setPopupAction(() => deactivateAccount);
        
        setIsPopupOpen(true);
        break;
      case "delete":
        setPopupMessage(
          <span>
            <strong>Deleting your account</strong> will erase your information and posts from the system! Do you want to proceed?
          </span>
        );
        setPopupAction(() => deletedAccount);
        
        setIsPopupOpen(true);
      default:
        return;
    }
  }

  const deactivateAccount = () => {
    if (!isAuthorized)
      return;
    
    console.log("Account deactivated");
  }

  const deletedAccount = () => {
    if (!isAuthorized)
      return;

    console.log("Account deleted");
  }

  const UserSettingsContent = () => (
    <div className='h-auto p-2 pt-0 bg-white w-full border border border-grey-100 shadow-sm rounded'>  
      <div className="w-full h-full rounded">
        <div className='flex flex-col rounded w-full h-full text-sm'>
          <div className="flex w-full items-center justify-center text-center mt-1">
            <span className="bg-c-custom-shadow-black text-c-dark-green rounded p-1 mx-4 font-bold w-full">User Settings</span>
          </div>
          <div className="flex w-full items-center px-4 sm:px-[4%] pt-3 pb-1">
            <div className="flex flex-col gap-px">
              <div className="text-black/40">
                <span className="flex items-center whitespace-nowrap overflow-hidden">
                    <GoTriangleRight className="inline-block mr-[0.25rem] h-4 w-4" />
                    Change Email
                </span>
              </div>
              <div className="text-black/40">
                <span className="flex items-center whitespace-nowrap overflow-hidden">
                    <GoTriangleRight className="inline-block mr-[0.25rem] h-4 w-4" />
                    Change Password
                </span>
              </div>
              <div className="hover:text-c-dark-green cursor-pointer" onClick={() => {handleAction("deactivate")}}>
                <span className="flex items-center whitespace-nowrap overflow-hidden">
                    <GoTriangleRight className="inline-block mr-[0.25rem] h-4 w-4" />
                    Deactivate Account
                </span>
              </div>
              <div className="hover:text-c-dark-green cursor-pointer" onClick={() => {handleAction("delete")}}>
                <span className="flex items-center whitespace-nowrap overflow-hidden">
                    <GoTriangleRight className="inline-block mr-[0.25rem] h-4 w-4" />
                    Delete Account
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${inter.className} bg-c-global-bg-color min-h-[635px] h-screen max-h-screen w-[99%] min-w-min-width absolute left-[0.5%] top-0 pt-[2.85rem] pb-[0.35rem] z-[-1] text-sm`}>
      <div className="flex flex-col w-full h-full gap-[0.5rem]">
        { isAuthorized ? (
          <UserSettingsContent/>
        ) : (
          <AccessBlockedBanner content={<UserSettingsContent/>} isAuthorized={isAuthorized}/>
        )}
        <div className='h-auto p-2 pt-0 bg-white w-full border border border-grey-100 shadow-sm rounded'>
          <div className="w-full h-full rounded">
            <div className='flex flex-col rounded w-full h-full items-center text-sm'>
              <div className="flex mt-1 w-full items-center justify-center text-center">
                <span className="bg-c-custom-shadow-black text-c-dark-green rounded p-1 mx-4 font-bold w-full">User Preferences</span>
              </div>
              <div className="flex flex-col w-full px-4 sm:px-[4%] pt-3 pb-1 gap-px">
                <span className="flex items-center whitespace-nowrap overflow-hidden">
                    <GoTriangleRight className="inline-block mr-[0.25rem] h-4 w-4" />
                    <span className="mr-2">Language</span>
                    <span className="cursor-pointer hover:text-c-dark-green">PT</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span className="cursor-pointer hover:text-c-dark-green">EN</span>
                </span>
                <span className="flex items-center whitespace-nowrap overflow-hidden">
                    <GoTriangleRight className="inline-block mr-[0.25rem] h-4 w-4" />
                    <span>Theme</span>
                </span>
              </div>
            </div>
          </div>    
        </div>
        <div className='h-auto p-2 pt-0 bg-white w-full border border border-grey-100 shadow-sm rounded'>
          <div className="w-full h-full rounded">
            <div className='flex flex-col rounded w-full h-full items-center text-sm'>
              <div className="flex mt-1 w-full items-center justify-center text-center">
                <span className="bg-c-custom-shadow-black text-c-dark-green rounded p-1 mx-4 font-bold w-full">Terms and Conditions</span>
              </div>
              <div className="flex w-full items-center px-4 sm:px-[4%] pt-3 pb-1 hover:text-c-dark-green cursor-pointer">
                <span className="flex items-center whitespace-nowrap overflow-hidden">
                    <GoTriangleRight className="inline-block mr-[0.25rem] h-4 w-4" />
                    Review Terms and Conditions
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='h-auto p-2 pt-0 bg-white w-full border border border-grey-100 shadow-sm rounded'>
          <div className="w-full h-full rounded">
            <div className='flex flex-col rounded w-full h-full items-center text-sm'>
              <div className="flex mt-1 w-full items-center justify-center text-center">
                <span className="bg-c-custom-shadow-black text-c-dark-green rounded p-1 mx-4 font-bold w-full">Contacts</span>
              </div>
              <div className="flex w-full items-center px-4 sm:px-[4%] pt-3 pb-1">
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && <Popup popupType={2} message={popupMessage} actionToTake={popupAction} managePopupState={() => setIsPopupOpen(false)}/>}
    </div>
  );
};
  
export default Page;