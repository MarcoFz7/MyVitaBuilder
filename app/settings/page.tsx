import { PiChatCircleDotsBold } from "react-icons/pi";

import { Inter } from "next/font/google";

const inter = Inter({ weight: "400", style: "normal", subsets: ["latin"] });


const Page = () => {
  
  return (
    <div className={`${inter.className} bg-c-global-bg-color min-h-[635px] h-screen max-h-screen w-[99%] min-w-min-width absolute left-[0.5%] top-0 pt-[2.85rem] pb-[0.35rem] z-[-1] text-sm`}>
      <div className="flex flex-col w-full h-full gap-[0.5rem]">
        <div className='h-auto p-2 pt-0 bg-white w-full border border border-grey-100 shadow-sm rounded'>
          <div className="w-full h-full rounded">
            <div className='flex flex-col rounded w-full h-full items-center text-sm'>
              <div className="rounded w-full h-[10%] min-h-[35px] max-h-[35px]">
                <div className="flex flex-row w-[96%] pl-[4%] h-full justify-center">
                    <div className="flex w-full h-full justify-center items-center text-sm hover:cursor-pointer text-c-sidebar-dark-green hover:text-c-dark-green">
                        <span className="absolute flex items-center text-c-dark-green whitespace-nowrap overflow-hidden ">
                            <PiChatCircleDotsBold className="text-c-dark-green inline-block mr-[0.375rem] h-[16px] w-[16px]" />
                            <strong id="userSettings">User Settings</strong>
                        </span>   
                    </div>
                </div>
                <div className="grid pl-0 ml-[2%] w-[96%] h-px bg-c-dark-green justify-center"></div>
              </div>
              <div className="w-full">
                <div className="flex flex-col">
                  <span>Change Email</span>
                  <span>Change Password</span>
                  <span>Deactivate Account</span>
                  <span>Delete Account</span>
                </div>
              </div>
            </div>
          </div>    
        </div>
        <div className='h-auto p-2 pt-0 bg-white w-full border border border-grey-100 shadow-sm rounded'>
          <div className="w-full h-full rounded">
            <div className='flex flex-col rounded w-full h-full items-center text-sm'>
              <div className="rounded w-full h-[10%] min-h-[35px] max-h-[35px]">
                <div className="flex flex-row w-[96%] pl-[4%] h-full justify-center">
                    <div className="flex w-full h-full justify-center items-center text-sm hover:cursor-pointer text-c-sidebar-dark-green hover:text-c-dark-green">
                        <span className="absolute flex items-center text-c-dark-green whitespace-nowrap overflow-hidden ">
                            <PiChatCircleDotsBold className="text-c-dark-green inline-block mr-[0.375rem] h-[16px] w-[16px]" />
                            <strong id="userSettings">User Preferences</strong>
                        </span>   
                    </div>
                </div>
                <div className="grid pl-0 ml-[2%] w-[96%] h-px bg-c-dark-green justify-center"></div>
              </div>
              <div className="flex flex-col w-full">
                <div className="flex flex-row">
                  <span>Language</span>
                  <span>PT</span>
                  <span> | </span>
                  <span>EN</span>
                </div>
                <div className="flex flex-row">
                  <span>Theme</span>
                </div>
            </div>
            </div>
          </div>    
        </div>
        <div className='h-auto p-2 pt-0 bg-white w-full border border border-grey-100 shadow-sm rounded'>
          <div className="w-full h-full rounded">
            <div className='flex flex-col rounded w-full h-full items-center text-sm'>
              <div className="rounded w-full h-[10%] min-h-[35px] max-h-[35px]">
                <div className="flex flex-row w-[96%] pl-[4%] h-full justify-center">
                    <div className="flex w-full h-full justify-center items-center text-sm hover:cursor-pointer text-c-sidebar-dark-green hover:text-c-dark-green">
                        <span className="absolute flex items-center text-c-dark-green whitespace-nowrap overflow-hidden ">
                            <PiChatCircleDotsBold className="text-c-dark-green inline-block mr-[0.375rem] h-[16px] w-[16px]" />
                            <strong id="terms">Terms and Conditions</strong>
                        </span>   
                    </div>
                </div>
                <div className="grid pl-0 ml-[2%] w-[96%] h-px bg-c-dark-green justify-center"></div>
              </div>
              <div className="">

              </div>
            </div>
          </div>
        </div>
        <div className='h-auto p-2 pt-0 bg-white w-full border border border-grey-100 shadow-sm rounded'>
          <div className="w-full h-full rounded">
            <div className='flex flex-col rounded w-full h-full items-center text-sm'>
              <div className="rounded w-full h-[10%] min-h-[35px] max-h-[35px]">
                <div className="flex flex-row w-[96%] pl-[4%] h-full justify-center">
                    <div className="flex w-full h-full justify-center items-center text-sm hover:cursor-pointer text-c-sidebar-dark-green hover:text-c-dark-green">
                        <span className="absolute flex items-center text-c-dark-green whitespace-nowrap overflow-hidden ">
                            <PiChatCircleDotsBold className="text-c-dark-green inline-block mr-[0.375rem] h-[16px] w-[16px]" />
                            <strong id="contacts">Contacts</strong>
                        </span>   
                    </div>
                </div>
                <div className="grid pl-0 ml-[2%] w-[96%] h-px bg-c-dark-green justify-center"></div>
              </div>
              <div className="">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default Page;