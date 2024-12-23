"use client";

import { Inter } from "next/font/google";
import { isUserAuthorized } from "../auth/isAuth";
import AccessBlockedBanner from "../components/auth/accessBlockedBanner";
import { useEffect, useState } from "react";
import AccessCheckerBanner from "../components/auth/accessChecker/accessCheckingBanner";

const inter = Inter({ weight: "400", style: "normal", subsets: ["latin"] });

const Page = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    setIsAuthorized(isUserAuthorized);
  }, []);

  const UserSettingsContent = () => (
    <div className='h-auto p-2 pt-0 bg-white w-full border border border-grey-100 shadow-sm rounded'>  
      <div className="w-full h-full rounded">
        <div className='flex flex-col rounded w-full h-full text-sm'>
          <div className="flex w-full items-center justify-center text-center mt-1">
            <span className="bg-c-custom-shadow-black text-c-dark-green rounded p-1 mx-4 font-bold w-full">User Settings</span>
          </div>
          <div className="flex w-full items-center px-4 sm:px-[4%] pt-3 pb-1">
            <div className="flex flex-col gap-px">
              <span>Change Email</span>
              <span>Change Password</span>
              <span>Deactivate Account</span>
              <span>Delete Account</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TermsAndConditionsContent = () => (
    <div className='h-auto p-2 pt-0 bg-white w-full border border border-grey-100 shadow-sm rounded'>
      <div className="w-full h-full rounded">
        <div className='flex flex-col rounded w-full h-full items-center text-sm'>
          <div className="flex mt-1 w-full items-center justify-center text-center">
            <span className="bg-c-custom-shadow-black text-c-dark-green rounded p-1 mx-4 font-bold w-full">Terms and Conditions</span>
          </div>
          <div className="flex w-full items-center px-4 sm:px-[4%] pt-3 pb-1">
            <div className="flex flex-col gap-px">
              <span>Review Terms and Conditions</span>           
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactsContent = () => (
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
  );

  return (
    <div className={`${inter.className} bg-c-global-bg-color min-h-[635px] h-screen max-h-screen w-[99%] min-w-min-width absolute left-[0.5%] top-0 pt-[2.85rem] pb-[0.35rem] z-[-1] text-sm`}>
      <div className="flex flex-col w-full h-full gap-[0.5rem]">
        {isAuthorized === null ? (
          <AccessCheckerBanner content={<UserSettingsContent/>}/>
        ) : isAuthorized ? (
          <UserSettingsContent/>
        ) : (
          <AccessBlockedBanner content={<UserSettingsContent/>}/>
        )}
        <div className='h-auto p-2 pt-0 bg-white w-full border border border-grey-100 shadow-sm rounded'>
          <div className="w-full h-full rounded">
            <div className='flex flex-col rounded w-full h-full items-center text-sm'>
              <div className="flex mt-1 w-full items-center justify-center text-center">
                <span className="bg-c-custom-shadow-black text-c-dark-green rounded p-1 mx-4 font-bold w-full">User Preferences</span>
              </div>
              <div className="flex flex-col w-full px-4 sm:px-[4%] pt-3 pb-1 gap-px">
                <div className="flex flex-row">
                  <span className="mr-2">Language</span>
                  <span>PT</span>
                  <span>&nbsp;|&nbsp;</span>
                  <span>EN</span>
                </div>
                <div className="flex flex-row">
                  <span>Theme</span>
                </div>
              </div>
            </div>
          </div>    
        </div>
        {isAuthorized === null ? (
          <AccessCheckerBanner content={<TermsAndConditionsContent/>}/>
        ) : isAuthorized ? (
          <TermsAndConditionsContent/>
        ) : (
          <AccessBlockedBanner content={<TermsAndConditionsContent/>}/>
        )}
        {isAuthorized === null ? (
          <AccessCheckerBanner content={<ContactsContent/>}/>
        ) : isAuthorized ? (
          <ContactsContent />
        ) : (
          <AccessBlockedBanner content={<ContactsContent />} />
        )}
      </div>
    </div>
  );
};
  
export default Page;