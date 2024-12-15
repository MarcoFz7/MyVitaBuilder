import { Inter } from "next/font/google";

const inter = Inter({ weight: "400", style: "normal", subsets: ["latin"] });


const Page = () => {
  
  return (
    <div className={`${inter.className} bg-c-global-bg-color min-h-[635px] h-screen max-h-screen w-[99%] min-w-min-width absolute left-[0.5%] top-0 pt-[2.85rem] pb-[0.35rem] z-[-1]`}>
      <div className="flex flex-col w-full h-full gap-[0.5rem]">
        <div className="w-full h-auto bg-white rounded border border-grey-100 shadow-sm p-2">
          <div className="">
            <span>User Related</span>
            <div>
              <span>Information</span>
              <div className="flex flex-col">
                <span>Change Email</span>
                <span>Change Password</span>
                <span>Deactivate Account</span>
                <span>Delete Account</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto bg-white rounded border border-grey-100 shadow-sm p-2">
          <div>
            <span>Preferences</span>
            <div className="flex flex-col">
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
        <div className="w-full h-auto bg-white rounded border border-grey-100 shadow-sm p-2">
          <div>
            <span>Terms and Conditions</span>
            <div>

            </div>
          </div>
        </div>
        <div className="w-full h-auto bg-white rounded border border-grey-100 shadow-sm p-2">
          <div>
            <span>Contacts</span>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default Page;